## Overview

Routers populate their Routing Information Base (RIB) using either **Static Routing** (manual entries) or **Dynamic Routing** (automated protocols).

---

## Static Routing vs. Dynamic Routing

| Property | Static Routing | Dynamic Routing |
| :--- | :--- | :--- |
| **Route Creation** | Manually configured by a network administrator | Automatically discovered via routing protocols |
| **Link Failure Adaptation** | Manual (Admin must reconfigure routes on failure) | **Automatic** (Protocol detects failure & re-routes) |
| **Resource Overhead** | Uses memory and processing for routes, but no dynamic routing-protocol exchanges | Additional CPU/RAM and control traffic; update behavior depends on the protocol |
| **Scalability** | Low (Impractical for large enterprise or Internet scale) | **High** (Essential for Data Centers & Global Internet) |
| **Security** | High (No risk of rogue route advertisements) | Requires protocol authentication (e.g., OSPF/BGP MD5) |
| **Administrative Distance (AD)** | `1` (Cisco default) | OSPF = `110`, eBGP = `20`, iBGP = `200` |

---

## Protocol Classification: IGP vs. EGP

An **Autonomous System (AS)** is a collection of networks under a single administrative entity (e.g., Google `AS15169`, ISP network).

```
   ┌─────────────────────────┐             ┌─────────────────────────┐
   │   Autonomous System 1   │   eBGP      │   Autonomous System 2   │
   │  ┌──────┐     ┌──────┐  │ ──────────> │  ┌──────┐     ┌──────┐  │
   │  │ Router│───>│ Router│ │ (EGP Scope) │  │ Router│───>│ Router│ │
   │  └──────┘ OSPF└──────┘  │             │  └──────┘IS-IS└──────┘  │
   │       (IGP Scope)       │             │       (IGP Scope)       │
   └─────────────────────────┘             └─────────────────────────┘
```

| Feature | IGP (Interior Gateway Protocol) | EGP (Exterior Gateway Protocol) |
| :--- | :--- | :--- |
| **Scope** | Runs **within** a single Autonomous System (AS) | Runs **between** different Autonomous Systems (AS) |
| **Primary Goal** | Fast convergence & shortest path within AS | Policy enforcement & global inter-AS routing |
| **Protocols** | **OSPF**, **IS-IS**, **EIGRP**, **RIP** | **BGP** (Border Gateway Protocol v4) |
| **Routing Metric** | Cost, Bandwidth, Delay (Shortest Path First) | **AS-Path** length, Policy Attributes (Local Pref, MED) |

---

## Routing Protocol Families (Algorithmic Types)

| Family | Underlying Algorithm | Topology Knowledge | Key Mechanics & Characteristics | Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Distance Vector** | **Bellman-Ford** | **"Routing by rumor"** (Only knows immediate neighbors & distance/direction) | • Periodically sends full routing table to neighbors.<br>• Slow convergence.<br>• Vulnerable to **Count-to-Infinity** (fixed via *Split Horizon* & *Poison Reverse*). | **RIPv1 / RIPv2** |
| **Link State** | **Dijkstra's SPF** | **Topology within the flooding scope** (e.g., an OSPF area; databases agree after convergence) | • Floods link-state updates on changes and refreshes them periodically.<br>• **Fast convergence**, no distance-vector count-to-infinity.<br>• Higher CPU/RAM usage to calculate SPF tree. | **OSPF**, **IS-IS** |
| **Hybrid** *(Advanced Distance Vector)* | **DUAL** *(Diffusing Update Algorithm)* | Partial topology map (Maintains Neighbor & Topology tables) | • Combines fast convergence of Link-State with low overhead of Distance Vector.<br>• Uses Composite Metric (Bandwidth + Delay).<br>• Guaranteed loop-free backup routes (**Feasible Successors**). | **EIGRP** (Cisco) |

## Border Gateway Protocol (BGP)

**BGP** is the de facto Path Vector routing protocol that powers the global Internet.

### 1. eBGP vs. iBGP

| Type     | Full Name    | Scope                                                 | Admin Distance (AD) | Loop Prevention                                                  |
| :------- | :----------- | :---------------------------------------------------- | :------------------ | :--------------------------------------------------------------- |
| **eBGP** | External BGP | Between routers in **different** Autonomous Systems   | `20`                | Rejects routes containing its own AS in the **AS-Path**          |
| **iBGP** | Internal BGP | Between routers **within the same** Autonomous System | `200`               | Split Horizon rule (Do not re-advertise iBGP route to iBGP peer) |

### 2. BGP Best Path Selection Hierarchy (Interview Order)
When a router receives multiple BGP routes for the same prefix, it chooses the best path based on this priority order:

1. **Highest Local Preference:** Local administrator's explicit path choice within the AS.
2. **Shortest AS-Path:** Route traversing the fewest Autonomous Systems.
3. **Lowest Origin Type:** IGP < EGP < Incomplete.
4. **Lowest MED (Multi-Exit Discriminator):** Preference sent by neighbor AS for entry point.
5. **eBGP over iBGP:** Prefers external eBGP paths over internal iBGP paths.
