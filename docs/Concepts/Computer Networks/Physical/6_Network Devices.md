## Intro

![[Pasted image 20260813121806.png]]

>A good network need
> - Connect multiple devices
> - Send data to the correct destination
> - Extend signal range
> - reduces unnecessary traffic
> - Connect different networks
> - improves performance and reliability

1. Router
2. Hub
3. Switch
4. Bridge
5. Repeater
6. Gateway
7. WAP
8. Firewall
---
## Repeater

> - It regenerates or repeats a signal.
> - Sits at physical layer

What it does ?
1. Receives weak signal
2. Regenerates or repeats the signal
3. Extends the transmission distance

What is does not do ?
1. Does not understand frames
2. Does not use MAC and IP addresses
3. Does not make routing decisions

Used in
1. Long cable runs
2. Wifi
---
## Hub

>- Hub broadcasts the received data to every device connected to it.
>- Sits at physical layer

What it does ?
1. Receives bits on one port
2. Repeats to all other ports
3. Does not inspect the MAC addresses

Cons
1. Shared collision domain
2. Unnecessary traffic
3. Poor efficiency
4. Weak Security
5. No intelligence

Used in
1. Smaller LANs to connect devices cheaply
---
## Switch

> - A smart repeater that forwards data selectively
> - Main device inside a modern LAN
> - It forwards Ethernet frame using MAC Address and MAC Address table

What it does?
1. It learns which MAC is on which port
2. Reduces traffic
3. Efficient and secure

Used in
1. Offices
2. Server rooms
3. Data centres

How MAC table is furnished?

>`Unknown first - Learned Later - Forwards Intelligently after that`

1. Frame arrives at the switch.
2. Switch floods the frame out of all out going ports.
3. The destination MAC replies to switch that it received, thus MAC table is cached or furnished.
4. In future the same table is used.
---
## Bridge

> - Bridge connects two LAN segments

1. Filters traffic using MAC Addresses
---
## Router

>A router connects different networks.

1. It forwards packets using IP addresses.
2. Router connects the local network to public network
3. Acts as default gateway
4. Can perform NAT
---
## Gateway

>A gateway connects different networks that may use different protocols

1. Usually router is also acted as a gateway
2. Send traffic outside local network
3. Perform protocol conversion
4. Translate data between different standards
5. Work across multiple OSI layers
---
## Wireless Access Point

> Allows wireless devices to connect to wired network using `Wifi`

1. Transmits and receives wireless signals
2. Uses wifi standards
3. connects wireless devices to LAN
4. Manages multiple wireless connections
5. Supports security like WPA2/WPA3
---
## Firewall

> A security device that monitors and controls the network traffic

1. Inspects packets
	1. IP Addresses
	2. Port Number
	3. Protocol
	4. Allowed / Blocked Policy
2. Blocks malicious packets
3. Protects from unauthorised access
4. May support VPN termination
5. Enforces security policy
