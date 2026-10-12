
> Load balancing distributes runnable work across CPU cores so that the system can use available CPU resources more effectively.

## Moving Work has a Cost

1. Migration helps use idle cores, but it is not free. A task that has been running on one core may have useful data in that core's cache.
2. If the task is moved to another core, the new core may not have that cached data available.
3. This can cause a performance drop because the task may need to rebuild useful cache state on the new core.
4. The task continues logically from where it left off, but the hardware locality it had built on the previous core may be lost or reduced.

## Real Goal of Load Balancing

1. Its not just the count that matters while spreading the load across CPUs.
2. Because some jobs may be CPU bound and some may be I/O bound.
3. So if the load balancer places all the CPU bound jobs in one core instead of spreading then that core would take all the load.

## Push and Pull Migration

1. Push Migration
	1. In push migration, an overloaded CPU sends work away.
	2. If CPU A has too much runnable work and CPU B is idle, CPU A may push some work toward CPU B.
2. Pull Migration
	1. In pull migration, an idle CPU takes work from a busy CPU.
	2. If CPU B has no work and CPU A has a long queue, CPU B may pull runnable work from CPU A.
3. However, real operating system logic is more complex than this simple model.
4. Production schedulers must consider timing, task behaviour, cache effects, hardware topology, and fairness before deciding whether migration is worth it.

## Topology Aware Load Balancing

![[topology_aware_balancing.png|486]]

1. Modern hardware is not simply a flat collection of identical cores. Its underlying structure affects how efficiently tasks can be scheduled and how costly it is to move work between processors.
2. A modern system may contain multiple levels of organisation, including **hardware threads**, **CPU cores**, **CPU packages or sockets**, and **NUMA nodes**, each with different communication and memory-access costs.
3. Hardware threads are execution contexts inside a core. This is why a system may be described as having 8 cores and 16 logical CPUs when each core supports two hardware threads.
4. Cores are grouped inside CPU packages or sockets. A socket is the physical CPU package connected to the motherboard, and the package contains cores.
5. NUMA stands for Non-Uniform Memory Access. In a NUMA system, groups of CPUs may have memory that is physically closer to them. Accessing local memory is cheaper than accessing memory attached to a distant NUMA node.
6. Moving a task to a nearby CPU may be cheaper if the destination is in the same socket or same NUMA node. The task is still close to similar hardware resources and local memory.
7. Moving a task across sockets or NUMA nodes may be expensive. The task may still have memory associated with the old node, and accessing that memory from the new location can add latency.

## Pros and Cons of Load Balancing

| Pros                | Cons               |
| ------------------- | ------------------ |
| Use Idle Cores      | Migration Overhead |
| Improve throughput  | Cache Misses       |
| Reduce Waiting time | Remote NUMA access |
