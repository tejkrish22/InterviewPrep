## Intro

1. OSI = Open Systems Interconnection
2. OSI is mainly a conceptual / reference model and it does not exist in the real world.
3. The 7 layer conceptual model is used to
	1. Understand Networking
	2. Organise the responsibilities
	3. Debug
	4. Explain - which device or protocol is doing what?
4. Layers are
	1. Application
	2. Presentation
	3. Session
	4. Transport
	5. Network
	6. Data Link
	7. Physical

## Protocol

> **Protocol**: A set of communication rules between systems

1. Protocol defines
	1. How communication starts?
	2. What format data should be in?
	3. Where data should go?
	4. How receiver understands it?
	5. What happens if something goes wrong?
2. Ex: HTTP, TCP, IP, DNS

## Model Role Distribution

1. User facing Communication
	1. **Application** - send / receive http, file, mail etc
	2. **Presentation** - data formatting, compressing, encryption
	3. **Session** - connection, authentication
2. End-to-End delivery
	1. **Transport** - process-to-process delivery, segmentation, flow & error control (TCP / UDP)
	2. **Network** - host-to-host routing, IP addressing, path determination across networks
3. Local delivery and actual transmission
	1. **Data Link** - node-to-node local hop delivery, MAC addressing, framing & error detection
	2. **Physical** - raw bit stream transmission over hardware medium (signals, cables, radio)

## How data travel layer by layer?
![[osi_1.png|center]]
![[osi_2.png|center]]
## Layer 7 - Application

1. Closest to the software the *user interfaces with*.
2. Not the whole app UI, but the network facing part.
3. Application Layer protocols
	1. **HTTP** - web pages and web APIs
	2. **HTTPS** - secure web communication
	3. **DNS** - domain name to IP
	4. **SMTP** - sending mails
	5. **FTP** - file transfer
	6. **SSH** - secure remote login
	7. **DHCP** - automatic IP assignment
## Layer 6 - Presentation

1. Translating / Formatting
2. Encryption / Decryption
3. Compression / Decompression
4. Data Processing Pipeline
	1. Data
	2. Formatting
	3. Compressing
		1. Lossy - Saves lot of space by removing original data permanently
		2. Lossless - Saves space without losing original data
	4. Encryption

## Layer 5 - Session 

1. Manages the conversation between two systems.
2. Starting interaction
3. Coordinating back & forth messages
4. Helping resume / synchronise the session if interrupted.

## Layer 4 - Transport 

1. Responsible for end-to-end communication between applications i.e. `process to process`.
2. Transport uses ***port numbers***.
3. What it does
	1. **Segmentation** - Breaks data into segments, which would have
		1. Source Port
		2. Destination Port
		3. Sequence Number
	2. **Reliability** 
		1. Acknowledgement
		2. Repeat Request
		3. Retransmission
	3. **Flow control** - if speed of sending and receiving is uneven, then transport layer controls the flow to make it even.
	4. **Connection / Connectionless Delivery**
		1. Connection Oriented Transmission - TCP
		2. Connection less Transmission - UDP
4. TCP - Transmission Control Protocol
	1. Reliable
	2. Feedback / Acknowledgements
	3. Retransmission
	4. Full data delivery matters
	5. Email, File Transfer
5. UDP - User Datagram Protocol
	1. Lightweight
	2. No Feedback
	3. No guaranteed delivery
	4. Speed matters
	5. Streaming, Video call

## Layer 3 - Network

1. End-to-End Delivery using `IP Address`
2. Routing is performed
3. Routers - Forward packets between networks
4. Source IP and Destination IP is added.
5. MAC vs IP
	1. MAC -> local delivery i.e. hop-to-hop delivery
	2. IP -> wider network delivery i.e. end-to-end delivery
6. Network Routing
	1. Choosing the path in which the packets need to travel

## Layer 2 - Data Link

1. Hop-to-hop delivery on the same local link, using `MAC Address`
2. Network layer decides the **next hop**; data link delivers data to that next hop in the current link.
3. `Frame` contains 
	1. source MAC
	2. destination MAC
	3. Trailer (error checking data, FCS)
4. 2 Sublayers
	1. MAC Sublayer
		1. Accessing the medium
		2. MAC Addressing
		3. Placing the frames on the link
	2. LLC Sublayer
		1. Flow control
		2. Error control
		3. Automatic Repeat Request
5. Kinds of Addressing
	1. Logical Addressing - IP - Network Layer
	2. Physical Addressing - MAC - Data Link Layer
6. Medium Access
	1. **Accessing** the medium
	2. **Placing** the data on the medium
	3. **Receiving** the data on the medium
	4. CSMA / CS - Carrier Sense Multiple Access / Collision Detection
	5. Before sending, devices needs rules for using the link.

## Layer 1 - Physical

1. Responsible for transmitting *raw bits* over the medium
2. Electric signal, light pulse, radio wave
3. Copper, Fiber

## Summary

![[osi_summary.png|center]]
