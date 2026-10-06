## Why OS types exist?

1. When an operating system is designed, it cannot optimise every factor equally.
2. If everything is treated as equally important, no single goal gets the strongest possible treatment.
3. That is why OS classification should begin with one question: what problem is this OS optimising for?
	1. A laptop wants `responsiveness`
	2. A server wants `throughput and fairness`
	3. A flight controller wants `predictable deadlines`
	4. A phone wants `battery, sensors`, wireless support, and app isolation
	5. An embedded device wants `small footprint and reliability`
## Batch OS

1. Runs grouped jobs
2. Little user interaction
3. Useful for large repeated jobs
4. Poor interactive experience

## Multiprogramming OS

1. Multiple programs are kept in memory
2. If one program waits for I/O, the CPU runs another
3. The goal is to improve CPU utilisation

## Multitasking and Time Sharing

1. The OS switches quickly between tasks
2. CPU time is divided into slices
3. The goal is responsiveness
4. Scheduling and context switching are required

## Multiprocessing OS

1. Multiple CPUs or cores are available
2. Tasks can truly run at the same time
3. The scheduler must choose the task and the core
4. Load balancing matters
5. Cache locality matters
6. Multitasking can also happen on a multicore system

## Real Time OS

1. A real-time OS cares about deadlines. It is not simply about being very fast; it is about being predictable.
2. Hard Real Time
	1. In hard real-time systems, missing a deadline can be catastrophic.
3. Soft Real Time
	1. In soft real-time systems, missing a deadline reduces quality, but the result is not catastrophic.
## Categories of OS

1. **Distributed OS** : A distributed OS coordinates multiple machines. The system is designed across more than one computer rather than treating one standalone machine as the full environment.
2. **Network OS**: A network OS provides network resource sharing. Resources are made available over a network so connected systems can access shared services or hardware.
3. **Embedded OS**: An embedded OS runs inside constrained devices. These systems often have limited hardware and must be reliable within those limits.
4. **Mobile OS**: A mobile OS is optimised for the needs of phones and similar devices. It must handle touch, sensors, battery, wireless communication, and app sandboxing.
## Summary

1. `OS type = workload goal + hardware constraint + user expectation`


