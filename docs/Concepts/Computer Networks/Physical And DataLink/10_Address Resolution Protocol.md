
## Why ARP is needed?

1. The machine knows the destination IP address, but Ethernet needs the destination MAC address to build the frame.
2. ARP solves this in *local network*.
3. Used in IPv4 networks, IPv6 uses Neighbour Discovery Protocol.

## Same LAN ARP Flow

1. **Sender broadcasts** ARP request asking for MAC with given IP
2. **Receiver sends** the ARP response with its  MAC directly to the sender.
3. In the switch, where all devices are connected; the **ARP Cache will update**
4. Thus next time the **cache info is re used** instead of querying again.

## Different LAN ARP Flow

1. If sender realises that target is outside the local network, then sender sends the **ARPs for Default Gateway's** (Router) MAC.
2. At every hop
	1. Router checks destination IP
	2. Finds next hop
	3. Uses next MAC

## ARP Cache and Spooling

1. ARP Cache
	1. A local table that stores recently learned IP->MAC mappings
2. Gratuitous ARP
	1. Devices announces its own IP and MAC, usually without being asked to fill the cache
	2. Reduces the latency
3. ARP Spoofing
	1. Attacker sends the fake messages
	2. Claims its MAC belongs to another IP
	3. Can redirect or interceptor traffic
4. ARP is helpful, but it does not verify authenticity

## ARP Security Issues

1. ARP Spoofing - fake IP-MAC mapping
2. Cache poisoning - wrong mapping inserted into ARP cache
3. Man in the middle - Attacker sits between two devices
4. ARP Flooding - too many fake ARP requests/replies overload devices

## Protecting ARP

1. Dynamic ARP Inspection
	1. Validates ARP packets against trusted data
2. Static ARP Entries
	1. Manually configured IP-MAC mappings
3. Network Segmentation
	1. smaller VLANs reduce attack scope
4. Port Security
	1. limits allowed MAC addresses on a switch port
	2. blocks unknown or suspicious devices
5. ARP protection is usually done at the switch and network design level.