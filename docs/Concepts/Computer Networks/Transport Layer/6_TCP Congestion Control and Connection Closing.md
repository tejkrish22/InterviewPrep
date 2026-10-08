## What is Congestion?

1. Congestion happens in the network.
2. The router must receive these packets, temporarily store them in queues, process them, and forward them according to its routing table.
3. However, every router has a finite capacity. Its buffers are limited, its processing power is limited, and its outgoing links can transmit only a certain amount of traffic at a time.
4. If incoming traffic exceeds the router's capacity, packets begin accumulating in its queues. 
5. Eventually the router reaches a point where it can no longer accept additional packets efficiently.
6. TCP should be able to handle the congestion.

## Congestion Handling in TCP

The growth and recovery rules below describe **classic TCP Reno**; other algorithms can differ. **MSS** is the maximum TCP data size per segment; **FlightSize** is sent but unacknowledged data, in bytes.

1. Congestion Window (`cwnd`) is the sender's limit on outstanding data, measured in bytes—not a direct measurement of network capacity.
2. TCP starts with a limited initial window; many modern implementations use around 10 MSS. One MSS is a simplified historical example.
3. As communication continues, TCP observes acknowledgments, packet loss, and timeouts, then adjusts the congestion window dynamically.
4. Receiver Window vs Congestion window
	1. Receiver Window → Receiver's capacity
	2. Congestion Window → Sender's congestion-control limit
	3. Send Window = min (Receiver Window, Congestion Window)
	4. Additional data allowed is approximately `max(0, min(rwnd, cwnd) - FlightSize)`.
5. Slow Start
	1. Instead of immediately transmitting large amounts of data, TCP starts cautiously using a mechanism called **Slow Start**.
	2. During Slow Start, the congestion window begins with a very small value and grows rapidly as acknowledgments arrive successfully.
	3. Ideally, `cwnd` roughly doubles per round-trip time (RTT): for a 1-MSS starting example, 1, 2, 4, 8 MSS—not a doubling per ACK.
6. Slow Start Threshold (ssthresh)
	1. Exponential growth cannot continue forever.
	2. TCP maintains `ssthresh` from connection startup, before any loss occurs.
	3. Loss can cause TCP to update this threshold; it is not introduced only after loss.
	4. This threshold separates two phases: Slow Start Phase and Congestion Avoidance Phase
7. Congestion Avoidance
	1. After reaching the slow start threshold, TCP enters the Congestion Avoidance phase.
	2. Instead of doubling the congestion window, TCP now increases it gradually.
	3. This phase is implemented using a strategy known as: AIMD (Additive Increase Multiplicative Decrease).
	4. Additive Increase
		1. During Additive Increase, Reno grows `cwnd` by approximately **1 MSS per RTT** when enough data is being sent and acknowledged.
		2. This gradual increase allows TCP to probe the network for additional capacity while minimizing the risk of congestion.
	5. Multiplicative Decrease
		1. Eventually, packet loss may occur again.
		2. When TCP interprets packet loss as a congestion signal, it reacts aggressively by reducing the congestion window.
## Fast Recovery

1. Two classic indications of possible packet loss are:
	1. Timeout
	2. Duplicate ACKs
2. Loss Detected by Timeout - Conservative Response
	1. A timeout occurs when outstanding data is not acknowledged before the re-transmission timer expires.
	2. It can result from data or ACK loss, excessive delay, or too few later segments to generate three duplicate ACKs.
	3. A timeout does not prove severe congestion, but TCP responds conservatively.
	4. On the first timeout for a segment, classic Reno does the following:
		1. `ssthresh = max(FlightSize / 2, 2 * MSS)`—not half the old threshold.
		2. `cwnd = 1 MSS`; re-transmit the oldest unacknowledged segment.
		3. Re-enter slow start
3. Loss Detected by Duplicate ACKs - Fast Re-transmit and Recovery
	1. When TCP receives three duplicate acknowledgments, it assumes that a specific segment has been lost.
	2. Instead of waiting for the re-transmission timer to expire, TCP immediately re-transmits the missing segment from the sender buffer.
	3. This mechanism is called **Fast Re-transmit**.
	4. Fast Recovery
		1. On the third duplicate ACK, set `ssthresh = max(FlightSize / 2, 2 * MSS)`.
		2. Enter recovery with `cwnd = ssthresh + 3 * MSS`.
		3. Each additional duplicate ACK increases `cwnd` by 1 MSS; send new data if the window permits.
		4. In classic Reno, an ACK acknowledging new data ends recovery: set `cwnd = ssthresh` and resume Congestion Avoidance. NewReno handles partial ACKs differently.

## Flow Control vs Congestion Control

|Flow Control|Congestion Control|
|---|---|
|Protects the receiver|Protects the network|
|Prevents receiver buffer overflow|Reduces the risk of network congestion|
|Based on Receiver Window (rwnd)|Based on Congestion Window (cwnd)|
|Focuses on receiver capacity|Focuses on network capacity|
## TCP Connection Termination

1. Normal TCP connection termination commonly uses four packets, but not always. Either side can initiate it.
	1. TCP is a full-duplex protocol
	2. Since communication in each direction is independent, each direction must be closed independently as well.
2. Steps
	1. Client sends FIN
	2. Server sends ACK
	3. Server Sends FIN
	4. Client Sends ACK
3. Why commonly 4 steps?
	1. A FIN closes only the sender's direction; that side can still receive data.
	2. The peer may acknowledge the FIN and continue sending before sending its own FIN.
	3. One side may finish sending data before the other side does. Therefore, each direction must be shut down independently.
	4. If the peer is also ready to close, it can combine ACK and FIN, producing a three-packet exchange.