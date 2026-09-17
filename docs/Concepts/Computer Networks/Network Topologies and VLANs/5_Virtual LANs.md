> **VLAN (Virtual LAN)**: A logical way to split one physical switched network into multiple isolated Layer 2 networks.

---

## Key Concepts: Layer 2 vs Layer 3 in VLANs

| Concept | Layer 2 (Data Link) | Layer 3 (Network) |
| :--- | :--- | :--- |
| **Addressing** | MAC Address | IP Address |
| **Data Unit** | Ethernet Frame | IP Packet |
| **Device** | Standard Layer 2 Switch | Router / Layer 3 Switch |
| **Scope** | **Intra-VLAN** (Same VLAN only) | **Inter-VLAN** (Between different VLANs) |
| **Function** | Fast local switching by MAC address | Routing packets between IP subnets |

---

## Switch Port Types

1. **Access Port**
   - Belongs to a **single VLAN**.
   - Connects to end devices (PCs, laptops, printers).
   - Frames sent to end devices are **untagged**.

2. **Trunk Port**
   - Carries traffic for **multiple VLANs** over a single physical link.
   - Used between: Switch ↔ Switch, Switch ↔ Router, Switch ↔ Server Host.
   - Enforces **VLAN Tagging** to identify traffic per VLAN.

![[trunk_port_vlan.png|center]]

---

## VLAN Tagging (IEEE 802.1Q)

- Standard protocol that inserts a **4-byte VLAN ID tag** into the Ethernet frame header across Trunk links.

| Destination MAC | Source MAC | **802.1Q VLAN Tag** | EtherType | Data | FCS |
| :--- | :--- | :--- | :--- | :--- | :--- |

- **Flow**: Switch A tags frame with VLAN ID $\rightarrow$ Sent across Trunk $\rightarrow$ Switch B reads tag, strips it, and delivers frame to target Access Port.

---

## Common Use Cases

1. **Departmental Isolation**: HR (`VLAN 10`), Eng (`VLAN 20`), Finance (`VLAN 30`) share physical infrastructure but remain logically separated.
2. **Guest Wi-Fi**: Places guest users into an isolated VLAN to block access to internal corporate networks.

---

## Why use VLANs if we already use separate IP Subnets?

If departments use separate IP subnets (`192.168.10.x` vs `192.168.20.x`), why are VLANs mandatory?

1. **Security (Prevents IP Spoofing)**: Without VLANs, a user can manually change their laptop IP in OS settings to join another department's subnet. VLANs lock the physical switch port to a designated VLAN ID, dropping spoofed traffic.
2. **Broadcast Containment**: Layer 2 broadcasts (like ARP requests) stay strictly inside their VLAN instead of flooding all devices on the physical switch.
3. **Hardware Cost Savings**: Allows 1 physical switch to act as multiple isolated virtual switches instead of buying separate hardware per team.

---

## Cross-VLAN Communication (Inter-VLAN Routing)

- **Can devices in different VLANs communicate directly at Layer 2?**
  **No.** Each VLAN is a separate broadcast domain. Devices in different VLANs cannot exchange frames through normal Layer 2 switching.
- **How do they communicate?**
  Requires a **Layer 3 device** (Router or Layer 3 Switch) via **Inter-VLAN Routing**:
  1. PC A (`VLAN 10`) sends packet to its Default Gateway (Layer 3 device).
  2. Layer 3 device inspects the destination IP (`VLAN 20` subnet).
  3. Layer 3 device routes and forwards the packet into `VLAN 20`.