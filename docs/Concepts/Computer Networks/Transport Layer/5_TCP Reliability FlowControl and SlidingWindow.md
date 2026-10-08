## Reliability is achieved via

1. Sequence Number and Acknowledgements
2. Re-transmission
	1. Time-out based Loss Detection
		1. Sender transmits a segment.
		2. Timer starts.
		3. Sender tracks acknowledgments while continuing to send if the window permits.
		4. If acknowledgment arrives, transmission succeeds, If timeout occurs, re-transmission is triggered.
	2. Duplicate ACK Based Loss Detection
		1. Assume five **50-byte segments**, starting at sequence numbers `100`, `150`, `200`, `250`, and `300`. The segment starting at `150` is lost.
		2. After receiving bytes `100–149`, the receiver sends `ACK 150`: byte `150` is expected next.
		3. Segments `200`, `250`, and `300` each trigger another `ACK 150`, producing **three duplicate ACKs**, excluding the original ACK.
		4. Traditional TCP **fast retransmit** re-transmits the missing segment after three duplicate ACKs, without waiting for the timeout.
3. Checksum
4. Sender Buffer
	1. TCP's sender buffer holds data waiting to be sent and data sent but not yet acknowledged.
	2. Whenever a segment is sent:
		1. A copy remains in the sender buffer.
		2. The sender can send more data while awaiting ACKs, if the window permits.
		3. Once acknowledged, the segment can be removed from the buffer.
5. Receiver Buffer
	1. On the receiving side, TCP maintains a receiver buffer.
	2. The receiver buffer stores incoming segments before they are delivered to the application. Its primary responsibility is to ensure that data is maintained in the correct order.
	3. Even if segments arrive out of sequence, the receiver buffer temporarily stores them until any missing segments arrive.

## TCP Flow Control

1. Assume we have a fast send and a slow receiver.
2. Flow control is implemented through the receiver window mechanism.
3. The receiver continuously informs the sender about how much buffer space is currently available.
4. This information is communicated using the Window Size field present in the TCP header.

## TCP Sliding Window

1. **Purpose:**
	1. Waiting for an ACK after every segment wastes link capacity.
	2. Sliding window lets multiple segments be in flight at once.
2. **Window:**
	1. TCP windows count **bytes**, not segments. The receiver advertises available buffer space; congestion control may impose a smaller limit.
3. **Example:**
	1. Assume the receiver keeps advertising **4,000 bytes**, congestion control permits at least that much, and each segment carries **1,000 bytes**.
	2. Send `1000–1999`, `2000–2999`, `3000–3999`, and `4000–4999` sequentially without waiting for an ACK between them—not all at the same instant.
4. **Sliding:**
	1. `ACK 2000` confirms all bytes before 2000. With the same advertised window, new bytes `5000–5999` can be sent.
	2. Similarly, `ACK 3000` allows `6000–6999` under the same assumptions.
5. **Important:**
	1. An ACK confirms receipt, not that the application has consumed the data. If the advertised window shrinks, an ACK may not open space for new data.
	2. Sliding does not resend the whole window. Unacknowledged data is retained for possible re-transmission when loss is suspected.
