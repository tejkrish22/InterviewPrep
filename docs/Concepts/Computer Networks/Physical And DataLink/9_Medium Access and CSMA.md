## Collision Problem

1. When multiple devices share the same medium
	1. Two devices may transmit at the same time
	2. Their signals interfere
	3. This is called a Collision
2. Common in 
	1. Shared Ethernet
	2. Old hubs
	3. Half-Duplex Communication

## CSMA / CD

1. Meaning
	1. Carrier Sense : listen before sending
	2. Multiple Access: many devices share medium
	3. Collision Detection: detect collision while sending
2. The flow goes like
	1. device listens
	2. if medium is idle, it sends
	3. collision happens
	4. device detects collision
	5. stops sending
	6. waits random backoff time - randomisation is very important
	7. repeats

## CSMA / CA

1. Collision Avoidance
2. The flows goes like
	1. listen before sending
	2. if medium is busy, wait
	3. use random backoff
	4. send when allowed
	5. sender expects ACK from receiver.
3. Here the sender waits for random back off time even though the channel is free.
4. Used in Wifi
5. Why not collision detection ?
	1. Wireless devices cannot reliably detect collision while transmitting

## CD vs CA

| CD                                    | CA                                         |
| ------------------------------------- | ------------------------------------------ |
| 1. Used in old shared  ethernet       | 1. Used in wifi                            |
| 2. Detects collision after it happens | 2. Tries to avoid collision before sending |
| 3. Stops and retries                  | 3. Uses waiting and backoff and ack logic  |
