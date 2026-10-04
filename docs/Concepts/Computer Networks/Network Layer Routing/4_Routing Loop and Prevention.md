
> Routers may temporarily have incomplete, delayed, or inconsistent information about the network. When this happens, packets may stop making progress toward their destination and instead begin circulating between routers - Routing Loop.

## Example 

1. Consider two Routers A and B, and a packet needs to reach Network X. 
2. Router A believes the best path to Network X is through Router B.
3. The packet is forwarded to Router B.
4. Router B, however, believes the best path to Network X is through Router A.
5. The packet is then sent back to Router A.
6. This happens in a loop - Routing Loop

## Problems caused by Routing Loops

1. Bandwidth wastage
2. Router CPU wastage
3. Increased packet delay
4. Network Instability
## Preventions Mechanisms

1. TTL (time to live)
2. Split Horizon
3. Poison Reverse
4. Route Poisoning
5. Hold Down Timers

## Time to Live

1. TTL is a field present inside the IPv4 packet header. It acts as a life counter for packets travelling through the network.
2. When a sender creates a packet, it assigns an initial TTL value - 64, 128, etc.
3. Each router that forwards the packet decreases the TTL value by 1.
4. Eventually, if TTL reaches 0, the packet is discarded.
5. The router typically sends an ICMP Time Exceeded message back to the sender.
6. TTL is not actually a routing-loop prevention algorithm, It does not stop loops from forming, but it ensures that packets do not circulate forever inside the network.
## Split Horizon

1. Split Horizon is a rule commonly used in distance-vector routing protocols.
2. The idea is simple: **Do not advertise a route back on the interface from which it was learned.**
3. Example
	1. Suppose Router A learns a route to Network X from Router B.
	2. Router A now knows: "I can reach Network X through Router B."
	3. Later, Router B asks Router A for routing information.
	4. Without Split Horizon, Router A might tell Router B: "I can reach Network X."
	5. This creates confusion because Router A originally learned that route from Router B itself.
	6. To avoid this situation, Split Horizon prevents Router A from advertising that route back toward Router B.
4. This helps reduce small routing loops and unnecessary route calculations.

## Poison Reverse

1. Extension of split horizon
2. Instead of remaining silent about a learned route, the router explicitly advertises that route as unreachable (infinity) back toward the neighbour from which it was learned.
3. Sometimes silence is not enough, a neighbouring router may continue believing that a valid path still exists due to delayed updates or temporary inconsistencies.
4. Poison Reverse removes this ambiguity by explicitly marking the route as bad.

## Route Poisoning

1. Route Poisoning is used when a route becomes unavailable.
2. Instead of quietly removing the route, the router actively advertises the failed route as unreachable.
3. This is usually done by assigning an infinite metric to that route.
4. The goal is to spread failure information quickly throughout the network.
5. When neighbouring routers receive the update, they immediately understand that the route should no longer be used.


> [!NOTE] Difference between Poison Reverse and Route Poisoning
>  - **Poison Reverse:** Advertises a route as unreachable back toward the neighbour from which it was learned.
>  - **Route Poisoning:** Advertises a failed route as unreachable to all neighbouring routers.
## Hold Down Timers

1. Hold-Down Timers improve routing stability after failures.
2. When a router detects that a route has failed, it does not immediately trust new updates for that route.
3. Instead, it starts a hold-down timer and temporarily ignores suspicious updates.
4. This waiting period allows incorrect or delayed routing information to disappear before new routes are accepted.

