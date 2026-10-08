## Private vs Public IP

1. Private IP
	1. Used inside internal networks.
	2. Not routed on the public Internet; devices can access it through NAT/PAT or a proxy.
	3. The private IPv4 ranges are defined in RFC 1918
	4. Only the following are used for private IP
		1. 10.0.0.0 / 8
		2. 172.16.0.0 / 12
		3. 192.168.0.0 / 16
2. Public IP
	1. Globally unique
	2. Globally routable, but accessibility depends on routing, firewall rules, and a listening service.
	3. A public-facing service needs a reachable public endpoint; its backend server can use a private IP behind NAT or a reverse proxy.

## Network Address Translation (NAT)

1. IPv4 addresses are limited in number.
2. NAT translates IP addresses; not every form of NAT shares a single public address.
3. **PAT (also called NAPT)** translates addresses and ports, letting many private hosts share a public IPv4 address and conserving **public IPv4 addresses**.
4. For PAT, the router tracks mappings such as `private IP : port → public IP : port`, along with the transport protocol.
5. Example PAT flow
	1. Packet leaves laptop from `192.168.1.20 : 51514`
	2. Packet goes through NAT or Home router and source changes to `203.0.113.5 : 4001`
	3. Reply comes back to `203.0.113.5 : 4001 `
	4. Router checks NAT table and finds matching entry
	5. Forwards reply to `192.168.1.20 : 51514`