## Intro

1. During the transmission the error can occur due to
	1. Noise
	2. Signal Degradation
	3. Inference
	4. Transmission Problems
2. This can lead to receiver receiving corrupt data.
3. Common Error detection methods
	1. Parity
	2. Checksum
	3. CRC

## Parity

1. Add **parity bit**
2. Make total number of 1s even or odd - > Even Parity or Odd Parity
3. Sender and Receiver agree on the parity rule
4. Cannot detect two-bit errors or even-bit errors
	1. 1010 -> 1100 = number of 1s are same
5. 