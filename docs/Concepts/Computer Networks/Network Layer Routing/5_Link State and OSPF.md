
## What is Link State Routing?

Distance Vector Routing, where routers learned routes by asking their neighbours for routing information. Routers did not know the complete network topology and relied on what neighbouring routers told them.

Link State Routing takes a fundamentally different approach. Instead of depending only on neighbour information, routers learn the entire network topology and then calculate the best paths themselves.
## Why link state over Distance Vector ?

1. Slow convergence
2. Routing loops
3. Limited visibility
4. Poor Scalability
## How Link State Works ?

1. **Discover neighbours** directly connected to one router
2. **Determine cost** of each link.
3. Create **Link State Advertisement** describing its links
4. **Flood LSAs** to all routers in network
5. Each router **fill routing table** based on info in LSA
6. Each router **runs Shortest Path First algorithm** (Based on Dijkstra's) to compute best paths.
7. Every **router has the same complete view** of network topology
## OSPF

1. OSPF stands for **Open Shortest Path First**, most common example of a Link State Routing protocol.
2. Characteristics
	1. IGP protocol
	2. Based on Link State
	3. Cost is commonly related to bandwidth.
	4. It supports hierarchical designs using Areas.
	5. It is widely used in enterprise environments.
## Advantages of Link State Routing

- Faster convergence than Distance Vector protocols.
- Better scalability for large networks.
- Complete visibility of network topology.
- More accurate route calculations.
- Reduced dependence on neighbour-only information.
## Disadvantages of Link State Routing

- Requires more memory.
- Requires more CPU resources.
- More complex to understand and configure.
- LSA flooding creates additional overhead.