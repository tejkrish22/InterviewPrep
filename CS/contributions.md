# Contributions in plat_simulation, mapped to the Cosmoserve Robotics Software Engineer JD

Source: `~/src/plat_simulation` git history, May 2023 to Nov 2026. The count is about 390 non-merge commits, excluding automated "Agent host session" checkpoints.
Platform: Caterpillar's autonomy simulator (a CARLA/Unreal fork plus Isaac Sim), built with Bazel, C++ and Python.

## Overall view
- **Profile:** simulation and integration software engineer for autonomous construction machines (excavators, wheel loaders, compact track loaders, haul trucks).
- **Core strength:** full feature slices across a large codebase. Each slice runs proto → Unreal C++ server → C++ client and Python bindings → scenario YAML → tests and docs.
- **Robotics depth:** machine kinematics, coordinate frames, SIL/HIL bridges, physics co-simulation and trajectory following.
- **ROS:** mostly ROS 1 runtime work (rospy nodes, msgs, launch files, RViz). ROS 2 work is build-level packaging of interfaces and typesupport.
- **Hardware:** no direct driver, fieldbus or real-sensor work visible in the repo.

## Contributions, grouped by JD area

### C++/Python in a large codebase, Bazel (strong)
- Built stacked vertical-slice features: GenericProp, BermSpline, the MWL/WL machines and the Generic Spline system (#2500 series). Each covers protos, UE C++ services, LibCarla bindings, a Python client, scenarios and tests.
- Wrote custom Bazel/Starlark rules: `cc_import_so_with_alias`, `cc_blender_python_module`, `python_version` and an extended `cc_python_module`.
- Exposed the C++ `platform_core/motion_model` to Blender Python 3.11 through Boost.Python (#3228). This includes articulation and track specs, a C++17 compatibility fix and a migration to the Proto field-access API (#4125).
- Integrated LibTorch (CUDA) into Bazel. Built a C++ point-cloud pipeline: `.bin` → PCL range filter → `torch::Tensor` → TorchScript inference (#1250).

### Robot kinematics, coordinate transforms, dynamics (moderate)
- **Hex 323 excavator:** fixed swing/boom/stick/bucket bone transforms to the ENU convention, with per-joint tests and collision checks.
- **WL 980XE motion model:** articulated steering plus lift/tilt prismatic cylinders.
  - Blender `bpy` extractor (`measure_wl.py`) measures linkage geometry into a YAML model description.
  - `toWlState` converts the model state, including yaw → quaternion.
  - Unreal automation test for the machine.
- Trajectory stack in `scenario_designer/blender_addon/physics`: path smoother, pure pursuit (tuned lookahead), reverse arrival, braking, steering damping, and nav → machine-control conversion for WL and CTL.
- Terrain physics:
  - Saves and loads deformed terrain (gtest).
  - Project Chrono bucket-fill proof of concept and `TerrainPatch`.
  - Multi-level (spiral) terrain deformation.
  - Optimized mesh reads.
- Handled ROS ↔ Unreal handedness and frame conversion in the machine bridges.

### SIL/HIL and integrating other teams' models (strong to moderate)
- **CMS-MWL Dynasty co-simulation (#1484, #1495, #1557):** WL control/state protos, gRPC `WlService`, `WlMachine` / `Wl938Machine` / `Wl980XEMachine`, and `Oht793Machine` (#1965).
- **WL Machine OS3 bridge refactor (#1839):**
  - Switchable motion-model backends (kinematic or Dynasty) and application modes (CMS HIL or SIL).
  - `WlMotionModel` abstract base class (ABC) with `apply_control` and `get_state`.
  - NNG pub/sub transport, and sim-time-stamped `BaseMachineData`.
- **C++ `app/cms/ais_bridge`:** ROS ↔ AIS conversions for obstacle and collision-awareness messages.
- These map directly to the JD's "consume MBD/dynamic model outputs and integrate them for HIL/SIL".

### ROS / ROS 2 (moderate, mostly ROS 1 runtime)
- Defined custom messages: `MwlControl`, `WlControl` and `HumanOperatorControl` in `incubator_msgs`.
- Built a keyboard teleop node (10 Hz publisher, `/clock` sync), a roslaunch file with args/params, and RViz configs.
- Built a radar sensor ROS bridge and an RGB camera-annotation publisher, the latter with an RViz demo config.
- Added `ApplyAndPubWlControlBehavior`, which publishes `WlControl` as `TwistStamped` (`cmd_vel`) and `JointState` (`actuators`). It ships with about 670 lines of tests and wiki docs.
- **ROS 2 packaging (on branch `teja/fix/complete-isaac-ros-message-closure`, not on `main`):**
  - `ros2_interface_archive` Starlark rule packages Bazel-built rosidl Python interfaces and typesupport `.so` files into a relocatable ROS 2 prefix. The prefix includes an ament index and a `setup.bash`.
  - It replaces the hand-maintained colcon overlay in the Isaac Sim image, and comes with a contract test plus collision detection.
  - Aligned the AT message dependency closure across the ROS1 ↔ ROS2 bridge.

### Experiment software and automation (strong)
- **Blender Scenario Designer add-on (about 100 commits, PRs #3069–#3075, #3135, #3228):** visual authoring of actors, sensors, waypoints, behaviours and 3D trajectories, exported as structured scenario YAML. Includes import/export, unit tests and a "publish to ROS" option.
- Built a YAML scenario framework, CfH and lidar-SIL scenario migration, and an Isaac Sim AT scenario with props, a berm spline and terrain.
- Built a Blender → USD props pipeline and a TF/constraint extractor for machine models.
- Re-architected a telemetry replay tool from C++ to Python with plotting dashboards (Tech-AA-Thon winner, per the résumé).

### DevOps, testing and docs (moderate)
- Built the Blender dev Docker image and its GPU fixes, Isaac Sim image changes, and a ROS 2 Docker image CI workflow.
- Testing: gtest, pytest, and Unreal automation tests (for example `GenericSplineTest.cpp`, 519 lines).
- Docs:
  - Wiki: Scenario Component Reference.
  - Docs: AT message closure.
  - Migration notes: repo move, about 1.5k lines and 25 stacked PRs.
- PR discipline: numbered stacked PRs, design links, and changes in response to review.

## Gaps against the JD (none visible in the repo)
- **ROS 2 runtime:** rclcpp/rclpy nodes, launch.py, services, actions and lifecycle nodes.
- **Control and planning stack:** `ros2_control` hardware interfaces and controllers, MoveIt 2 and Nav2.
- **Hardware:** drivers for EtherCAT, CAN or serial, real IMU, encoder or F/T sensors, calibration and time sync.
- **Manipulator maths:** FK/IK, Jacobians, DH parameters and equations of motion. The existing work is vehicle and linkage kinematics.
- **Data:** rosbag2 recording and replay.
- **Safety:** joint limits, workspace monitoring and e-stop logic.
- **Learned policies:** wrapping RL/ML policies as real-time ROS 2 nodes.
- **Operations:** diagnostics, monitoring and Foxglove dashboards, systemd services, and multi-machine DDS tuning.
- **Simulator choice:** Gazebo and URDF/XACRO. The existing work uses CARLA, Unreal and Isaac Sim with USD.

## What to focus on

### Pitch (what to lead with)
- **SIL/HIL bridge architecture:** a pluggable motion-model and transport design. It is the closest match to how this role integrates the work of the MBD and Controls teams.
- **End-to-end ownership:** feature slices across proto, C++ server, client, Python, tests and docs, in a large Bazel monorepo.
- **Experiment tooling:** the Scenario Designer maps to "repeatable, parameterised test campaigns".
- **Build-level ROS 2 work:** interface and typesupport packaging, and the ROS1 ↔ ROS2 bridge closure.
- **Applied kinematics:** frame conventions, articulated and prismatic linkages, pure pursuit and quaternions.

### Upskill and build a portfolio (in priority order)
1. **ROS 2 runtime project:** a 6-DOF arm in Gazebo, built as a multi-package colcon workspace. Include:
   - rclcpp nodes, a launch.py and parameters.
   - A custom action.
   - A lifecycle node.
   - Unit and integration tests, with GitHub Actions CI.
2. **`ros2_control`:** write a custom `SystemInterface` hardware plugin.
   - Start with a mock, then drive a serial or CAN device (Arduino or STM32 with a USB-CAN adapter).
   - Use `joint_trajectory_controller`.
3. **MoveIt 2:** URDF/XACRO, an SRDF, planning, and Cartesian Jacobian velocity control. Revise FK/IK, Jacobians, DH and the equations of motion.
4. **Experiment framework:** a parameterised launch, rosbag2 record and replay, Python post-processing and a Foxglove dashboard.
5. **Safety supervisor node:** joint and velocity limits, a workspace bounding box and e-stop handling, with `diagnostic_updater`.
6. **Learned policy as a node:** an ONNX/TorchScript policy wrapped as a ROS 2 node, with latency measurements. This reuses the LibTorch experience.
7. **Systems:** Docker deployment, a systemd service, and a two-machine DDS setup (FastDDS/CycloneDDS, domain IDs, QoS).
8. **Domain basics:** space proximity operations and relative motion (CW/Hill equations).

### Résumé adjustments
- Make ROS 1 vs ROS 2 explicit, and add the ROS 2 interface packaging work once it is merged.
- Add the HIL/SIL bridge abstraction and the transport protocols used (NNG, gRPC).
- Add the kinematics specifics: ENU frames, articulated steering, cylinder linkages and pure pursuit.
- Link a GitHub portfolio containing items 1–5 above.
