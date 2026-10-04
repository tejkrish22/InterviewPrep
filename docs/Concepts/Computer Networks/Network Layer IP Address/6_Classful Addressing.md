## Fixed IPv4 Classes

1. Before CIDR - Classless Inter-Domain Routing, IPv4 addresses are divided into fixed classes
2. This was called classful addressing.
3. Fixed sizes were simple but not flexible. 
4. After CIDR, you can have /20, /24, /27


| Class | First Octet Range | Default Mask | Network Bits | Host Bits | Use                 |
| ----- | ----------------- | ------------ | ------------ | --------- | ------------------- |
| A     | 1 - 126           | /8           | 8            | 24        | Very large networks |
| B     | 128 - 191         | /16          | 16           | 16        | Medium Networks     |
| C     | 192 - 223         | /24          | 24           | 8         | Small Networks      |
| D     | 224 - 239         | NA           | NA           | NA        | Used for Multicast  |
| E     | 240 - 255         | NA           | NA           | NA        | Reserved            |
## Special Ranges

1. 0.x.x.x Range
	1. Not used
	2. Historically, they were associated with special meanings such as "this network"
2. 127.x.x.x Range
	1. This entire block is reserved for loopback functionality
	2. The most famous example is **127.0.0.1** which refers to the local machine itself.
	3. When a system sends traffic to 127.0.0.1, the traffic never leaves the machine. It is immediately returned to the local networking stack.
	4. For this reason, 127.0.0.1 is commonly referred to as: localhost, loopback address