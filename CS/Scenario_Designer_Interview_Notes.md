# Scenario Designer: Interview Notes

> The code is Caterpillar Confidential. In the interview, describe it at the level of concepts and maths below. Don't share code or internal names.

---

## 1. 30-second pitch

> "Autonomy scenarios for our simulator were hand-written YAML: actor poses, sensor mounts, trajectories, and bucket actions. That was slow and error-prone. I proposed a **Blender add-on** that uses Blender's 3D viewport and timeline as the authoring UI, and I owned it end to end: design, architecture, integration, testing and rollout to users. You place machines on the terrain, click waypoints, and keyframe the bucket. The tool turns that into control commands the machine can actually execute. It does this by running our team's **C++ motion models** (exposed to Python through Boost.Python) in a loop with a **pure pursuit** path-following controller. The control approach came from our subject-matter experts. I implemented and integrated it with Copilot's help, and I validated it by replaying the generated commands through the motion model. Scenario creation became about 5x faster, and we scaled to thousands of scenarios for VLA model training."

### What I actually owned vs. what came from others (be truthful)

| I owned | Came from SMEs / other teams |
|---|---|
| Idea and proposal; requirements from scenario authors | The control approach (pure pursuit, lookahead tuning ideas) |
| Add-on architecture: layers, handler registry per machine, protobuf-driven UI | The C++ motion models themselves (written by the modelling team) |
| Integrating the C++ models into Blender (Bazel build, Boost.Python libs) | The machine parameters (limits, dimensions) |
| Command generation, verification and export pipeline; unit tests | |
| Debugging with users: chained behaviors, reverse segments, bucket + drive timing | |
| Copilot-assisted implementation; I reviewed, tested and iterated | |

**If they probe the maths:** "The SME gave me the approach. My understanding is: [intuition from section 4]. To check it was right, I replayed the commands through the motion model and verified the waypoints were hit. I'm now going deeper into the theory."

**On AI use (if asked):** "I used Copilot heavily to implement faster. I owned the design, the reviews and the tests. Every generated piece went through unit tests and replay verification before users saw it."

---

## 2. Why it was built

| Problem | What the tool does |
|---|---|
| Hand-writing YAML with no visual feedback | Visual 3D authoring on the real terrain mesh |
| Waypoints alone aren't executable: the machine has a minimum turn radius, rate-limited steering, and acceleration limits | Generates **commands the real machine model can execute** |
| No way to know whether a scenario "works" until a full simulator run | **Verifies offline** by replaying the commands through the same motion model |
| Bucket motions were hard to script | **Keyframe the bucket like an animator**; cylinder velocities are derived automatically |
| Scaling to 1000s of ML training scenarios | Repeatable, parameterised scenarios with a schema-driven (protobuf) data model |

---

## 3. Main components

```
Blender UI (panels, modal click-to-place, timeline)
        │
        ▼
Models layer (protobuf-backed: Scenario, Actor, Behavior, Condition)
        │
        ├──► physics/ (no Blender dependency, unit-tested)
        │      path_smoother  → Bezier smoothing of clicked waypoints
        │      pure_pursuit   → geometric path-tracking controller
        │      trajectory_navigation → closed-loop rollout (path-follow, rotate-in-place)
        │      trajectory_converter  → orchestration: waypoints → commands
        │      trajectory_simulator  → replay + verify commands
        │      trajectory_model_utils → limits, clamping, quaternion→yaw
        │              │
        │              ▼
        │      C++ motion models (CTL = tracked skid-steer, WL = articulated steering,
        │      prismatic/revolute implement joints) via Boost.Python (libmotion_model.so, built with Bazel)
        │
        ├──► implement/ (bucket)
        │      wl_handler / ctl_handler → read joint/actuator state from the rig
        │      keyframes  → record keyframes from the Blender timeline
        │      export     → keyframes → joint velocity commands
        │
        └──► yaml_io/
               unified_export → merge nav + implement streams on one timeline
               exporter / importer → full YAML round trip
```

Design points worth saying out loud:
- **Handler registry (strategy pattern)** per machine type (`wl`, `ctl`). Adding a new machine means adding a handler, with no rewrites. This matches the JD's "evolve as the facility expands… without requiring rewrites".
- **Protobuf as the single source of truth.** UI forms are auto-generated from proto descriptors, so a new condition type needs zero UI code. This is the same idea as ROS 2 `.msg` / IDL-driven interfaces.
- **Pure logic is separated from the Blender API**, so all physics and conversion code is unit-testable without Blender. This is like keeping node logic separate from the `rclcpp` wrapper.
- **Same C++ model, same `dt` as the simulator**, so the exported commands replay deterministically.

---

## 4. Q1: How waypoints become motion-model control commands

**Short answer:** it's a **closed-loop rollout**. Pure pursuit computes a command, the C++ motion model is stepped with that command for one simulator tick (`dt = 0.05 s`), the command is recorded, and the loop repeats. The recorded command list is what gets exported.

### Pipeline

1. **Sanity check and smoothing.** Warn if waypoints are closer than the minimum turn radius (CTL about 2 m, WL about 4 m). Smooth the polyline with **Bezier interpolation** (about 5 m spacing) so the lookahead point doesn't jump between sparse clicks.
2. **Tangent headings.** Compute the heading at each waypoint from the path tangent. For reverse segments, use the arrival heading.
3. **Initialise the C++ model** at waypoint 0: `CtlMotionModel` / `WlMotionModel.create_flat(model_desc, initial_state)`. When chaining behaviors, start from the **previous behavior's final heading and articulation angle**.
4. **Initial alignment.** If the machine heading differs from the path heading, **rotate in place** (CTL) before driving.
5. **Split into segments by velocity sign** (forward / reverse / stop) and follow each contiguous run as one polyline.
6. **Control loop**, once per tick:
   - Read the state from the model: position, plus yaw from the quaternion `atan2(2(wz+xy), 1-2(y²+z²))`.
   - **Find the lookahead point** on the polyline: project onto the nearest segment, then walk forward a distance `L_d` along the path.
   - **Adaptive lookahead.** WL forward caps it at about 3 m (below the turn radius, so the target stays on the curve) and shrinks it near the stop point. Reverse keeps it at 4 m or more for stability.
   - **Pure pursuit:**
     - Transform the target into the **vehicle frame** (rotation by −θ):
       `x_l =  cosθ·dx + sinθ·dy`, `y_l = −sinθ·dx + cosθ·dy`
     - Curvature of the arc through the target: **κ = 2·y_l / L_d²**
     - Commands: **v = v_desired**, **ω = |v|·κ**
     - Reverse is handled by flipping the heading by π, so the target is "ahead" in the direction of travel.
   - **Velocity scaling.** Slow to as low as 30 % of the speed when the heading error is above 45°.
   - **Reverse WL damping.** Multiply ω by 0.7 after 1 s to stop oscillation.
   - **Clamp to machine limits** read from the C++ model description:
     - CTL: `v ∈ [−v_bwd_max, v_fwd_max]`, `|ω| ≤ ω_max`
     - WL: `κ = ω/v`, `|κ| ≤ tan(φ_max/2) / (L/2)`, then `ω = κ·v`
   - **Record** `ControlCommand(v, ω, dt)` and **step the C++ model** with a `CtlControl{vel_x, ang_vel_z}` or `WlControl{vel_x, curvature}` proto.
   - Stop when within the position tolerance or past the final point.
7. **Stop-before-reverse / stop-after-reverse.** Brake, then re-align the heading in place before the next segment.
8. **Verify.** `verify_trajectory()` replays the recorded commands through a fresh motion model and checks that every waypoint is hit within the position and heading tolerances.

### Inside the C++ WL model (why the loop is needed)
- Commanded articulation angle: **φ_cmd = 2·atan(L·κ / 2)**
- **Rate-limited** by `φ̇_max` (about 20°/s) and clamped to `φ_max` (about 40°)
- Linear velocity is rate-limited by the maximum acceleration
- Realised motion: `κ_actual = tan(φ/2) / (L/2)`, `ω = v·κ_actual`, then the pose is integrated

Because steering lags the command (it's rate-limited), the **open-loop geometric conversion** "waypoints → curvature" would drift. Running the controller **against the real model** bakes those dynamics into the commands, so they're **physically executable and verified**.

> One-liner: "Model-in-the-loop command generation. Pure pursuit is the feedback controller, the C++ kinematic model is the plant, and the output is a verified feed-forward command sequence at the simulator tick rate."

---

## 5. Q2: How bucket keyframes become cylinder velocities

### Pipeline
1. **Enter implement animation mode.** The machine type is auto-detected from bone names: `BoomHydCylBarrelBone` means WL, `LiftArmBone` / `BoomBone+StickBone` means CTL. Frame-change and depsgraph handlers are registered.
2. **The animator keys the control bones** (`BoomBone` = lift, `BucketBone` = tilt) on the timeline. The rig's **parenting and constraints** move the dependent linkage (bell crank, cylinder barrel and rod) automatically.
3. **On each keyframe, measure the joint state** through the machine handler:
   - **WL (prismatic, hydraulic cylinders):** cylinder length = world-space distance between the barrel bone head and the rod bone tail:
     `ℓ = ‖ M_world·rod.tail − M_world·barrel.head ‖`, giving `lift_cyl` and `tilt_cyl` in metres.
   - **CTL (revolute):** joint angle = the bone's local rotation relative to its rest pose (`matrix_basis → Euler`), with a per-bone axis and sign to match the controller convention. This gives `lift_rot` and `tilt_rot` in radians.
   - Time = `frame / (fps / fps_base)`.
4. **Convert to velocity (linear interpolation in joint space):**
   **q̇ᵢ = (qᵢ₊₁ − qᵢ) / (tᵢ₊₁ − tᵢ)**. This is constant velocity between keyframes, followed by a final zero-velocity "stop" command. A STEP mode also exists: hold, then move during the last 10 % of the interval.
5. **Merge with navigation on one timeline** (`merge_commands_by_time`). Event sweep over the start and end times of both streams produces unified `WlControl{nav, lift_cyl.vel, tilt_cyl.vel}` segments. **Steering phases** (rotate-in-place, brake) are **deferred** past implement windows, so the machine holds still while digging.
6. **In the simulator**, the C++ `PrismaticDynSystem` integrates the cylinder velocity. It uses a rate-limited (acceleration-bounded) or first-order response, and **clamps to the stroke** `[ℓ_min, ℓ_max]`.

---

## 6. Is it FK or IK? (be precise, interviewers probe this)

| Part | What it really is |
|---|---|
| **Motion model `step()`** | **Forward kinematics / forward integration**: controls (v, κ or cylinder velocity) → next pose |
| **Pure pursuit** | A **geometric path-tracking controller**, not IK in the manipulator sense. It solves an *inverse problem* ("what curvature reaches this point?"), but with a closed-form arc formula plus feedback, not a kinematic chain inverse. |
| **κ → articulation angle (C++ WL)** | The **inverse kinematics of the vehicle**: `φ = 2·atan(Lκ/2)`. For CTL, (v, ω) → left/right track speeds is the skid-steer inverse (`v_L,R = v ∓ ω·B/2`). |
| **Overall nav pipeline** | Solves an inverse problem **numerically, using FK in the loop** (rollout / shooting), instead of inverting analytically |
| **Bucket posing in Blender** | The animator sets **joint angles** (boom, bucket), which is **FK posing**. The rig constraints resolve the closed-chain linkage. |
| **Cylinder length from bones** | A mapping from **link angles → actuator coordinates** (joint space → actuator space). It's the inverse of what the motion model does (cylinder → angle), but done by **geometric measurement**, not an analytic solve. |
| **Velocity from keyframes** | **Joint-space trajectory interpolation** (finite difference). **No Cartesian IK and no Jacobian**: the bucket-tip pose is never specified. |

**Answer to give** (this is your understanding of the design the SMEs proposed; don't claim you derived it):
> "Neither is classical manipulator IK. Navigation is a geometric controller that uses the forward kinematic model in the loop. In effect I solve the inverse problem numerically by rollout, and the only analytic inverse is curvature → articulation angle inside the model. The bucket side is joint-space trajectory generation: the animator does FK posing, and I read actuator coordinates (cylinder lengths) directly from the rig geometry and finite-difference them into velocities."

**Follow-up: "how would you do it with a Jacobian?"** This links straight to the JD.
- If the user specified a **bucket-tip Cartesian path** `x(t)`, use **ẋ = J(q)·q̇ → q̇ = J⁻¹ẋ** (lift and tilt form a planar 2-DOF chain, so J is 2×2; use the damped pseudo-inverse `Jᵀ(JJᵀ + λ²I)⁻¹` near singularities).
- Map joint rate → cylinder rate analytically with the law of cosines. With pivot distances a and b and a fixed offset θ₀:
  `ℓ² = a² + b² − 2ab·cos(θ + θ₀)` → **ℓ̇ = (ab·sin(θ + θ₀) / ℓ)·θ̇**. Here `∂ℓ/∂θ` is the actuator Jacobian.
- Then clamp to the cylinder velocity limits, scaling the whole vector to preserve direction, and to the stroke limits.

---

## 7. Relevance to the Cosmoserve JD

| JD item | What I did | ROS 2 equivalent to mention |
|---|---|---|
| Trajectory execution pipelines | Waypoints → smoothed path → time-stamped commands → verified replay | Nav2 **Regulated Pure Pursuit** controller (same algorithm: adaptive lookahead, curvature-based velocity scaling) → `cmd_vel` |
| Coordinate transforms | World → vehicle frame in pure pursuit, quaternion → yaw, bone `matrix_world` transforms | `tf2`, `geometry_msgs/TransformStamped` |
| Jacobian-based velocity mapping | Joint-space Δq/Δt; can explain the J⁻¹ / actuator Jacobian extension (section 6) | MoveIt 2 Servo (Cartesian → joint velocities with J⁺) |
| Joint trajectories for an implement | Keyframes → per-joint velocity segments | `trajectory_msgs/JointTrajectory` + `joint_trajectory_controller` (ros2_control) |
| Joint limit enforcement / safety | Clamp v, ω, κ to model limits; stroke clamping; rate limits | ros2_control `joint_limits`, safety supervisor node |
| Consuming MBD/Controls outputs | Used the C++ motion models from the modelling team through Python bindings, without owning them | Wrapping models or policies as nodes; `hardware_interface` / mock hardware |
| SIL testing | Same model and `dt` as the simulator; offline verification | Gazebo plus ros2_control `mock_components` |
| Parameterised, repeatable experiments | YAML scenarios, proto schema, behavior chaining | Launch arguments, YAML params, experiment-orchestration nodes |
| Recording, replay, post-analysis | Command replay and trajectory plotting (plus the telemetry replay tool) | `ros2 bag` record/play |
| Extensible architecture | Handler registry per machine, proto auto-UI | pluginlib plugins (controllers, hardware interfaces) |
| C++/Python, build, tests | C++ core + Boost.Python, Bazel, bpy-free unit tests | pybind11, `colcon`/`ament_cmake`, `ament_cmake_gtest`/pytest |

**Bridge line for the ROS 2 gap:**
> "I haven't shipped ROS 2 yet, but the patterns map directly. My pure pursuit is what Nav2's RPP controller does. My keyframe-to-joint-velocity export is what a JointTrajectory plus joint_trajectory_controller does. My motion model's `step(control, dt)` is the ros2_control read → update → write loop. I'd be learning the APIs, not the concepts."

---

## 8. Likely follow-up questions (quick answers)

- **Why pure pursuit and not Stanley / MPC?** Start with: "That choice came from our SMEs. As I understand it…" Then: it's simple, robust, and has a geometric formula with one tuning knob (lookahead), which suits offline generation where the model is the plant. MPC would handle the rate-limited steering more optimally, but it adds a solver and tuning cost. Stanley needs a front-axle cross-track error, which is less natural for articulated steering.
- **Lookahead trade-off?** Small lookahead tracks accurately but oscillates. Large lookahead is smooth but cuts corners. Hence the adaptive lookahead.
- **Why is reverse unstable on an articulated loader?** Like reversing a trailer, the articulated frame is open-loop unstable when driving backwards, so small steering errors grow. That's why the gains are reduced (×0.7) and the lookahead is kept large.
- **Why simulate instead of computing commands directly?** Rate-limited steering, acceleration limits, and the minimum turn radius make the geometric inverse inaccurate. The rollout guarantees feasibility and lets me verify the result.
- **What if the simulator diverges from the commands?** The same C++ model and the same `dt` make the replay deterministic. On real hardware you'd run the controller **online** in closed loop (Nav2) rather than export feed-forward commands.
- **Why linear interpolation for the bucket?** It's simple and predictable, and it matches the velocity-command interface. The next step would be trapezoidal or S-curve profiles (bounded acceleration) or splines, the way `joint_trajectory_controller` does it.
- **How did you test?** The physics and conversion modules have no Blender dependency, with unit tests for pure pursuit, path smoothing, and the converter (round-trip: convert → verify). There are also proto round-trip tests.
