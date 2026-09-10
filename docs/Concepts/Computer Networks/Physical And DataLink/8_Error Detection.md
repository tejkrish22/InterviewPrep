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
5. Parity is not perfect, does only partial check

## Checksum

1. Sender computes a small value from the data, then sends **data + checksum**.
2. Receiver computes the checksum value again and verifies
3. The flow is
	1. Breaks data into small units
	2. Add them using a rule
	3. Generate Checksum
	4. Send Checksum with data
	5. Receiver compares again

## Cyclic Redundancy Check

1. Sender
	1. takes the data
	2. applies an agreed CRC Algorithm
	3. gets a CRC value
	4. sends data + CRC value
2. Receiver
	1. takes received data
	2. computes CRC value with agreed Algorithm
	3. compares with received CRC
	4. figures our error happened or not
3. Ethernet uses CRC through the FCS field.



