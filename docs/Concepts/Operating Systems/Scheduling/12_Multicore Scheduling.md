## Intro

1. Modern machines usually have multiple CPU cores. 
2. That changes scheduling because multiple tasks can truly run at the same time, not just appear to run through fast switching.
3. Multicore scheduling therefore adds a second major question - the scheduler must decide *which task should run*, and also *which CPU core should run it*.

## Per-Core Run Queues

1. A per-core run queue stores runnable tasks for one CPU core.
2. Each core has its own local queue, so scheduling decisions are faster and local.
3. Pros
	1. Less contention than one global queue.
	2. Faster local scheduling decisions.
	3. Better scalability on many cores.
4. Cons - The Imbalance Problem
	1. One core can have a long run queue, while other be idle.
	2. Initial task distribution may not remain balanced.

## Task Migration

1. Task migration means moving a runnable task from one core to another. It is used when the system needs to balance work across cores.
2. Pros
	1. Process migration helps utilise idle CPU cores, reduce process waiting time, and balance the workload across processors. 
	2. This improves overall CPU utilisation and system throughput.
3. Cons 
	1. Hurt Cache Locality and add overhead

## Cache Locality in Multicore Scheduling

1. Each CPU has its own cache, so the placement of the each process on the core matters.
2. Same Core Execution
	1. Cached data is likely present
	2. Fewer cache misses
	3. Better performance
3. Moving to other core
	1. Cached data may not present
	2. More cache misses
	3. Slower performance
4. Load balancing and Performance are the trade-offs

## Concurrency in Multicore Scheduling

1. Multiple threads can run at the same time on different cores, and those threads may access shared data at the same time.
2. Race conditions depend on timing.
3. Thus we need synchronisation mechanisms.