## Overview

At Layer 3 (Network Layer), data units are called **Datagrams**. 
- **Header Size:** Variable from **20 bytes** (minimum, no options) up to **60 bytes** (maximum, with options).

![[ipv4_datagram.png]]

---

## Key Header Fields

- **Version (4 bits):** IP protocol version (Always `4` for IPv4).
- **IHL - Internet Header Length (4 bits):** Header length measured in **4-byte words**.
  - Minimum: `5` ($5 \times 4 = 20\text{ bytes}$).
  - Maximum: `15` ($15 \times 4 = 60\text{ bytes}$).
- **Differentiated Services (8 bits):** Manages Quality of Service (QoS).
  - **DSCP (6 bits):** Classifies traffic priority (64 levels).
  - **ECN (2 bits):** Signals network congestion without dropping packets.
- **Total Length (16 bits):** Total datagram size ($\text{Header} + \text{Payload}$) in bytes (Max $65,535\text{ bytes}$). Must be $\le \text{MTU}$ of the egress link.
- **Time to Live / TTL (8 bits):** Hop count limit to prevent infinite loops. Decremented by 1 at each router; packet dropped when $\text{TTL} = 0$.
- **Protocol (8 bits):** Identifies upper-layer payload (`6` = TCP, `17` = UDP, `1` = ICMP).
- **Header Checksum (16 bits):** Error detection for **IPv4 header only** (recalculated at every router hop as TTL changes).
- **Source & Destination IP (32 bits each):** Sender and receiver IPv4 addresses.

---

## IP Fragmentation Fields

When a datagram size exceeds the link's **MTU (Maximum Transmission Unit)**, intermediate routers split it into smaller fragments. Reassembly occurs **only at the final destination**.

![[ipv4_frag_1.png]]
![[ipv4_frag_2.png]]

| Field | Size | Function |
| :--- | :--- | :--- |
| **Identification** | 16 bits | Unique ID shared by all fragments of the same original datagram |
| **Flags** | 3 bits | • **DF (Don't Fragment):** `1` = Do not fragment (drop packet if over MTU)<br>• **MF (More Fragments):** `1` = More fragments follow; `0` = Last fragment |
| **Fragment Offset** | 13 bits | Position of this fragment payload inside original datagram (measured in **8-byte blocks**) |