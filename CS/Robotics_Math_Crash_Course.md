# Robotics Maths Crash Course (plain English, with worked numbers)

Goal: understand each idea well enough to **explain it on a whiteboard** and **connect it to code**. All the numbers below were checked in Python.

Use this order: read the **Intuition** line, then the **Formula**, then follow the **Example**.

---

## 0. The one mental model

Every robot problem is one of these questions:

| Question | Name |
|---|---|
| "I know the joint angles / commands. Where is the robot or tool?" | **Forward kinematics (FK)**: easy, one answer |
| "I want the tool *there*. What joint angles do I need?" | **Inverse kinematics (IK)**: harder; 0, 1, or many answers |
| "If the joints move at *this* speed, how fast does the tool move?" | **Jacobian (J)** |
| "What motor torque do I need to make it move like that?" | **Dynamics** (equations of motion) |
| "Where is point P as seen from frame B?" | **Coordinate transform** (tf2 in ROS) |

---

## 1. Coordinate frames and 2D rotation

**Intuition:** the same point has different coordinates depending on who is looking at it. To see a world point "from the robot's eyes", subtract the robot's position, then rotate by **minus** the robot's heading.

**Formula** (world → robot frame, heading θ):
```
dx = Px − Rx,   dy = Py − Ry
x_local =  cosθ·dx + sinθ·dy      (how far AHEAD)
y_local = −sinθ·dx + cosθ·dy      (how far LEFT; negative = right)
```

**Example:** the robot is at (10, 5) facing **north** (θ = 90°). The target is at (12, 8).
- dx = 2, dy = 3
- x_local = 0·2 + 1·3 = **3 m ahead**
- y_local = −1·2 + 0·3 = **−2 → 2 m to the right**

Sanity check: when you face north, east is on your right. ✅ This is the first step of pure pursuit in your project.

---

## 2. Homogeneous transforms (the 4×4 matrix)

**Intuition:** a single matrix that does **rotate + translate** together, so transforms can be **chained by multiplying**.

```
T = | R  p |      R = 3×3 rotation, p = 3×1 position
    | 0  1 |

Point in world  =  T_world←robot · T_robot←camera · Point_in_camera
```

**Inverse:** `T⁻¹ = | Rᵀ  −Rᵀp |`. You don't need a general matrix inverse, because a rotation's inverse is its transpose.
                 `     | 0    1  |`

**ROS link:** this is exactly what **tf2** stores: a tree of frames (`map → odom → base_link → camera_link`), each edge a transform. `lookupTransform("map", "camera_link")` multiplies along the tree for you.

---

## 3. Forward kinematics: 2-link planar arm

**Setup:** link 1 has length L1 and its joint angle θ1 is measured from the x-axis. Link 2 has length L2 and its angle θ2 is measured **relative to link 1**.

**Intuition:** walk along link 1, turn by θ2, walk along link 2.

**Formula:**
```
x = L1·cos(θ1) + L2·cos(θ1 + θ2)
y = L1·sin(θ1) + L2·sin(θ1 + θ2)
```

**Example:** L1 = 1.0 m, L2 = 0.5 m, θ1 = 30°, θ2 = 45° (so θ1 + θ2 = 75°)
- x = 1·cos30° + 0.5·cos75° = 0.866 + 0.129 = **0.995 m**
- y = 1·sin30° + 0.5·sin75° = 0.500 + 0.483 = **0.983 m**

---

## 4. Inverse kinematics: 2-link planar arm

**Intuition:** you know where the tip must go, so the distance from the shoulder to the tip is fixed. The law of cosines tells you how much the elbow must bend to make that distance. There are **two answers**: **elbow-up** and **elbow-down**.

**Formula:**
```
cos(θ2) = (x² + y² − L1² − L2²) / (2·L1·L2)
θ2 = ± acos(...)                                ← two solutions
θ1 = atan2(y, x) − atan2(L2·sin θ2, L1 + L2·cos θ2)
```
- If |cos θ2| > 1, the target is **out of reach**: no solution.
- Always use **atan2**, never atan, because atan2 handles all four quadrants.

**Example:** target (0.995, 0.983), the answer from section 3
- cos θ2 = (0.990 + 0.966 − 1 − 0.25) / (2·1·0.5) = **0.707** → θ2 = ±45°
- Solution A: θ1 = **30°**, θ2 = **+45°** ✅ (the pose we started from)
- Solution B: θ1 = **59.3°**, θ2 = **−45°** (the other elbow pose)

**Interview line:** "FK has one answer. IK can have several or none, so the software must pick one using joint limits, closeness to the current pose, or collision checks. For 6-DOF arms, MoveIt 2 uses numerical solvers like KDL or TRAC-IK instead of closed-form formulas."

---

## 5. Jacobian: velocities and singularities

**Intuition:** the Jacobian is a **table of sensitivities**. Column i answers: "if I move only joint i at 1 rad/s, which way and how fast does the tip move?"

**Formula:** `tip_velocity = J(q) · joint_velocity`, written as **ẋ = J·q̇**

For the 2-link arm (just differentiate the FK formulas):
```
J = | −L1·sinθ1 − L2·sin(θ1+θ2)    −L2·sin(θ1+θ2) |
    |  L1·cosθ1 + L2·cos(θ1+θ2)     L2·cos(θ1+θ2) |
```

**Example**, at θ1 = 30°, θ2 = 45°:
```
J = | −0.983  −0.483 |
    |  0.995   0.129 |
```
- **Forward use:** joints move at q̇ = (0.1, 0.2) rad/s → tip velocity ẋ = **(−0.195, 0.125) m/s**
- **Inverse use (the important one):** you want the tip to move straight along +x at 0.1 m/s → q̇ = J⁻¹·ẋ = **(0.037, −0.282) rad/s**

This is **"Jacobian-based velocity mapping"** from the JD: you command a Cartesian tool velocity, and software converts it to joint velocities. MoveIt 2 Servo / teleop works this way.

### Singularity
- `det(J) = L1·L2·sin(θ2)`. Here it's 1·0.5·sin45° = **0.354**, which is fine.
- **det = 0 when θ2 = 0° (arm fully stretched) or 180° (fully folded).** The arm **can't move in some direction**, and J⁻¹ blows up, demanding huge joint speeds.
- **Software fix:** use a **damped pseudo-inverse** `q̇ = Jᵀ(J·Jᵀ + λ²I)⁻¹·ẋ`, and slow down or stop near singularities. This is a **safety supervision** point.

### Force mapping (bonus, the JD's "force/torque-aware interfaces")
**τ = Jᵀ·F** turns a force at the tip into the joint torques that balance it.
- Example: a 10 N force pushes **down** on the tip, F = (0, −10) → τ = Jᵀ·F = **(−9.95, −1.29) N·m**
- Use: with an F/T sensor reading, you can estimate joint loads, or detect a collision when the measured torques don't match the expected ones.

---

## 6. DH parameters

**Intuition:** a **standard recipe of 4 numbers per joint** that describes how each link's frame sits relative to the previous one. With it, FK for any serial arm becomes "multiply one 4×4 matrix per joint".

| Parameter | Meaning (plain) |
|---|---|
| **θ** (theta) | rotation about the old z-axis (**the joint variable for a revolute joint**) |
| **d** | slide along the old z-axis (**the joint variable for a prismatic joint**) |
| **a** | link length: distance along the new x-axis |
| **α** (alpha) | twist: rotation about the new x-axis (how the next joint axis is tilted) |

Per-joint transform: `T = Rot_z(θ) · Trans_z(d) · Trans_x(a) · Rot_x(α)`, and FK is `T_0→n = T1·T2·…·Tn`.

**Example: the 2-link planar arm:**

| Joint | θ | d | a | α |
|---|---|---|---|---|
| 1 | θ1 | 0 | L1 = 1.0 | 0 |
| 2 | θ2 | 0 | L2 = 0.5 | 0 |

Multiply them and you get exactly the formulas in section 3.

**ROS link:** ROS doesn't use DH directly. **URDF / XACRO** describes each joint with `<origin xyz rpy>` and `<axis>`. Same idea, different notation. `robot_state_publisher` reads the URDF + `/joint_states` and publishes the tf tree, so **FK is done for you**.

---

## 7. Dynamics: equations of motion

**Intuition:** kinematics is "where and how fast". Dynamics is "**how much push (torque)** it takes", which depends on mass, how it's spread out, and gravity.

**Single link (pendulum)**, mass m at distance L, angle θ measured from horizontal:
```
τ = m·L²·θ̈  +  m·g·L·cos(θ)
    (inertia × acceleration) + (gravity)
```
Example: m = 2 kg, L = 0.5 m, held still and horizontal → τ = 2·9.81·0.5 = **9.81 N·m** just to fight gravity.

**General robot (memorise the shape, not the derivation):**
```
τ = M(q)·q̈ + C(q, q̇)·q̇ + g(q)
```
| Term | Plain meaning |
|---|---|
| M(q) | inertia: how hard it is to accelerate (changes with pose) |
| C(q,q̇)·q̇ | Coriolis/centrifugal: "swinging" forces when several joints move |
| g(q) | gravity load at this pose |

**Software uses:** **gravity compensation** (send g(q) as feed-forward torque), torque-limit checks before executing a trajectory, and collision detection (measured torque ≫ expected).

**In your JD:** the MBD engineers own these models. You **consume** them, by wrapping them in a node, feeding them states, and checking limits.

---

## 8. Mobile robot kinematics (your project's world)

### Unicycle / differential drive / skid-steer (CTL)
State (x, y, θ), commands (v, ω):
```
ẋ = v·cosθ,   ẏ = v·sinθ,   θ̇ = ω            ← FK (integrate each tick)
v_left  = v − ω·B/2,   v_right = v + ω·B/2     ← IK to track speeds (B = track width)
```
**ROS link:** this is the `cmd_vel` (`geometry_msgs/Twist`) → `diff_drive_controller` path in ros2_control.

### Pure pursuit
**Intuition:** pick a point L_d metres ahead on the path, and drive the **circular arc** that passes through it.
```
κ = 2·y_local / L_d²       (curvature = 1/turn radius)
ω = v·κ
```
**Example:** target at local (3 m ahead, 1 m left) → L_d = √10 = 3.16 m
- κ = 2·1 / 10 = **0.2 1/m** → turn radius **5 m**
- At v = 2 m/s → ω = **0.4 rad/s**

Trade-off: a **big L_d is smooth but cuts corners**; a **small L_d is accurate but oscillates**. That's why your code adapts L_d. In ROS 2, this is the **Nav2 Regulated Pure Pursuit** controller.

### Articulated steering (wheel loader)
The body bends in the middle by an angle φ:
```
κ = tan(φ/2) / (L/2)          L = front + rear length
φ = 2·atan(L·κ / 2)           ← inverse (curvature → steering angle)
```
Example: L = 3 m, φ = 30° → κ = 0.179 → turn radius **5.6 m**. The steering can only change at a limited rate (°/s), which is why commands have to be checked by simulating them.

---

## 9. Hydraulic cylinder ↔ joint angle (your bucket)

**Intuition:** the cylinder is the third side of a triangle formed by two fixed pivots and the joint. As the joint angle changes, that side gets longer or shorter.

```
ℓ² = a² + b² − 2·a·b·cos(θ)                 (law of cosines)
ℓ̇  = (a·b·sinθ / ℓ) · θ̇                     (actuator Jacobian: ∂ℓ/∂θ)
```
**Example:** a = 1.0 m, b = 0.6 m, θ = 60° → ℓ = **0.872 m**. If the joint rotates at 0.2 rad/s, the cylinder extends at **0.119 m/s**.

**Honest connection to your project:** your tool **measured** ℓ from the rig geometry instead of using this formula, then did velocity = Δℓ / Δt. This formula is the analytic version.

---

## 10. Trajectories (turning waypoints into smooth motion)

| Type | Plain meaning | Note |
|---|---|---|
| **Linear (constant velocity)** | straight line between points | velocity jumps at each point, causing jerk. This is what your bucket export did |
| **Trapezoidal velocity** | ramp up, cruise, ramp down | respects max velocity and acceleration; the common industrial choice |
| **Cubic / quintic polynomial** | smooth curve through the points | cubic gives continuous velocity; quintic also gives continuous acceleration |

**ROS link:** `trajectory_msgs/JointTrajectory` holds points with `positions`, `velocities` and `time_from_start`. `joint_trajectory_controller` interpolates between them (linear, cubic or quintic, depending on which fields you fill in).

---

## 11. Quaternions (30-second version)

- A 3D rotation stored as 4 numbers **(x, y, z, w)**. ROS order is **x, y, z, w**.
- Rotation by angle α about a unit axis u: `w = cos(α/2)`, `(x,y,z) = u·sin(α/2)`
- Yaw-only rotation: `z = sin(ψ/2)`, `w = cos(ψ/2)`
- **Why not Euler angles?** Euler angles suffer **gimbal lock** and don't interpolate smoothly. Quaternions don't have either problem.
- Yaw from a quaternion: `ψ = atan2(2(w·z + x·y), 1 − 2(y² + z²))`. Your project used this to stop heading drift.

---

## 12. Space proximity operations (one paragraph, the JD's nice-to-have)

Two spacecraft in nearby orbits: the "chaser" moves **relative** to the "target". For close range, the relative motion is described by the **Clohessy-Wiltshire (Hill) equations**. These are linear equations in a frame rotating with the target, and they show counter-intuitive effects: thrusting forward makes you drift up and back. A ground lab reproduces this with **robots (manipulators or motion platforms) moving mock-ups**, so the lab software must execute the computed relative trajectories accurately, safely, and repeatably, which is exactly this job.

---

## 13. Rapid-fire answers (say these out loud a few times)

- **FK vs IK?** FK: angles → pose, one answer. IK: pose → angles, many or no answers, so you pick one using limits or closeness.
- **What's a Jacobian?** It maps joint velocities to tool velocity. Inverting it lets me command tool velocity. Its transpose maps tool force to joint torques.
- **What's a singularity?** A pose where J loses rank (det = 0): the tool can't move in some direction and joint speeds blow up. Handle it with damped least squares, slowing down, or avoiding the region.
- **Why DH?** It's a standard 4-parameters-per-joint way to build FK by chaining transforms. ROS uses URDF instead, but it's the same idea.
- **τ = M q̈ + C q̇ + g?** Inertia, coupling, and gravity. Software uses it for gravity compensation, torque-limit checks, and collision detection.
- **Why atan2?** It gives the correct quadrant and handles x = 0.
- **Why quaternions?** No gimbal lock, and smooth interpolation.
- **How do you verify a transform is right?** Visualise it in RViz 2 (the tf tree), check a known point by hand, and write a unit test (e.g. FK(IK(p)) == p).
