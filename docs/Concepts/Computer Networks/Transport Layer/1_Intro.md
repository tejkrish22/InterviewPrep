## Role of Transport Layer

1. The Network Layer is responsible for delivering packets to the correct machine. 
2. It uses IP addresses to identify devices and ensures that packets travel through the network toward the destination host.
3. However, delivering a packet to the correct machine is only part of the problem.
4. A modern computer can run many applications simultaneously
5. Similarly, a server may also run multiple services at given time.
6. The question, which service or process should receive the data in server; Network layer don't have that info.
7. There, Transport Layer determines which process inside that machine should receive the packet.
## Process-to-Process Communication

1. Consider the following scenario where
	1. A Chrome browser process runs on your laptop.
	2. A web server process runs on Google's machine.
	3. The browser sends a request.
	4. The web server receives and processes that request.
2. The above process-to-process communication is possible because of
	1. Port Numbers
	2. Sockets - `IP + Port Number + Protocol`
	3. TCP 
	4. UDP
## Host-to-Host vs Process-to-Process Communication

|Host-to-Host Communication|Process-to-Process Communication|
|---|---|
|Handled by the Network Layer|Handled by the Transport Layer|
|Machine-to-machine delivery|Application-to-application delivery|
|Uses IP addresses|Uses port numbers and transport protocols|
|Identifies the destination machine|Identifies the destination process|
## Packet Identification at the Transport Layer

1. To support process-to-process communication, a packet needs more information than just source and destination IP addresses.
2. A complete communication typically involves:
	1. Source IP Address – The machine sending the packet.
	2. Source Port Number – The process sending the packet.
	3. Destination IP Address – The destination machine.
	4. Destination Port Number – The destination process.
	5. Protocol – TCP or UDP.
3. Together, these fields uniquely identify a communication session.
4. The IP addresses help locate the machines, while the port numbers help locate the correct processes inside those machines.