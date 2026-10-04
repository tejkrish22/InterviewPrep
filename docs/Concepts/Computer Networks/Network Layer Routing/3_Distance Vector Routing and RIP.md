> In dynamic routing, and in Interior Gateway protocols (IGPs); distance vector routing is earliest and most important approach.
## Core Idea

1. Each router communicates only with its immediate neighbours and shares its view of how far different destinations are.
2. Distance refers to the metric or cost required to reach a destination.
3. Vector refers to the direction or next hop through which the destination can be reached.
4. The intuition behind distance vector routing comes from the Bellman-Ford Algorithm.
5. In simple terms, the router asks: **"Which neighbour gives me the cheapest path to the destination?"** The path with the lowest total cost becomes the preferred route.
6. It simply trusts the neighbour's advertised distance and uses that information when selecting routes.

## Routing Information Protocol

1. RIP is a classic Interior Gateway Protocol that uses the principles of distance vector routing to determine paths through a network.
2. RIP uses a very simple metric: **Hop Count**, Lower hop count is preferred
3. A hop represents a router that a packet must pass through on its way to the destination.
4. RIP allows a maximum distance of **15 hops**. If a destination requires more than 15 hops, RIP treats that destination as unreachable.
5. Pros
	1. Simplicity, in smaller networks there is no need to consider
		1. Bandwidth
		2. Link quality
		3. Advanced Path metrics
	2. Easy to understand, configure, implement
6. Cons
	1. Cannot work in modern larger networks