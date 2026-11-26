# ROS 2 Hands-On Lab (about 5.5 h)

You'll build a small **"robotics lab" software stack** in a multi-package ROS 2 Jazzy workspace. It covers almost every ROS 2 item in the JD: nodes, topics, services, actions, QoS, parameters, launch, namespaces, lifecycle, rosbag2, URDF/xacro, tf2, ros2_control, a custom hardware plugin, and SIL by swapping mock and real hardware.

Everything here was **built and tested** in your container. A complete reference solution is in [`solutions/src`](solutions/src). **You build your own copy in `ws/src`.**

**How to work:**
- **Type** the files marked ⌨️. They're short, and typing is how it sticks. **Copy** the files marked 📋 (boilerplate) from `solutions/src/...`, but read them.
- After each step, do the **🔨 Break it** exercise. Debugging is what interviewers probe.
- Say the **🎤 Interview line** out loud.
- **Short on time?** Do the ⭐ steps first: 1, 3, 4, 5, 9.

---

## 0. Setup (5 min)

Open a **host terminal** and run:
```bash
~/Documents/Personal/CS/ros2_prep/run.sh
```
- This starts the container (if needed) and gives you a shell with ROS sourced. The prompt shows `(ros2 d42)`, meaning domain ID 42.
- **Need another terminal?** Run `run.sh` again in a new host terminal. You'll usually want 3–4.
- Your workspace is `~/ws` (the same files as `ros2_prep/ws` on the host, so you can edit them in VS Code).
- `cb` = build the workspace and re-source it.
- To stop a running node: **Ctrl-C**.

> The container uses domain **42** and localhost-only discovery, so you don't interfere with anyone else on the network.

---

## 1. ⭐ CLI tour with turtlesim (35 min)

**Goal:** use every communication type from the command line before writing any code.

**Terminal A:** `ros2 run turtlesim turtlesim_node` (a window opens)
**Terminal B:** `ros2 run turtlesim turtle_teleop_key` (drive with the arrow keys)

**Terminal C: explore the system:**
```bash
ros2 node list                       # if it's empty, run it again (the first call starts the daemon)
ros2 node info /turtlesim            # its publishers, subscribers, services, actions
rqt_graph                            # picture of the node graph

# Topics
ros2 topic list
ros2 topic echo /turtle1/pose
ros2 topic hz /turtle1/pose
ros2 topic info -v /turtle1/cmd_vel  # shows QoS on each side
ros2 interface show geometry_msgs/msg/Twist
ros2 topic pub --rate 1 /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0}, angular: {z: 1.8}}"

# Services (request -> response)
ros2 service list
ros2 service call /spawn turtlesim/srv/Spawn "{x: 2.0, y: 2.0, theta: 0.2, name: 'turtle2'}"
ros2 service call /clear std_srvs/srv/Empty

# Parameters
ros2 param list /turtlesim
ros2 param set /turtlesim background_r 150
ros2 service call /clear std_srvs/srv/Empty      # the background colour updates on clear
ros2 param dump /turtlesim

# Actions (goal -> feedback -> result, cancellable)
ros2 action list
ros2 action send_goal --feedback /turtle1/rotate_absolute turtlesim/action/RotateAbsolute "{theta: 1.57}"
```
**🔨 Break it:**
- Send a rotate goal, then press Ctrl-C while it runs. That cancels the goal. Notice the difference from a service, which can't be cancelled.
- Run `ROS_DOMAIN_ID=7 ros2 topic list`. Only `/rosout` and `/parameter_events` show up; the turtle topics are gone. That's domain isolation.

**🎤** "Topics stream data, services are a short request and reply, actions are long-running goals with feedback and cancel. Parameters configure a node."

---

## 2. Workspace + custom interfaces (25 min)

**Goal:** create your own message, service and action types.

```bash
cd ~/ws/src
ros2 pkg create lab_interfaces --build-type ament_cmake
cd lab_interfaces && rm -rf include src && mkdir msg srv action
```
- ⌨️ `msg/ExperimentStatus.msg`, `srv/SetMode.srv`, `action/RunExperiment.action` (see the solution files; note the `---` separators)
- 📋 `CMakeLists.txt` and `package.xml`. Note `rosidl_generate_interfaces(...)` and `<member_of_group>rosidl_interface_packages</member_of_group>`.

```bash
cb
ros2 interface show lab_interfaces/srv/SetMode
ros2 interface show lab_interfaces/action/RunExperiment
```
**🔨 Break it:** remove `<member_of_group>` from `package.xml` and rebuild. Read the error, then put it back.

**🎤** "I keep interfaces in their own package, so every other package depends on one small, stable thing."

---

## 3. ⭐ C++ node: publisher + timer + parameters + service (40 min)

```bash
cd ~/ws/src
ros2 pkg create lab_nodes --build-type ament_cmake --dependencies rclcpp rclcpp_lifecycle std_msgs lab_interfaces
cd lab_nodes && mkdir -p scripts launch config
```
- ⌨️ `src/sensor_sim.cpp`. Things to notice:
  - `declare_parameter`
  - `rclcpp::SensorDataQoS()` (best effort)
  - `create_wall_timer`
  - `create_service<SetMode>`
  - "fault" mode stops publishing, like a sensor that has died
- 📋 `CMakeLists.txt` and `package.xml` from the solution. They cover all the nodes in this package.

For now, in `CMakeLists.txt`, comment out the lines for things you haven't written yet: the `fake_driver` executable (both lines, plus its name in `install(TARGETS ...)`; you add it in step 6) and the `install(PROGRAMS ...)` line (steps 4 and 7). Then:
```bash
cb
ros2 run lab_nodes sensor_sim --ros-args -p rate_hz:=5.0
# another terminal:
ros2 topic hz /reading
ros2 topic echo /reading
ros2 param set /sensor_sim amplitude 3.0          # watch the values change live
ros2 service call /set_mode lab_interfaces/srv/SetMode "{mode: fault}"
ros2 service call /set_mode lab_interfaces/srv/SetMode "{mode: banana}"   # rejected, returns success: false
```
**🔨 Break it:** `ros2 param set /sensor_sim rate_hz 50.0` succeeds, but the rate doesn't change. Why? The timer was created once, in the constructor. **Fix idea:** register an `add_on_set_parameters_callback` and recreate the timer when the rate changes.

**🎤** "Parameters are declared per node. If a value must change at runtime, either read it each cycle or handle it in a set-parameters callback."

---

## 4. ⭐ Python watchdog + QoS (30 min)

- ⌨️ `scripts/monitor.py`. Make it executable: `chmod +x scripts/monitor.py`, and in CMakeLists restore `install(PROGRAMS scripts/monitor.py DESTINATION lib/${PROJECT_NAME})` (add `experiment_server.py` to it in step 7)
  - Subscribes to `reading` with a configurable reliability setting
  - **Fail-safe:** starts in e-stop and only clears once data arrives
  - Publishes `estop` (Bool) at 10 Hz

```bash
cb
# Terminal 1
ros2 run lab_nodes sensor_sim
# Terminal 2
ros2 run lab_nodes monitor.py                       # "sensor back -> e-stop cleared"
# Terminal 3
ros2 service call /set_mode lab_interfaces/srv/SetMode "{mode: fault}"    # monitor: E-STOP
ros2 service call /set_mode lab_interfaces/srv/SetMode "{mode: nominal}"  # cleared
```
**🔨 Break it (the classic QoS bug):**
```bash
ros2 run lab_nodes monitor.py --ros-args -p reliable:=true
```
You'll see `offering incompatible QoS … RELIABILITY`, and the monitor stays in e-stop forever. Run `ros2 topic info -v /reading` to see best effort on one side and reliable on the other.

**🎤** "A reliable subscriber can't match a best-effort publisher, so it silently gets no data. I check with `ros2 topic info -v`. My watchdog is fail-safe: no data means stop."

---

## 5. ⭐ Launch + YAML params + namespaces (30 min)

- ⌨️ `launch/lab.launch.py`: two robots (`robot1`, `robot2`), each running a sensor and a monitor, plus a launch argument
- ⌨️ `config/params.yaml`: note the `/**/sensor_sim:` wildcard, which matches the node in any namespace
- (The launch file also starts `experiment_server.py`. Leave that line commented out until step 7.)

```bash
cb
ros2 launch lab_nodes lab.launch.py
ros2 node list                                      # /robot1/sensor_sim, /robot2/monitor, ...
ros2 topic list                                     # /robot1/reading, /robot2/estop, ...
ros2 service call /robot2/set_mode lab_interfaces/srv/SetMode "{mode: fault}"   # only robot2 e-stops
ros2 launch lab_nodes lab.launch.py reliable:=true  # both monitors hit the QoS mismatch
rqt_graph
```
**🔨 Break it:** change the YAML key to `sensor_sim:` (no `/**/`), rebuild and relaunch, then run `ros2 param get /robot1/sensor_sim rate_hz`. The value reverts to the default, because the YAML no longer matches the namespaced node.

**🎤** "Namespaces let one launch file run N identical robots. Launch arguments switch configurations, such as SIL vs real hardware."

---

## 6. Lifecycle node (25 min)

- ⌨️ `src/fake_driver.cpp`: `on_configure` opens the "port", `on_activate` enables it, `on_deactivate`, `on_cleanup`. Uncomment it in CMakeLists.

```bash
cb
ros2 run lab_nodes fake_driver
# other terminal:
ros2 lifecycle get /fake_driver            # unconfigured
ros2 topic echo /heartbeat                 # nothing yet
ros2 lifecycle set /fake_driver configure
ros2 lifecycle set /fake_driver activate   # heartbeat starts
ros2 lifecycle set /fake_driver deactivate # heartbeat stops
ros2 lifecycle list /fake_driver           # which transitions are allowed from here
```
**🔨 Break it:** try `activate` straight from `unconfigured`. It's rejected, because the state machine enforces the order.

**🎤** "Drivers are lifecycle nodes, so the orchestrator can bring hardware up in order and guarantee nothing moves until everything is Active."

---

## 7. Action server: experiment runner (25 min)

- ⌨️ `scripts/experiment_server.py` (`chmod +x`): goal check, feedback loop, cancel, result, and a **MultiThreadedExecutor**
- Uncomment it in the launch file. `cb`

```bash
ros2 launch lab_nodes lab.launch.py
ros2 action send_goal --feedback /run_experiment lab_interfaces/action/RunExperiment "{config_path: exp_001.yaml, duration_s: 5.0}"
ros2 action send_goal /run_experiment lab_interfaces/action/RunExperiment "{config_path: bad.yaml, duration_s: 0.0}"   # rejected
ros2 topic echo /experiment_status
```
**🔨 Break it:** change `MultiThreadedExecutor()` to a plain `rclpy.spin(node)`, send a goal, then Ctrl-C the client to cancel. The cancel is only handled after `execute()` finishes, because a single thread is blocked in the loop.

**🎤** "Long tasks are actions, so the operator gets progress and can cancel. Blocking work needs a multithreaded executor or callback groups."

---

## 8. rosbag2: record, inspect, replay (20 min)

With the step-5 launch running:
```bash
cd ~/ws
ros2 bag record -o exp_001 /robot1/reading /robot1/estop /experiment_status    # trigger a fault + run a goal, then Ctrl-C
ros2 bag info exp_001                         # MCAP storage, topics, message counts
# stop the launch, then replay:
ros2 bag play exp_001 --rate 2.0
ros2 topic echo /robot1/estop                 # in another terminal: the recorded e-stop events replay
rqt_bag exp_001                               # timeline view
ros2 run plotjuggler plotjuggler              # Load data -> pick the bag's .mcap -> plot /robot1/reading
```
**🔨 Break it:** start recording **after** the launch has been running for a while. Static or latched topics like `/tf_static` would be missed, because they're published once at startup. That's why recording starts before bring-up.

**🎤** "Every run is recorded to MCAP with its config. I replay with `--clock` and `use_sim_time` for analysis, or use PlotJuggler or Foxglove."

---

## 9. ⭐ ros2_control arm: mock hardware + RViz + FK check (60 min)

**Goal:** the JD's core stack, and it ties directly to your maths notes.

```bash
cd ~/ws/src
ros2 pkg create lab_arm --build-type ament_cmake
cd lab_arm && rm -rf include src && mkdir urdf config launch rviz
```
- ⌨️ `urdf/arm.urdf.xacro`: a planar 2-link arm, **L1 = 1.0, L2 = 0.5** (same as the maths doc). Contains:
  - links and revolute joints
  - a `<ros2_control>` block that picks `mock_components/GenericSystem` or your own plugin through the `use_mock` argument
- ⌨️ `config/controllers.yaml`: `joint_state_broadcaster` + `joint_trajectory_controller`
- ⌨️ `launch/arm.launch.py`: `xacro` → `robot_state_publisher`, `ros2_control_node`, the controller spawners, and RViz
- 📋 `rviz/arm.rviz`, `CMakeLists.txt`, `package.xml`

```bash
cb
ros2 launch lab_arm arm.launch.py                 # RViz shows the arm
# other terminal:
ros2 control list_controllers                     # both "active"
ros2 control list_hardware_interfaces             # joint1/position [claimed] ...
ros2 topic echo /joint_states --once
ros2 run tf2_tools view_frames                    # writes frames_*.pdf in the current directory (the tf tree)

# Move to theta1 = 30 deg, theta2 = 45 deg
ros2 action send_goal /arm_controller/follow_joint_trajectory control_msgs/action/FollowJointTrajectory \
  "{trajectory: {joint_names: [joint1, joint2], points: [{positions: [0.5236, 0.7854], time_from_start: {sec: 2}}]}}"

# Check FK against the maths notes
ros2 run tf2_ros tf2_echo base_link tool0         # Translation: [0.995, 0.983, 0.000]
```
✅ **This is the hand FK result from your maths crash course: x = 0.995, y = 0.983.** `robot_state_publisher` did the FK from the URDF.

Try a multi-point trajectory:
```bash
ros2 action send_goal --feedback /arm_controller/follow_joint_trajectory control_msgs/action/FollowJointTrajectory \
  "{trajectory: {joint_names: [joint1, joint2], points: [
     {positions: [1.0, -1.0], time_from_start: {sec: 2}},
     {positions: [-1.0, 1.5], time_from_start: {sec: 4}},
     {positions: [0.0, 0.0],  time_from_start: {sec: 6}}]}}"
```
Optional: `ros2 run rqt_joint_trajectory_controller rqt_joint_trajectory_controller` gives you sliders for the joints.

**🔨 Break it:**
- Command `joint2 = 0.0` with `joint1 = 0.0`. The arm is fully stretched. That's a **singularity** (det J = L1·L2·sin θ2 = 0).
- Note the `Could not enable FIFO RT scheduling` warning in the launch log. The container has no real-time privileges. On real hardware you'd use a PREEMPT_RT kernel and grant `rtprio`.

**🎤** "URDF describes the robot and its ros2_control hardware. The controller manager loads the hardware plugin and runs read → update → write. JTC executes trajectories from the FollowJointTrajectory action. robot_state_publisher does FK into tf."

---

## 10. Custom hardware plugin: "your driver" (45 min)

**Goal:** write the piece the JD calls "hardware abstraction layers and drivers".

```bash
cd ~/ws/src
ros2 pkg create lab_hardware --build-type ament_cmake --dependencies hardware_interface pluginlib rclcpp rclcpp_lifecycle
```
- ⌨️ `include/lab_hardware/simple_arm_hardware.hpp`, `src/simple_arm_hardware.cpp`:
  - `on_init(params)` reads `tau` from the URDF
  - `on_activate` holds the current position, so enabling never jumps
  - `read()` simulates a first-order lag: `pos += (cmd − pos)·dt/τ`, and also sets velocity
  - `write()` is where real code would send commands to the drives (EtherCAT/CAN)
  - `PLUGINLIB_EXPORT_CLASS(...)`
- ⌨️ `lab_hardware.xml` (plugin description). 📋 `CMakeLists.txt` (note `pluginlib_export_plugin_description_file`)

> Jazzy's ros2_control uses the **new API**: override `on_init(const HardwareComponentInterfaceParams&)`. The framework exports the interfaces listed in the URDF, and you use `get_command<double>("joint1/position")` and `set_state(...)`. The old `export_state_interfaces()` style is deprecated.

```bash
cb
ros2 launch lab_arm arm.launch.py use_mock:=false
ros2 control list_hardware_components             # plugin: lab_hardware/SimpleArmHardware
# send the same trajectories as step 9, and watch the lag in RViz / PlotJuggler (/joint_states)
```
**🔨 Break it:**
- Set `<param name="tau">-1</param>` in the URDF. `on_init` returns ERROR and the hardware never loads. Read the log.
- Set `tau` to 2.0. The arm lags far behind the trajectory, and JTC may report a tolerance error.

**🎤** "Same controllers and launch file. Only the hardware plugin changes between mock, my driver, Gazebo or real hardware. That's how I'd run SIL and HIL, and it mirrors the multi-backend bridge I built at Caterpillar."

---

## 11. Bonus (15 min each, if time remains)

- **DDS vendor swap:** `RMW_IMPLEMENTATION=rmw_cyclonedds_cpp ros2 run demo_nodes_cpp talker` in one terminal and `ros2 run demo_nodes_cpp listener` (Fast DDS) in another. They still talk. That's RMW abstraction plus the DDS standard.
- **Domain isolation:** `ROS_DOMAIN_ID=7 ros2 run demo_nodes_cpp listener` hears nothing from domain 42.
- **Unit test:** add `ament_cmake_gtest` and test a pure function, then run `colcon test && colcon test-result --verbose`.
- **Parameter callback:** fix the step 3 "Break it" (live `rate_hz` changes).

---

## Gotchas you hit along the way (good interview material)

| Symptom | Cause / fix |
|---|---|
| `ros2 node list` empty on the first try | The CLI daemon is just starting. Run it again. |
| Dead nodes still listed | Stale daemon cache: `ros2 daemon stop` |
| Package or executable "not found" after a build | Forgot to `source install/setup.bash` (`cb` does it) |
| Subscriber gets nothing, but the topic exists | QoS mismatch: `ros2 topic info -v` |
| Parameter from YAML ignored | The node name or namespace doesn't match the YAML key (`/**/` wildcard) |
| Cancel ignored while an action runs | Single-threaded executor blocked; use MultiThreadedExecutor or callback groups |
| `Could not enable FIFO RT scheduling` | No real-time privileges (expected in a container) |
| Python script "not found" by `ros2 run` | Not executable (`chmod +x`) or missing from `install(PROGRAMS ...)` |
| Python build error `No module named 'em'` | The wrong `python3` is on PATH. The ROS build needs system Python (`.rosrc` handles it) |

---

## When you're done, you can honestly say
> "I've built a multi-package ROS 2 Jazzy workspace: custom interfaces, C++ and Python nodes, QoS, namespaced multi-robot launch, lifecycle nodes, an action-based experiment runner, rosbag2 recording, and a ros2_control arm with both mock hardware and my own hardware-interface plugin. I verified FK through tf2 against hand calculations."

That's a hands-on practice project, and that's how you should describe it, not as production experience.
