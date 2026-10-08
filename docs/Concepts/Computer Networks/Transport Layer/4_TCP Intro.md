> TCP (Transmission Control Protocol) is a connection-oriented and reliable Transport Layer protocol that provides a reliable byte-stream service between two applications.

## Key Characteristics

1. Connection Oriented
2. Reliable Delivery
3. In-order delivery
4. Flow Control
5. Congestion Control
6. Full Duplex Communication

## TCP Segment 

1. TCP Segment mainly consists of header and payload.
2. Unlike UDP, TCP header size varies from 20 - 60 bytes.
3. A large header means more overhead, but it also ensures various factors of reliability.

## TCP Header Fields

1. Source Port - 16 bits
	1. Identifies the sending process
2. Destination Port - 16 bits
	1. Identifies the receiving process
3. Sequence Number - 32 bits
	1. Identifies the position of the data within the byte stream
4. Acknowledgement Number - 32 bits
	1. Specifies the next byte expected from the sender.
5. Data Offset - 4 bits
	1. Indicates the size of the TCP header.
6. Reserved - 3 bits
7. Flags
	1. These fields controls the various aspects of communication, including connection establishment, data transfer, and connection termination.
8. Window Size - 16 bits
	1. Specifies how much data the receiver is currently willing to accept.
	2. This field is fundamental to TCP flow control and helps prevent receiver overload.
9. Checksum - 16 bits
	1. Used for error detection of both header and payload
10. Urgent Pointer - 16 bits
	1. Used when the URG flag is set and points to urgent data within the segment.
11. Options - 0 - 40 bytes
	1. Optional fields that extend its functionality.
12. Padding
	1. Padding is added when necessary to ensure that the header length remains a multiple of 4 bytes.

## TCP 3-Way Handshake

1. The process of establishment of connection is called TCP 3-Way Handshake
2. Important Terms
	1. SYN (Synchronize) - Used to initiate a connection and synchronize sequence numbers.
	2. ACK (Acknowledgment) - Used to acknowledge received information.
	3. Sequence Number (Seq) - Represents the position of data within the TCP byte stream.
	4. Acknowledgment Number (Ack) - Indicates the next byte expected from the sender.
3. Steps
	1. Client -> Server (SYN) | seq = x
	2. Client <- Server (SYN+ACK) | seq = y, ack = x+1
	3. Client -> Server (ACK) | seq = x +1, ack y+1


