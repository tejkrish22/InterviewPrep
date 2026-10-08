## Overview

- **Routing (Control Plane):** The process of discovering network paths and building routing tables.
- **Forwarding (Data Plane):** Moving individual packets from an input interface to the correct output interface, implemented in software or specialized hardware.

---

## Routing vs. Forwarding

| Aspect | Routing (Control Plane) | Forwarding (Data Plane) |
| :--- | :--- | :--- |
| **Primary Goal** | Discover topology & build routing tables | Move single packet to next-hop interface |
| **Execution** | Background / Periodic / On topology change | Per-packet; speed depends on software or hardware implementation |
| **Table Used** | Routing Information Base (**RIB**) | Forwarding Information Base (**FIB**) |
| **Analogy** | Planning the route on a map | Driving through an intersection |

---

## RIB (Routing Table) vs. FIB (Forwarding Table)

| Property | Routing Information Base (**RIB**) | Forwarding Information Base (**FIB**) |
| :--- | :--- | :--- |
| **Plane & Memory** | Control Plane (Software / System RAM) | Data Plane (Software memory or specialized hardware) |
| **Compiled From** | Routing Protocols (OSPF, BGP, RIP) & Static Routes | Extracted from the **best routes** in the RIB |
| **Typical Content** | • Destination prefixes and next hops<br>• Protocol metrics and administrative distance<br>• Candidate/best routes, depending on implementation | • Destination prefixes<br>• Egress interface and next-hop information<br>• May reference separate neighbor/adjacency tables for MAC addresses |
| **Lookup Role** | Route selection and management | Optimized for per-packet lookup; performance depends on implementation |

---

## Direct Route vs. Default Route

| Route Type | Definition & Prefix | Purpose & Priority |
| :--- | :--- | :--- |
| **Direct Route** *(Directly Connected)* | Networks attached to a router interface.<br>Example: `192.168.1.0/24` on `eth0` | Preferred over other route sources **for the same prefix** (Cisco AD = 0). If selected on IPv4 Ethernet, resolves the destination host's MAC directly. |
| **Default Route** *(Gateway of Last Resort)* | Fallback route used when destination matches **no other entry**.<br>Prefix: `0.0.0.0/0` | **Lowest Specificity (`/0`)**. Forwards internet-bound or unknown traffic out to the upstream ISP router. |

**AD vs. LPM:** Administrative distance helps select route sources for the **same prefix**. Forwarding uses **longest-prefix match** among installed routes: a `/32` route can beat a connected `/24` route.

---

## Longest Prefix Match (LPM)

### What is it?
When a router receives a packet, its destination IP might match **multiple subnet entries** in the routing table. **Longest Prefix Match (LPM)** dictates that the router selects the route with the **most specific (longest mask / largest prefix length)** match.

### Intuitive Analogy
Imagine mailing a letter to: `123 Main St, Sector 5, Bangalore, India`.
- Worker A knows how to deliver to **India** (`/8` - Very broad).
- Worker B knows how to deliver to **Bangalore** (`/16` - Specific city).
- Worker C knows how to deliver to **Sector 5, Bangalore** (`/24` - Exact neighborhood).

**Worker C is selected** because Worker C has the most specific (longest) address match.

---

### Step-by-Step LPM Example

Suppose a packet arrives with Destination IP: `192.168.1.77`.
The router checks its routing table:

| Route in Routing Table | Prefix Length | Matching Subnet Scope | Decision |
| :--- | :--- | :--- | :--- |
| `0.0.0.0/0` | `/0` | All IPv4 Internet (4 Billion IPs) | Matches (Broadest / Default Fallback) |
| `192.168.0.0/16` | `/16` | `192.168.0.0` – `192.168.255.255` (65,536 IPs) | Matches (General Network) |
| **`192.168.1.0/24`** | **`/24`** | **`192.168.1.0` – `192.168.1.255` (256 IPs)** | **WINS (Longest / Most Specific!)** |

- **Rule:** `/24` has 24 matching network bits, which is longer than `/16` or `/0`.
- **Core Principle:** **Longer Prefix Length = Smaller Subnet = More Specific Route.**

---

### Hardware Acceleration (Interview Concept)
- **TCAM (Ternary Content Addressable Memory):** Some routers use parallel hardware matching for effectively constant-time lookups within the hardware's capacity. Other routers use different hardware or software lookup structures; forwarding is not universally TCAM-based or $O(1)$.
