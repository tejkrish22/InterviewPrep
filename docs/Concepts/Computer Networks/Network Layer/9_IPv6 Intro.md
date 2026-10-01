## Why IPv6 was needed ?

1. IPv4 uses 32-bit addresses, so there are only 2^32 addresses possible.
2. As the no. of devices increase, the address would not be sufficient.
3. Even NAT was a work around, but was not a solution.
4. So IPv6 is introduced - 128 bit address.

## IPv6 Notation

1. IPv6 uses hexadecimal, 8 groups, 16 bits / group, total 128 bits
2. `2001:0db8:85a3:0000:0000:8a2e:0370:7334`

## IPv6 Shortening Rules

1. Leading zeroes in a group can be removed.
	1. `2001:db8:85a3:0:0:8a2e:370:7334`
2. One continuous run of all-zero groups can be replaced using : :
	1. `2001:db8:85a3::8a2e:370:7334`
	2. Can only be used once.

## IPv6 Prefix Notation

1. `2001:db8:85a3::8a2e:370:7334/64` - /64 means, first 64 bits are network.
2. / 64 - common subnet size
3. CIDR style thinking continues in IPv6 too.

## IPv6 Address Types

1. Unicast - one sender -> one receiver
2. Multicast - one sender -> a group
3. Anycast - one sender -> nearest / best among many

> In IPv6, broadcast is not present. Instead multicast is re-used for same purpose.

## Stateless Address Auto-Configuration (SLAAC)

1. Devices create their own IPv6 address using the *prefix* info from the router.
2. IPv4 uses NAT
	1. private addresses inside
	2. one public address outside
3. IPv6 does not use NAT
	1. as many unique addresses are available, devices can be addressed directly.
	2. Firewall can still protect devices

## IPv6 Design Benefits

1. Massive address space
2. Less Dependence on NAT
3. Simple hierarchical addressing
	1. Aggregation and routing became more efficient
4. Room for many devices
5. Better long-term internet growth
6. Header Design improved
	1. Removed unnecessary fields from IPv4
	2. Base header is always 40 bytes
