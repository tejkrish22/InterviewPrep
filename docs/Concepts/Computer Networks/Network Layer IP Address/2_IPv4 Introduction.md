## Overview

- **IP Address:** A 32-bit logical address assigned to a network interface for end-to-end routing.
- **Structure:** Divided into **4 octets** ($4 \times 8$ bits), represented in dotted decimal (e.g., `192.168.1.10`). Range per octet: `0–255`.
- **Composition:** Every IP consists of a **Network Part** (identifies subnet) and a **Host Part** (identifies specific device).

---

## IP Address Components (`/24` Example)

| Address Component | Example (`192.168.1.10/24`) | Purpose |
| :--- | :--- | :--- |
| **Prefix Length** | `/24` | Specifies that the first 24 bits belong to the network |
| **Subnet Mask** | `255.255.255.0` | Bitmask defining Network vs Host bits |
| **Network ID** | `192.168.1.0` | Identifies the network (host bits = all 0s) |
| **Broadcast IP** | `192.168.1.255` | Targets all hosts in this subnet (host bits = all 1s) |
| **Usable Hosts** | `192.168.1.1` – `192.168.1.254` | Addresses assignable to real devices ($2^8 - 2 = 254$) |

---

## Subnetting Example: Splitting `/24` into `/26`

Subnetting borrows host bits to create smaller IP subnets. Separate VLANs or routed links provide Layer 2 broadcast isolation; subnetting alone does not.
- **Subnet Mask (`/26`):** `255.255.255.192` (`11111111.11111111.11111111.11000000`)
- **Formula:** Borrow 2 bits $\to$ $2^2 = 4$ subnets.
- **Host Bits Remaining:** $32 - 26 = 6$ bits $\to$ $2^6 = 64$ total IPs per subnet ($64 - 2 = 62$ usable hosts).

| Subnet Name | Subnet ID | Subnet Mask | Usable Host Range | Broadcast IP |
| :--- | :--- | :--- | :--- | :--- |
| **Subnet A** | `192.168.1.0/26` | `255.255.255.192` | `192.168.1.1` – `192.168.1.62` | `192.168.1.63` |
| **Subnet B** | `192.168.1.64/26` | `255.255.255.192` | `192.168.1.65` – `192.168.1.126` | `192.168.1.127` |
| **Subnet C** | `192.168.1.128/26` | `255.255.255.192` | `192.168.1.129` – `192.168.1.190` | `192.168.1.191` |
| **Subnet D** | `192.168.1.192/26` | `255.255.255.192` | `192.168.1.193` – `192.168.1.254` | `192.168.1.255` |

---

## Interview Deep-Dive: Broadcasting Across Subnets

### Does `192.168.1.255` broadcast to all 4 subnets?
- **No.** With these `/26` prefixes, `192.168.1.255` is the broadcast IP **only for Subnet D**.
- Different IP subnets can share one VLAN and receive the same Layer 2 broadcast frames. Separate VLANs or routed links create separate broadcast domains.

### Why don't broadcasts cross subnets?
- Routers do not forward Layer 2 broadcasts between links. IPv4 directed-broadcast forwarding is normally disabled to prevent amplification attacks.

### How to send data to all 4 subnets?
1. **Directed Broadcasts:** Packets to `.63`, `.127`, `.191`, and `.255` can reach their respective subnets only if the routers permit directed-broadcast forwarding. Do not assume this is enabled.
2. **IP Multicast:** Use a routable multicast group with subscribed receivers and configured multicast routing between subnets; choosing a multicast address alone is not enough.
