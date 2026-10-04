## Private vs Public IP

1. Public IP
	1. Used inside internal networks.
	2. Cannot access on public internet.
	3. The private IPv4 ranges are defined in RFC 1918
	4. Only the following are used for private IP
		1. 10.0.0.0 / 8
		2. 172.16.0.0 / 12
		3. 192.168.0.0 / 16
2. Public IP
	1. Globally unique
	2. Can be access by public
	3. A public-facing server usually needs a pubic IP 

## Network Address Translation (NAT)

1. IPv4 addresses are limited in number.
2. NAT helps to preserve private IP, by using a single public IP; thus preserving IPv4 addresses.
3. The router maintains NAT table that stores mapping of `private IP : port -> public IP : port`
4. NAT is combined with info and is called as Port Address Translation (PAT)
5. This is the flow
	1. Packet leaves laptop from `192.168.1.20 : 51514`
	2. Packet goes through NAT or Home router and source changes to `203.0.113.5 : 4001`
	3. Reply comes back to `203.0.113.5 : 4001 `
	4. Router checks NAT table and finds matching entry
	5. Forwards reply to `192.168.1.20 : 51514`