## Intro

1. The **Physical Layer** deals with bits and signals:
	1. Electrical pulses on copper
	2. Light pulses in fiber
	3. Radio signals in Wifi
2. The **Data Link Layer** handles frames and MAC addresses for local delivery to the next hop.
3. The **Network Layer** uses IP addresses to route packets toward the destination network.
4. The Physical Layer's job is to
	1. Take raw bits
	2. Convert them to real signals
	3. Send them through medium
---
## Bandwidth vs Throughput

1. `Bandwidth` : Capacity of the link to carry data, usually measured in bits/second.
2. `Actual Throughput` : What you actually get, depending on
	1. Overhead
	2. Congestion
	3. Packet Behaviour
	4. Device Limits
	5. Errors