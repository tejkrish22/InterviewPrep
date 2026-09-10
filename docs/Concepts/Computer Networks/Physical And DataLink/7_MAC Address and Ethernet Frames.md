## MAC Address

> **Media Access Control Address**: A local hardware 48 bit address used at data link layer.

1. It is responsible for delivering a frame on the current local network.
2. IP address tells where the final machine is, MAC Address tells which device should receive the frame of this current link.

## Ethernet Frame

1. The data received as **packet** at Datalink layer with source and destination IP; at datalink layer the following info are added to make it an Ethernet Frame
	1. Source and Destination MAC Address
	2. FCS (Frame Check Sequence)
2. Frame carries
	1. Data
	2. Addressing Information
	3. Control Information
	4. Error Detection Information
3. Inside a LAN, devices exchange Ethernet Frames.

## Ethernet Frame Fields

| Preamble | SFD | Destination MAC | Source MAC | Ether Type / Length | Data    | FCS |
| -------- | --- | --------------- | ---------- | ------------------- | ------- | --- |
| 8        | 1   | 6               | 6          | 2                   | 46-1500 | 4   |
1. Preamble: Helps receiver synchronise the clock and signals
2. SFD: Marks the start of the frame
3. Destination MAC: Who should receive it
4. Source MAC: Who sent it
5. Ether Type / Length: What payload contains
6. Data / Payload: Actual carried data
7. FCS: Error detection using CRC