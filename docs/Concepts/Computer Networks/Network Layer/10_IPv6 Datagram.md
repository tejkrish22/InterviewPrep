## IPv6 Base Header

1. Fields
	1. Version - 4 
	2. Traffic Class - 8
	3. Flow Label - 20
	4. Payload Length - 16
	5. Next Header - 8
	6. Hop Limit - 8
	7. Source Address - 128
	8. Destination - 128
2. Total fixed 40 bytes, unlike IPv4's variable
3. Optional info goes into extension headers

## IPv6 Datagram Design 

1. Fixed size base header
2. Simple forwarding by router
3. No header checksum
4. No broadcast
5. No router-side fragmentation
6. Optional info moved to extension headers.

## Details of each field

1. Version
	1. identify IP version, value = 6 for IPv6
2. Traffic Class
	1. traffic classification
	2. priority handling
	3. congestion-related signalling
	4. It helps the network decide how to treat the packet
		1. Voice / video - High Priority, sent first
		2. Online Gaming - Medium Priority, sent next
		3. Normal Data - Low priority, sent last
	5. Flow Label
		1. Identify packets belonging to the same flow
		2. Helps the network treat a stream of packets consistently
	6. Payload Length
		1. Length of everything after IPv6 base header.
		2. Include both payload and extension headers.
	7. Next Header
		1. Tells what comes immediately after the current header.
		2. Like linked lists, Base -> Routing -> Fragment -> TCP
	8. Hop Limit
		1. IPv6 version of TTL
		2. Each router decreases it by 1.
	9. Source Address
	10. Destination Address