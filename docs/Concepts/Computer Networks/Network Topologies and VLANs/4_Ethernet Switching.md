## Overview

- **Layer 2 (Data Link)** device operating via MAC addresses.
- **Core Functions:**
  1. **Learn:** Records `Source MAC` $\to$ `Ingress Port` mapping from incoming frames.
  2. **Forward:** Sends frames directly to target port if destination MAC is known (**Known Unicast**).
  3. **Flood:** Forwards frames out all ports in the VLAN (except ingress port) if destination MAC is unknown or broadcast.

---

## MAC Address Table

Stores dynamic mappings in switch memory:
- **Fields:** `MAC Address` | `VLAN ID` | `Port Number` | `Aging Timer`
- **Aging Timer:** Removes stale entries (default ~300s) when devices disconnect or move.

---

## Frame Forwarding Rules

| Traffic Type | Switch Condition | Action |
| :--- | :--- | :--- |
| **Known Unicast** | Destination MAC is in table | Forward **only** to destination port |
| **Unknown Unicast** | Destination MAC is **not** in table | **Flood** to all ports in VLAN (except source) |
| **Broadcast** | Destination MAC = `FF:FF:FF:FF:FF:FF` | **Flood** to all ports in VLAN (except source) |

---

## Common Failures & Mitigations

| Failure Mode | Cause | Impact | Fix / Mitigation |
| :--- | :--- | :--- | :--- |
| **Unknown Flooding** | MAC aged out or cold boot | Temporary frame flooding across VLAN | Self-heals on host reply |
| **Broadcast Storm** | High volume of ARP/DHCP broadcasts | Consumes bandwidth & overloads host CPUs | VLAN segmentation, Storm Control |
| **Layer 2 Loop** | Redundant switch links without STP | Infinite frame replication (Ethernet lacks **TTL**) | **STP (Spanning Tree Protocol)** |
| **MAC Flapping** | Same MAC appearing on multiple ports | MAC table instability & packet drop | Resolve physical loop or MAC spoofing |
| **Wrong VLAN** | Port misconfigured with wrong VLAN ID | Host isolated from its subnet & gateway | Fix Access Port VLAN ID (PVID) |