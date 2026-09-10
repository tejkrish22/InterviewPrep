## Intro

![[devices.png|center]]

>A good network needs to:
>
> - Connect multiple devices
> - Send data to the correct destination
> - Extend signal range
> - Reduce unnecessary traffic
> - Connect different networks
> - Improve performance and reliability

1. Repeater (Layer 1 - Physical)
2. Hub (Layer 1 - Physical)
3. Switch (Layer 2 - Data Link)
4. Bridge (Layer 2 - Data Link)
5. Router (Layer 3 - Network)
6. Wireless Access Point (WAP) (Layer 2 - Data Link / Layer 1)
7. Gateway (Layer 7 - Application / Multi-layer)
8. Firewall (Layer 3/4 Network/Transport up to Layer 7 Application)

---
## Repeater

> - Regenerates or repeats electrical/optical signals over long distances.

- **OSI Layer**: **Layer 1 (Physical Layer)**
- **Why?**: Operates purely at the bit level. It amplifies weak physical signals without inspecting frames, MAC addresses, or IP headers.

What it does:
1. Receives weak physical signal
2. Regenerates/amplifies the signal strength
3. Extends transmission distance over long cable runs

What it does NOT do:
1. Does not understand frames or packets
2. Does not use MAC or IP addresses
3. Does not make routing or forwarding decisions

Used in:
1. Long fiber/copper cable runs
2. Wireless signal extenders

---
## Hub

> - Broadcasts received data bits to every connected device in a network.

- **OSI Layer**: **Layer 1 (Physical Layer)**
- **Why?**: Acts as a multi-port repeater. It receives raw electrical bits on one port and blindly repeats them out to all other ports without reading MAC addresses.

What it does:
1. Receives bits on one port
2. Repeats bits to all other connected ports
3. Treats all connected devices as a single collision domain

Cons:
1. Shared collision domain (high collision risk)
2. Generates unnecessary network traffic
3. Poor efficiency and security (all devices receive all traffic)
4. No intelligence or address inspection

Used in:
1. Legacy or low-cost small LAN setups

---
## Switch

> - Smart device that selectively forwards data within a local network (LAN).

- **OSI Layer**: **Layer 2 (Data Link Layer)**
- **Why?**: Reads Layer 2 Ethernet frames and uses destination **MAC addresses** (via its internal MAC Address Table) to forward data only to the specific target port.

What it does:
1. Learns which MAC address belongs to which physical port
2. Eliminates collisions by providing dedicated bandwidth per port
3. Forwards frames selectively, reducing network traffic

Used in:
1. Modern LANs (offices, home routers, server rooms, data centers)

How MAC Table is populated:
>`Unknown first -> Learned Later -> Forwards Intelligently`
1. Frame arrives at the switch.
2. If destination MAC is unknown, switch floods frame out of all ports except incoming port.
3. When destination replies, switch caches the source MAC address and port number.
4. Future frames to that MAC are forwarded directly to that single port.

---
## Bridge

> - Connects and filters traffic between two separate LAN segments.

- **OSI Layer**: **Layer 2 (Data Link Layer)**
- **Why?**: Inspects Layer 2 MAC addresses to decide whether to forward a frame across LAN segments or keep it local.

What it does:
1. Connects two LAN segments into one logical network
2. Filters traffic using MAC addresses to reduce collision domain sizes

---
## Router

> - Connects different networks and routes data across the Internet.

- **OSI Layer**: **Layer 3 (Network Layer)**
- **Why?**: Inspects Layer 3 **IP addresses** inside packets to determine the optimal route and forward data between different subnets and networks.

What it does:
1. Connects local networks (LAN) to wide area networks (WAN / Internet)
2. Uses routing tables to determine the best path for IP packets
3. Acts as the Default Gateway for local devices
4. Performs NAT (Network Address Translation) and DHCP

---
## Wireless Access Point (WAP)

> - Connects wireless devices to a wired Ethernet network using Wi-Fi signals.

- **OSI Layer**: **Layer 2 (Data Link Layer) / Layer 1 (Physical Layer)**
- **Why?**: Converts wireless 802.11 radio signals (Layer 1) into wired 802.3 Ethernet frames (Layer 2) and bridges clients to the local network using MAC addresses.

What it does:
1. Transmits and receives wireless radio signals
2. Bridges wireless devices to the wired LAN using MAC addresses
3. Manages multiple concurrent wireless client connections
4. Enforces Wi-Fi security standards (WPA2 / WPA3)

---
## Gateway

> - Connects networks that use completely different protocols or architectures.

- **OSI Layer**: **Layer 7 (Application Layer) / Multi-layer (Layers 4–7)**
- **Why?**: Operates across higher OSI layers to perform protocol translation, data format conversion, and architecture mapping between incompatible systems.

What it does:
1. Translates data between different protocol suites (e.g., HTTP to proprietary enterprise protocols)
2. Connects dissimilar network systems
3. Acts as an entry/exit translation point for enterprise networks

---
## Firewall

> - Security device that monitors and filters network traffic based on security rules.

- **OSI Layer**: **Layer 3/4 (Network/Transport)** up to **Layer 7 (Application Layer)**
- **Why?**: Inspects IP addresses (L3), TCP/UDP port numbers (L4), and application payloads (L7 Next-Gen Firewalls) to block unauthorized or malicious traffic.

What it does:
1. Inspects packet headers and content:
   - Source & Destination IP Addresses
   - Port Numbers & Protocols
   - Application signatures and payload data
2. Blocks malicious, unauthorized, or policy-violating traffic
3. Terminates VPN tunnels and protects internal network assets
