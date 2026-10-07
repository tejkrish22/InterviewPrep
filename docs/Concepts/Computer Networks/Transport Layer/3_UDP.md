## Intro

1. User Datagram Protocol
2. Transport layer
3. Information is passed by messages called Datagrams between applications

## Features of UDP

1. Connectionless - No establishment of connection between sender and receiver
2. Fast
3. Lightweight
4. Low Latency
5. Best-effort Delivery - No guarantee of delivery

## UDP does not provide

1. No delivery guarantee
2. No ordering
3. No retransmission
4. No flow control
5. No congestion control

## UDP Datagram Format

| Source Port | Destination Port | Length  | Checksum | Payload  |
| ----------- | ---------------- | ------- | -------- | -------- |
| 16 Bits     | 16 Bits          | 16 Bits | 16 Bits  | variable |
1. Header Size is 8 bytes
2. Source Port
	1. Identifies  application that generated the data
	2. Can be 0 if not needed
3. Destination Port
	1. Identifies receiving application
4. Total Length
	1. UDP Header + Payload
5. Checksum
	1. Covers both header and payload
	2. Option in IPv4, but mandatory in IPv6

## Usage

1. Real-time applications like streaming; often prefer UDP because retransmitting old data may no longer be useful.