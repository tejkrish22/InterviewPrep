# ROS 2 Crash Course (for someone who knows ROS 1)

Goal: talk confidently about ROS 2 concepts, explain how the JD's items fit together, and answer the likely system-design question. Each section has **Intuition → Key facts → Snippet / command**.

---

## 0. The one mental model

ROS 2 = **many small programs (nodes)** talking over **typed channels**, plus tools to **launch, configure, record and visualise** them.

| Need | ROS 2 tool |
|---|---|
| Stream data continuously (sensor, state) | **Topic** (publish/subscribe) |
| Quick request → reply (get or set something) | **Service** |
| Long task with progress and cancel (move arm, navigate) | **Action** |
| Configure a node | **Parameters** (YAML) |
| Start many nodes with config | **Launch** files (Python / XML / YAML) |
| Controlled startup / shutdown | **Lifecycle nodes** |
| Where things are | **tf2** |
| Talk to motors and sensors in a real-time loop | **ros2_control** |
| Mobile navigation | **Nav2** |
| Arm motion planning | **MoveIt 2** |
| Record / replay | **rosbag2** |

---

## 1. ROS 1 vs ROS 2 (the first question they'll ask)

| Topic | ROS 1 | ROS 2 |
|---|---|---|
| Discovery | **roscore / master** (single point of failure) | **No master**: nodes discover each other peer-to-peer via **DDS** |
| Middleware | Custom TCPROS / UDPROS | **DDS** (Fast DDS default, Cyclone DDS alternative), swappable via **RMW** layer |
| Communication tuning | none | **QoS** (reliability, durability, history, deadline…) |
| Node startup | just runs | Optional **lifecycle** (managed) nodes with states |
| Launch | XML `.launch` | **Python** (also XML / YAML) launch files: logic, conditions, includes |
| Build | catkin | **colcon** (tool) + **ament** (ament_cmake / ament_python) |
| Parameters | global parameter server | **per-node** parameters, declared, with change callbacks |
| Multiple nodes in one process | nodelets (awkward) | **Components** + zero-copy **intra-process** comms |
| Real-time | not designed for it | designed to allow it (executors, no master, memory control) |
| Multi-machine | ROS_MASTER_URI | **ROS_DOMAIN_ID** + DDS discovery |
| Security | none | **SROS2** (DDS security: auth, encryption) |
| Client libs | roscpp / rospy separate | **rclcpp / rclpy** both built on a common C core (**rcl**) |
| Actions | add-on library | **first-class** (built on topics + services) |

**Interview line:** "The big shifts are no master (DDS peer discovery), QoS, lifecycle nodes, Python launch, and components. Those make ROS 2 suitable for production and multi-machine labs."

**Distros:** **Humble** (Ubuntu 22.04, LTS) and **Jazzy** (Ubuntu 24.04, LTS) are what most labs run.

---

## 2. Nodes, executors and callbacks

**Intuition:** a node is an object with publishers, subscribers, timers and services. An **executor** is the loop that waits for events and runs your callbacks.

- `rclcpp::spin(node)` uses a **SingleThreadedExecutor**: callbacks run one at a time.
- **MultiThreadedExecutor** + **callback groups**:
  - `MutuallyExclusive`: callbacks in this group never run in parallel
  - `Reentrant`: they can run in parallel
- Classic bug: calling a service **synchronously inside a callback** on a single-threaded executor causes a **deadlock**. Fix it with an async call or a separate callback group plus a multithreaded executor.

### Minimal C++ node
```cpp
#include <chrono>
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/float64.hpp"

class Scaler : public rclcpp::Node {
public:
  Scaler() : Node("scaler") {
    gain_ = declare_parameter("gain", 2.0);
    pub_ = create_publisher<std_msgs::msg::Float64>("output", 10);
    sub_ = create_subscription<std_msgs::msg::Float64>(
        "input", 10, [this](std_msgs::msg::Float64::SharedPtr msg) {
          std_msgs::msg::Float64 out;
          out.data = gain_ * msg->data;
          pub_->publish(out);
        });
  }
private:
  double gain_;
  rclcpp::Publisher<std_msgs::msg::Float64>::SharedPtr pub_;
  rclcpp::Subscription<std_msgs::msg::Float64>::SharedPtr sub_;
};

int main(int argc, char** argv) {
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<Scaler>());
  rclcpp::shutdown();
}
```

### Same in Python
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float64

class Scaler(Node):
    def __init__(self):
        super().__init__("scaler")
        self.gain = self.declare_parameter("gain", 2.0).value
        self.pub = self.create_publisher(Float64, "output", 10)
        self.create_subscription(Float64, "input", self.cb, 10)

    def cb(self, msg):
        self.pub.publish(Float64(data=self.gain * msg.data))

def main():
    rclpy.init()
    rclpy.spin(Scaler())
    rclpy.shutdown()
```

---

## 3. Topics, services, actions and interfaces

| | Pattern | Example in a lab |
|---|---|---|
| **Topic** | 1→N stream, fire-and-forget | `/joint_states`, `/camera/image_raw`, `/ft_sensor/wrench` |
| **Service** | request → response, short | `/set_mode`, `/calibrate_sensor`, `/get_experiment_config` |
| **Action** | goal → **feedback** stream → result, **cancellable** | `/follow_joint_trajectory`, `/navigate_to_pose`, `/run_experiment` |

Interface files (in a package's `msg/`, `srv/`, `action/` folders):
```
# msg/ExperimentStatus.msg
string experiment_id
uint8 state
float64 progress

# srv/SetMode.srv
string mode
---
bool success
string message

# action/RunExperiment.action
string config_path        # goal
---
bool success              # result
string bag_path
---
float64 progress          # feedback
```
CMake: `rosidl_generate_interfaces(${PROJECT_NAME} "msg/ExperimentStatus.msg" ...)`

**Rule of thumb:** if the work takes longer than about a second, or someone might want to cancel it, make it an **action**.

---

## 4. QoS (Quality of Service): very likely to be asked

**Intuition:** per-topic rules for "how hard should delivery be tried" and "what about late joiners".

| Policy | Options | Plain meaning |
|---|---|---|
| **Reliability** | `RELIABLE` / `BEST_EFFORT` | retry until delivered, or drop if lost (good for sensors) |
| **Durability** | `VOLATILE` / `TRANSIENT_LOCAL` | late subscribers get nothing, or get the last messages. TRANSIENT_LOCAL is like a ROS 1 **latched** topic |
| **History + Depth** | `KEEP_LAST(N)` / `KEEP_ALL` | queue size |
| **Deadline** | period | alarm if messages arrive slower than this |
| **Liveliness / Lease** | auto / manual | detect a dead publisher |
| **Lifespan** | duration | drop stale messages |

- **Presets:** `rclcpp::SensorDataQoS()` (best effort, small queue), and the default (reliable, volatile, depth 10).
- **Classic bug:** the publisher is **BEST_EFFORT** and the subscriber is **RELIABLE**, so the two are **incompatible** and **no messages arrive, silently**. Debug with `ros2 topic info -v /topic`.
- Use cases: `/robot_description` and `/map` use **TRANSIENT_LOCAL**; camera and LiDAR use **BEST_EFFORT**; commands and e-stop use **RELIABLE** plus a **deadline**.

---

## 5. Parameters and launch files

### Parameters YAML
```yaml
scaler:                       # node name
  ros__parameters:            # note: double underscore
    gain: 3.0
```
- `declare_parameter` is required (undeclared parameters are rejected by default).
- React to runtime changes with `add_on_set_parameters_callback`.
- CLI: `ros2 param list / get / set / dump`.

### Python launch file
```python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.conditions import IfCondition
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node

def generate_launch_description():
    use_sim = LaunchConfiguration("use_sim")
    return LaunchDescription([
        DeclareLaunchArgument("use_sim", default_value="false"),
        Node(
            package="my_pkg", executable="scaler", name="scaler",
            namespace="robot1",
            parameters=["config/scaler.yaml", {"use_sim_time": use_sim}],
            remappings=[("input", "/sensors/raw")],
        ),
        Node(package="my_pkg", executable="sim_bridge",
             condition=IfCondition(use_sim)),
    ])
```
- **Namespaces** (`robot1`, `robot2`) are how you run **multiple identical robots** without name clashes.
- `IncludeLaunchDescription` composes launch files: one top-level "lab bring-up" that includes per-robot launches.
- **Launch arguments are how you switch between SIL, HIL and real hardware** (see section 13).

---

## 6. Lifecycle (managed) nodes: in the JD

**Intuition:** a node with an **explicit on/off switch and states**, so a supervisor can bring the whole system up **in order** and know that everything is ready before an experiment starts.

```
      configure        activate
Unconfigured ──► Inactive ──► Active
      ◄── cleanup    ◄── deactivate
  (any state) ── shutdown ──► Finalized          errors → on_error
```
| Callback | Typical work |
|---|---|
| `on_configure` | read params, allocate memory, open device/port, create publishers |
| `on_activate` | start publishing / enable motors / start timers |
| `on_deactivate` | stop motion, stop publishing (hardware still connected) |
| `on_cleanup` | release resources, close the port |
| `on_shutdown` / `on_error` | safe stop |

- Each callback returns `SUCCESS`, `FAILURE` or `ERROR`.
- **nav2_lifecycle_manager** (or your own manager) drives the transitions for a list of nodes in order.
- **Why in a lab:** deterministic bring-up, restarting a driver without restarting everything, and "don't move until all sensors are active".

---

## 7. Packages, workspaces and the build

```bash
ros2 pkg create my_driver --build-type ament_cmake --dependencies rclcpp sensor_msgs
cd ~/ws && rosdep install --from-paths src --ignore-src -y   # system dependencies
colcon build --symlink-install --packages-select my_driver
source install/setup.bash
colcon test && colcon test-result --verbose
```
- **package.xml**: name, version, dependencies (`<depend>`, `<build_depend>`, `<test_depend>`)
- **CMakeLists.txt**: `find_package(ament_cmake REQUIRED)`, `ament_target_dependencies(...)`, `install(TARGETS ...)`, `ament_package()`
- **Underlay / overlay:** source `/opt/ros/jazzy` (underlay), then your workspace (overlay), and the overlay wins.
- **Multi-package workspace layout for a lab:** `lab_interfaces` (msgs only), `lab_description` (URDF), `lab_hardware` (ros2_control plugins), `lab_bringup` (launch + config), `lab_safety`, `lab_experiments`, `lab_tools`.
- Your Bazel / Docker background maps here: **colcon ≈ build orchestrator**, **rosdep ≈ dependency installer**, Docker images per ROS distro.

---

## 8. tf2, URDF and robot_state_publisher

- **URDF** describes links and joints; **XACRO** is URDF with macros and variables (reuse one arm definition for two robots).
- **robot_state_publisher**: reads the URDF plus `/joint_states`, does **FK**, and publishes `/tf`. So you never hand-code FK for visualisation.
- **Standard frames (REP-105):** `map → odom → base_link → sensor frames`. Axes (REP-103): **x forward, y left, z up**, SI units.
- Static transforms (a camera bolted to a bracket): `ros2 run tf2_ros static_transform_publisher --x 0.1 --z 0.3 --frame-id base_link --child-frame-id camera_link`
- In code: `tf2_ros::Buffer` + `TransformListener`, then `buffer.lookupTransform(target, source, time)`.
- Debug: `ros2 run tf2_tools view_frames` (makes a PDF of the tree), `ros2 run tf2_ros tf2_echo base_link camera_link`, and RViz 2.

---

## 9. ros2_control: the most important JD item

**Intuition:** a standard framework that separates the **hardware driver** (how to talk to motors) from the **controller** (what to command), and runs them in **one real-time loop**.

```
            ┌───────────────── controller_manager (update_rate e.g. 500 Hz) ─────────────────┐
 ROS topics │  Controllers (plugins)                Resource Manager      Hardware (plugins) │
 /actions ─►│  joint_trajectory_controller   ◄──► command interfaces ◄──► SystemInterface    │──► EtherCAT/CAN/serial
            │  diff_drive_controller               state interfaces        ActuatorInterface  │◄── encoders, F/T
            │  joint_state_broadcaster ─► /joint_states                    SensorInterface    │
            └──────────────────── loop:  read()  →  update() controllers  →  write() ──────────┘
```
- **State interfaces** (read): `position`, `velocity`, `effort` per joint.
- **Command interfaces** (write): `position`, `velocity` or `effort`.
- **Hardware types:** `SystemInterface` (multi-joint robot), `ActuatorInterface` (one joint), `SensorInterface` (read-only, e.g. F/T).
- **The hardware component has its own lifecycle** (`on_init`, `on_configure`, `on_activate`, `on_deactivate`), the same idea as section 6.
- **Common controllers:** `joint_trajectory_controller` (executes MoveIt trajectories via the `FollowJointTrajectory` action), `diff_drive_controller` (`cmd_vel` → wheel speeds), `forward_command_controller` (pass-through), `joint_state_broadcaster`.
- **Testing without hardware:** `mock_components/GenericSystem` (it echoes commands back as states), or `gz_ros2_control` for Gazebo. **You only swap the `<plugin>` in the URDF**, so it's the same controllers and the same stack. That is SIL/HIL in ros2_control terms.

### Hardware interface skeleton
```cpp
class LabArmHardware : public hardware_interface::SystemInterface {
public:
  CallbackReturn on_init(const hardware_interface::HardwareInfo& info) override;   // read URDF params
  CallbackReturn on_activate(const rclcpp_lifecycle::State&) override;             // enable drives
  CallbackReturn on_deactivate(const rclcpp_lifecycle::State&) override;           // disable drives
  std::vector<hardware_interface::StateInterface> export_state_interfaces() override;
  std::vector<hardware_interface::CommandInterface> export_command_interfaces() override;
  hardware_interface::return_type read(const rclcpp::Time&, const rclcpp::Duration&) override;   // bus → state
  hardware_interface::return_type write(const rclcpp::Time&, const rclcpp::Duration&) override;  // command → bus
private:
  std::vector<double> pos_, vel_, cmd_;
};
PLUGINLIB_EXPORT_CLASS(lab_hardware::LabArmHardware, hardware_interface::SystemInterface)
```

### URDF tag
```xml
<ros2_control name="LabArm" type="system">
  <hardware>
    <plugin>lab_hardware/LabArmHardware</plugin>   <!-- swap to mock_components/GenericSystem for SIL -->
    <param name="can_interface">can0</param>
  </hardware>
  <joint name="joint1">
    <command_interface name="position"/>
    <state_interface name="position"/>
    <state_interface name="velocity"/>
  </joint>
</ros2_control>
```

### Controllers YAML
```yaml
controller_manager:
  ros__parameters:
    update_rate: 500
    joint_state_broadcaster:
      type: joint_state_broadcaster/JointStateBroadcaster
    arm_controller:
      type: joint_trajectory_controller/JointTrajectoryController

arm_controller:
  ros__parameters:
    joints: [joint1, joint2]
    command_interfaces: [position]
    state_interfaces: [position, velocity]
```
CLI: `ros2 control list_controllers`, `ros2 control list_hardware_interfaces`.

**Real-time rules inside `read()`/`write()`/`update()`:** no memory allocation, no blocking I/O or locks, no logging spam. Use `realtime_tools::RealtimeBuffer` / `RealtimePublisher` to pass data to non-real-time threads.

**Your bridge story:** "My SIL/HIL bridge had the same shape: one control interface with pluggable physics backends. ros2_control formalises that with hardware plugins and a mock backend."

---

## 10. Nav2 and MoveIt 2 (know the parts, not the internals)

### Nav2 (mobile robots)
- **bt_navigator**: a behavior tree that orchestrates the task (the `NavigateToPose` action)
- **planner_server**: global path (NavFn, Smac)
- **controller_server**: follows the path → `cmd_vel` (DWB, **Regulated Pure Pursuit**, MPPI)
- **behavior_server**: recoveries (spin, back up, wait)
- **costmap_2d**: global and local obstacle maps with layers (static, obstacle, inflation)
- **AMCL + map_server**: localisation; **lifecycle_manager** brings it all up
- **Your link:** your pure pursuit with adaptive lookahead and velocity scaling **is what Regulated Pure Pursuit does.**

### MoveIt 2 (arms)
- **move_group**: the central node. **Planning scene** (robot + obstacles), **OMPL** / **Pilz** (industrial lines and arcs) planners
- **IK plugins**: KDL, TRAC-IK, pick_ik
- **SRDF** (planning groups, disabled collisions) is made with the **Setup Assistant**
- Output: a `JointTrajectory`, sent to the `FollowJointTrajectory` action of `joint_trajectory_controller` (ros2_control)
- **MoveIt Servo**: real-time Cartesian velocity control (Jacobian inverse with singularity and collision slow-down). This is the "Jacobian-based velocity mapping" from the JD.
- C++ API: `moveit::planning_interface::MoveGroupInterface` → `setPoseTarget()` → `plan()` → `execute()`

---

## 11. rosbag2: record and replay (in the JD)

```bash
ros2 bag record -a -o exp_042                     # everything
ros2 bag record /joint_states /tf /ft/wrench -o exp_042
ros2 bag info exp_042
ros2 bag play exp_042 --clock --rate 0.5          # publish /clock, half speed
```
- Storage: **MCAP** (default in newer distros; also great with Foxglove) or **SQLite3** (Humble's default).
- When replaying into nodes, set **`use_sim_time: true`** so they follow the bag's `/clock`.
- **Experiment pattern:** the orchestrator starts a bag at experiment start, naming it with experiment id + config hash, and saves the config YAML + git SHA next to it. That makes every run **reproducible and analysable**.
- Python API (`rosbag2_py`) for post-processing into pandas or plots. This is your telemetry replay tool story.

---

## 12. DDS, networking and multi-machine (in the JD)

- **RMW:** `export RMW_IMPLEMENTATION=rmw_fastrtps_cpp` (default) or `rmw_cyclonedds_cpp`.
- **ROS_DOMAIN_ID** (e.g. 0–101): isolates groups. Each lab cell or test bench gets its own ID so they don't cross-talk.
- **Discovery** is by multicast by default. It can fail across subnets, on Wi-Fi, or in Docker without `--network host`. Fixes: Fast DDS **Discovery Server**, Cyclone **peer lists** (`CYCLONEDDS_URI` XML), or unicast config.
- Large messages (images, point clouds) over Wi-Fi: use best-effort QoS, compression, or keep heavy processing on the same machine (components + intra-process comms).
- Shared-memory transport for same-host zero-copy.
- **Debugging "node A can't see node B":** check the same `ROS_DOMAIN_ID`, the same RMW, firewall/multicast, `ros2 doctor --report`, `ros2 multicast receive/send`, and QoS compatibility.

---

## 13. System design question: "Design the lab software"

Have this ready as a 2-minute whiteboard answer:

```
                   ┌───────────────────── Operator UI (Foxglove / web dashboard) ──────────────┐
                   │                 foxglove_bridge / rosbridge (WebSocket)                    │
                   └───────────────────────────────┬────────────────────────────────────────────┘
  Experiment Orchestrator (lifecycle node, RunExperiment ACTION)
     loads YAML config → brings up nodes via lifecycle manager → starts rosbag2 → runs steps → post-process
                                                   │
   ┌──────────────┬───────────────┬───────────────┼────────────────┬──────────────────┐
   Safety          Motion          Sensors         Diagnostics      ML policy node
   Supervisor      (MoveIt 2 /     (camera, IMU,   (diagnostic_     (wraps RL/ML model,
   (e-stop, joint  controllers     F/T, encoders;  updater →        fixed-rate timer,
   & workspace     from Controls   time sync,      /diagnostics,    latency monitoring)
   limits, watch-  team)           calibration)    aggregator)
   dogs, heartbeat)
                                                   │
                    ros2_control controller_manager per robot (namespaced: /robot1, /robot2)
                    hardware plugin: real (EtherCAT/CAN) | mock | Gazebo | MBD model (SIL/HIL)
```
Key points to say:
1. **One interface, swappable backends.** The hardware plugin is chosen by a launch argument: real hardware, mock, Gazebo, or the MBD dynamics model. The same controllers and the same experiment code run in SIL, HIL or real mode. *(This is your SIL/HIL bridge experience.)*
2. **Lifecycle everywhere**, giving deterministic bring-up and "nothing moves until everything is Active".
3. **Safety is layered.** A **hardware e-stop** is independent of software. The software supervisor checks joint, velocity and workspace limits. **Watchdogs** stop motion if commands stop arriving (deadline QoS / heartbeat). Controllers fail safe on deactivate.
4. **Experiments are data:** a YAML config + schema, a versioned config, a bag + metadata for every run, and repeatable campaigns. *(This is your scenario designer, almost 1:1.)*
5. **Scale:** namespaces per robot, a `ROS_DOMAIN_ID` per cell, a DDS config for multi-machine setups, Docker images, systemd services for auto-start.
6. **Quality:** gtest / pytest / `launch_testing`, CI (GitHub Actions with `colcon build && colcon test`), runbooks.

---

## 14. Hardware protocols (one line each, in the JD)

| Protocol | Plain meaning | Linux / ROS tooling |
|---|---|---|
| **Serial (UART / RS-232 / RS-485)** | bytes over wires; you define framing + checksum | `/dev/ttyUSB0`, baud rate, non-blocking reads |
| **CAN bus** | robust multi-drop bus; small frames (8 bytes classic, 64 for CAN-FD); **ID = priority**; **CANopen** adds a device profile | **SocketCAN** (`can0`, `candump`), `ros2_socketcan` |
| **EtherCAT** | real-time Ethernet: one frame passes through all slaves, each reads and writes its part on the fly; **distributed clocks**; ~1 ms cycles or faster | IgH / SOEM masters, `ethercat_driver_ros2` (ros2_control plugin) |
| **Modbus (RTU / TCP)** | simple request/response polling of registers and coils (PLCs, grippers) | libmodbus; good for slow I/O, not fast control |

**Real-time Linux:** a **PREEMPT_RT** kernel, plus run the control thread with `SCHED_FIFO` priority, `mlockall` memory, no allocation in the loop, and CPU isolation. **micro-ROS** puts ROS 2 on microcontrollers.

---

## 15. Diagnostics, monitoring and visualisation

- `diagnostic_updater` in each driver publishes OK / WARN / ERROR on `/diagnostics`; `diagnostic_aggregator` groups them.
- **RViz 2** shows robot, tf and sensors; **rqt** (graph, plots, console); **Foxglove Studio** (web, plays MCAP bags, live via `foxglove_bridge`).
- `ros2 topic hz / bw / delay` to check rates and latency.

---

## 16. Simulation

- **Gazebo** (new, formerly "Ignition"): **Fortress** pairs with Humble, **Harmonic** with Jazzy. Gazebo Classic is end-of-life.
- `ros_gz_bridge` bridges topics; `gz_ros2_control` puts ros2_control inside Gazebo.
- **Your bridge line:** "I built simulation with CARLA/Unreal and physics co-simulation. Gazebo plus gz_ros2_control fills the same role in a ROS 2 lab."

---

## 17. CLI cheat sheet

```bash
ros2 run <pkg> <exe> --ros-args -p gain:=3.0 -r input:=/raw
ros2 launch <pkg> bringup.launch.py use_sim:=true
ros2 node list | info /scaler
ros2 topic list | echo /joint_states | hz /joint_states | info -v /cmd
ros2 topic pub --once /input std_msgs/msg/Float64 "{data: 1.0}"
ros2 service list | call /set_mode my_pkg/srv/SetMode "{mode: 'auto'}"
ros2 action list | send_goal /run_experiment my_pkg/action/RunExperiment "{config_path: 'a.yaml'}" --feedback
ros2 param list | get /scaler gain | set /scaler gain 4.0 | dump /scaler
ros2 interface show sensor_msgs/msg/JointState
ros2 lifecycle get /driver | set /driver configure | set /driver activate
ros2 control list_controllers
ros2 bag record -a | play | info
ros2 doctor --report
```

---

## 18. Mapping your experience to ROS 2 (say these bridges)

| You did | ROS 2 equivalent |
|---|---|
| ROS 1 nodes, topics, RViz | Same concepts; RViz 2; plus QoS, lifecycle, launch.py |
| SIL/HIL bridge with multiple physics backends | ros2_control hardware plugins (real / mock / Gazebo) |
| Motion model `step(control, dt)` | controller_manager `read → update → write` loop |
| Pure pursuit with adaptive lookahead | Nav2 Regulated Pure Pursuit controller |
| Keyframes → joint velocity commands | `JointTrajectory` → `joint_trajectory_controller` |
| Clamping to machine limits | `joint_limits`, safety supervisor |
| YAML scenarios + protobuf schema | Experiment configs + `.msg/.srv/.action` interfaces + params |
| Telemetry replay tool | rosbag2 + `rosbag2_py` + Foxglove |
| C++ core with Boost.Python bindings | rclcpp core + rclpy, or pybind11 |
| Bazel, Docker | colcon/ament, rosdep, Docker per distro |
| Handler registry per machine type | pluginlib plugins |
| Perception stack in SIL (SPARK) | ML policy / perception node with fixed-rate inference |

---

## 19. Rapid-fire answers

- **Why no master in ROS 2?** DDS does peer-to-peer discovery, so there's no single point of failure and multi-machine setups are easier.
- **Topic, service or action?** Stream → topic. Short request/reply → service. Long, cancellable task with feedback → action.
- **Messages not arriving?** Check QoS compatibility (best-effort pub vs reliable sub), domain ID, RMW, network/multicast, the topic name/namespace, and `use_sim_time`.
- **What's a lifecycle node for?** Controlled, ordered bring-up and shutdown. Drivers only act when Active.
- **What does ros2_control give you?** Separation of hardware and controller, a standard state/command interface, a real-time loop, reusable controllers, and mock or sim backends for testing.
- **How do you write a new driver?** Implement `SystemInterface` (init → configure → activate, then read/write), export it with pluginlib, declare it in the URDF `<ros2_control>`, test with mock first, then on the bench.
- **How do you wrap an ML policy?** A node with a fixed-rate timer: read the latest state (cached from subscriptions), run inference (preload the model; GPU or ONNX/TensorRT), publish the command, and monitor latency. If inference is late or the output is out of range, fall back to a safe command. Run inference on its own callback group or thread.
- **How do you make experiments reproducible?** A versioned YAML config, bag every run with metadata (config, git SHA, params dump), a deterministic launch, and `use_sim_time` for replay.
- **Components / intra-process?** Several nodes in one process passing pointers without copying. Use them for heavy data like images.
- **Callback deadlock?** A sync service call inside a callback on a single-threaded executor. Use async, or callback groups with a multithreaded executor.
- **What's the e-stop strategy?** A hardware e-stop chain independent of software, plus a software supervisor (limits, watchdogs), plus controllers that hold or stop on deactivate.

**Honest gap line:** "I've worked with ROS 1 and built the same patterns (SIL/HIL backends, trajectory execution, experiment configs, replay) on CARLA and Unreal. ROS 2's model is familiar; the new parts for me are QoS, lifecycle and ros2_control APIs, which I've been ramping up on."
