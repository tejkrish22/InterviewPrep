##  Classless Inter-Domain Routing

> Modern way to represent and allocate IP networks.

1. The older approach is not flexible.
2. CIDR tells
	1. how much of the address is network and host part
	2. how routers summarise routes efficiently

## Route Aggregation

1. Subnetting divides one network into smaller pieces
2. Super-netting combines contiguous networks into one summarised route - called Route Aggregation.
3. The following IPs can be summarised as `192.168.0.0/22`
	1. `192.168.0.0/24`
	2. `192.168.1.0/24`
	3. `192.168.2.0/24`
	4. `192.168.3.0/24`
4. Routing table tells for a given destination IP what is the next hop's IP.
5. Assume for the above given 4 IPs, the next hop is same; then you can replace all 4 entries into 1.
6. This saves entries in routing table. 



































































































l 