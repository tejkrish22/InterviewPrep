## Why BGP ?

1. Protocols such as RIP, OSPF, and EIGRP work well inside a single organisation or administrative network. 
2. However, the Internet consists of thousands of independently managed networks that must exchange routing information with one another.
3. BGP is the protocol that allows independently managed networks to exchange reachability information and build global connectivity
4. At a high level, BGP allows one network to tell another network - **"These are the IP prefixes that I can reach."** 
5. Along with reachability information, BGP also shares path information that helps routers make routing decisions.
## Autonomous Systems - AS

1. An Autonomous System is a network, or a group of networks, that is:
	1. Under a single administrative control.
	2. Managed using a common routing policy.
2. Every Autonomous System is identified by a unique number known as an `ASN` (Autonomous System Number). Ex: `AS5412`
3. BGP primarily operates between **Autonomous Systems (AS)**.
## Types of BGP

1. eBGP (External BGP)
	1. External BGP is used between different Autonomous Systems.
	2. Google AS communicating with Airtel AS.
	3. The focus of eBGP is inter-domain routing.
2. iBGP (Internal BGP)
	1. Internal BGP is used inside the same Autonomous System.
	2. Why use BGP inside an Autonomous System when we already have OSPF or RIP?
		1. BGP is not only about shortest-path routing. It is also a policy-based routing protocol. 
		2. Large organisations and service providers often need to enforce routing policies, and iBGP helps distribute externally learned routes throughout the Autonomous System.
## BGP as Routing Protocol

1. BGP is a Path Vector Routing Protocol.
2. BGP advertises
	1. Destination network prefix
	2. Path used to reach it
3. The path is represented as a sequence of Autonomous Systems.
4. This information is stored in an attribute called AS_PATH
5. BGP operates over TCP. It uses TCP Port 179.
6. Before exchanging routing information, BGP routers establish a TCP connection with each other.
## Basic working of BGP

1. Establish a Peer Relationship
	1. Two BGP routers first establish a connection via TCP over port 179
2. Exchange routing info
	1. Info like reachable prefixes, path info, additional routing attributes like policies.
	2. Each router learns what the other router knows.
3. Receive Multiple Possible Routes
	1. After exchanging information, a router may discover multiple possible routes to reach the same destination.
4. Apply Path Selection Rules
	1. The router evaluates the available paths, BGP does not simply choose the shortest path.
	2. It considers - Path attributes, Routing policies Administrative preferences, etc
5. Update the Routing Table
	1. After selecting the preferred route, the router installs that route into its routing table.

> A simple way to remember BGP is: Routers establish peer relationships, exchange routes, compare available paths, apply policies, and update their routing tables.
