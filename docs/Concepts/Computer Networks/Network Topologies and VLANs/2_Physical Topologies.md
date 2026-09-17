> Real arrangement of cables, links and devices

## Kinds

1. Star
2. Ring
3. Mesh
4. Bus
5. Tree
6. Hybrid

## Star Topology

1. All end devices connect to one central device e.g. switch.
2. Switch will
	1. receives frame
	2. check destination MAC
	3. if known - forward to one port
	4. if unknown - floods to relevant ports

| Pros                                               | Cons                          |
| -------------------------------------------------- | ----------------------------- |
| 1. Easy to add devices                             | 1. Central device is critical |
| 2. Failure of one cable affects<br>only one device | 2. Needs more cabling         |
| 3. Simple troubleshooting                          |                               |
| 4. Better than bus                                 |                               |
| 5. Better with Ethernet Switching                  |                               |

## Ring Topology

1. Each device connects to two neighbours forming a circle.
2. Data moves from one node to the next until it reaches the destination
3. Token Concept
	1. Only the device holding the token may transmit
	2. Preventing multiple devices transmitting at the same time; leading collisions

| Pros                                         | Cons                                                                   |
| -------------------------------------------- | ---------------------------------------------------------------------- |
| 1. Predictable access in token-based designs | 1. A single break can affect<br>communication unless protection exists |
| 2. Can support special environments          | 2. Harder to manage than star                                          |
| 3. Can support redundancy in some designs    | 3. Higher delay                                                        |

## Mesh Topology

1. Devices are connected to many or all other devices.
	1. Full Mesh: Every node is connected to each other.
	2. Partial Mesh: Only some nodes have multiple direct links.

| Pros               | Cons                 |
| ------------------ | -------------------- |
| 1. High Redundancy | 1. Expensive         |
| 2. Fault Tolerant  | 2. Complex to manage |


## Bus Topology

1. All devices share one common backbone cable.
2. Shared Ethernet, less cabling 

| Pros                     | Cons                                  |
| ------------------------ | ------------------------------------- |
| 1. Cheap in older setups | 1. Single point of failure: One Cable |
| 2. Less Cabling          | 2. Collisions                         |
|                          | 3. Poor Scalability                   |

## Tree Topology

1. Devices are arranged in a hierarchy.
2. Why does it exist ?
	1. One single switch is not enough for larger networks
	2. As Network grows
		1. more users must be connected
		2. more floors or rooms need coverage
		3. more switches are needed
3. Layers of Tree topology
	1. Core
	2. Distribution
	3. Access

| Pros                        | Cons                                    |
| --------------------------- | --------------------------------------- |
| 1. Highly Scalable          | 1. More cabling and complexity          |
| 2. Structured and Organized | 2. Upper level devices become important |
## Hybrid Topology

1. A network that combines two or more different topologies.
2. Different parts of a real network have different requirements.


| Pros                             | Cons                      |
| -------------------------------- | ------------------------- |
| 1. Very realistic for real world | 1. Complex                |
| 2. Flexible                      | 2. Harder troubleshooting |
