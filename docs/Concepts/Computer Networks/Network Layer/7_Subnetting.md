> What if we want to divide our network into smaller sub networks ?

## Subnetting /24 to /26
![[24_to_26_subnet.png|523]]
## /26 Subnet Ranges
![[26_subnet_ranges.png|530]]
## Network, Host and Broadcast

1. Network ID
	1. First address, used to represent the whole subnet
	2. `192.168.1.0/26`
2. Host ID
	1. All middle addresses, usable host addresses
	2. `192.168.1.1 to 192.168.1.62`
3. Broadcast ID
	1. Last Address, used to send to all devices in that subnet at once
	2. `192.168.1.63`