## Overview

- **Layer 3 (Network Layer)** enables end-to-end packet delivery across separate, interconnected networks.
- **Why Layer 2 is not enough:** Layer 2 (MAC addressing) operates only within a single local broadcast domain. MAC addresses are flat (unstructured), making global routing impossible without hierarchical IP addresses.

---

## Core Functions

1. **Logical Addressing (IP):** Identifies target network and target host globally (`Network ID` + `Host ID`).
2. **Routing (Control Plane):** Calculates best end-to-end paths across multiple routers and networks.
3. **Forwarding (Data Plane):** Moves individual packets hop-by-hop from input to output interface based on routing tables.

---

## Routing vs Forwarding

| Property | Routing (Control Plane) | Forwarding (Data Plane) |
| :--- | :--- | :--- |
| **Scope** | End-to-end path across network topology | Local hop (single router) |
| **Function** | Discovers paths & populates routing table | Moves packet from input to output interface |
| **Timing** | Background / Periodic / On topology change | Real-time / Per packet (hardware speed) |
| **Analogy** | Planning the driving route on a map | Taking a specific turn at an intersection |

---

## End-to-End Packet Delivery

1. **DNS Lookup:** Resolves domain name (`google.com`) $\to$ destination IP address.
2. **Routing Table Match:** Each router matches destination IP against its routing table for longest-prefix match.
3. **Hop-by-Hop Delivery:** Packet is forwarded to the next-hop router until it reaches the destination network.