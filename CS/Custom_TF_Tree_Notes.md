# Custom TF Tree: Quick Notes

> Confidential code. Talk about the concepts only. Say "our platform had…" unless you built it yourself.

## What it is
A **family tree of coordinate frames** for each machine (body → boom → bucket → cylinders). Every edge stores **"where the child is, relative to its parent"**. You can ask: "where is frame B as seen from frame A?" It's like ROS tf2, but **in memory, in one process, and with no time history**.

## Pieces
| Piece | Plain meaning |
|---|---|
| `machine_tf_tree.yaml` | One file per machine: a list of `parent → child` edges + offset (translation + rotation) + **which axes may move** |
| `TfTransformTree` | Generic tree: add / update / get transforms |
| `MachineTfTransformTree` | Wrapper: builds the tree from the YAML and **rejects updates that move a joint along an axis it can't move along** |
| Movement components (WL, CTL…) | Each tick: motion-model state → `updateTf()` |
| `BoneUpdate` | Each tick: read transforms → set the Unreal bone rotations |

## How the data is stored
```
adj_list[parent][child] = child_wrt_parent        (a 4×4 rotation + translation)
parents[child]          = parent
depth[frame]            = how far the frame is below the root
```

## How `getTf(A, B)` works (the main idea)
1. **Find the common ancestor** of A and B: move the deeper one up until both are at the same depth, then move both up together until they meet. *(This is the "lowest common ancestor" DSA problem, O(depth).)*
2. **Chain the transforms** from each frame up to that ancestor: `T_anc←A`, `T_anc←B`
3. **Answer:** `T_A←B = (T_anc←A)⁻¹ · T_anc←B`

**Intuition:** to get from A to B, walk **up** from A to the common ancestor (that's the inverse part), then walk **down** to B.

```
          Root
         /    \
      Boom    Body
       |        \
     Bucket    Cylinder
getTf(Bucket, Cylinder) → up from Bucket to Root, then down to Cylinder
```

## Safety checks built in
- Building the tree: a child can't have two parents, a parent must exist first, and a frame can't be its own parent. **This guarantees it really is a tree (no loops).**
- On update: compare the new transform with the old one. If it changed along an axis marked "fixed", **throw**. This catches bugs like a bucket drifting sideways.

## Per-tick flow
```
motion model (lift / tilt / articulation) → updateTf(parent, child, pose)
     → getTf(parent, child) per bone → convert Eigen → Unreal quaternion (axis sign flips) → set bone rotation
```

## vs ROS 2 tf2 (likely follow-up)
| | Custom tree | tf2 |
|---|---|---|
| Where | In one process | Shared over `/tf` and `/tf_static` across nodes and machines |
| Time | Current state only | **Buffer of past transforms**, so "where was it at time t?" |
| Defined by | YAML + protobuf schema | URDF → `robot_state_publisher` |
| Joint-axis check | ✅ | ❌ (limits live in URDF / ros2_control) |

## One-liner
> "A single-process tf2: each machine's frame hierarchy comes from YAML. A lookup finds the common ancestor and composes the transforms, inverting the branch on the source side. Updates are checked against each joint's allowed axes. In ROS 2, I'd swap it for URDF + robot_state_publisher + tf2 to get distribution across nodes and time-stamped lookups."
