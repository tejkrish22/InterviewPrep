## Intro

1. If a user-space runtime or library manages it, it is a user-level thread.
2. If the OS kernel manages it, it is a kernel-level thread.
3. That management location changes scheduling, blocking behaviour, multicore parallelism, cost, and debugging visibility.

## User Level Threads

1. The runtime
	1. creates user threads
	2. decides which user thread should run
	3. switches between user threads
	4. saves and restores user-thread state
2. Even though the runtime manages user threads, actual CPU time still comes through the kernel.
3. The runtime may request one or more kernel-thread-equivalent execution resources, depending on implementation and system limits.
4. The user level threads are fast because kernel involvement is not needed
5. Limitations
	1. Limited kernel visibility
	2. If one user level thread of many user level threads, that are running on one kernel thread, is blocked ; then all user threads above that kernel thread may stop.
	3. Parallelism - Depends on how many kernel level threads are spawned
	4. Debugging - harder because OS tools may not show every runtime-managed thread.

## Kernel Level Threads

1. A kernel-level thread is managed by the OS kernel. The kernel knows it as a schedulable execution unit.
2. The kernel can
	1. put a thread into ready, running, or blocked state
	2. preempt a thread and give CPU time to another thread
	3. wake a thread when I/O or an event completes
	4. run different threads on different cores
3. If one kernel-level thread blocks, other kernel-level threads can still run. OS tools can also often show per-thread CPU usage.
4. The tradeoff is cost. Kernel-level threads require more kernel work per thread operation, but they provide stronger scheduling, blocking support, multicore support, and visibility.

## Comparison

| Aspect               | User-Level Thread                                         | Kernel-Level Thread                                       |
| -------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| Managed by           | Runtime or user-space library                             | OS kernel                                                 |
| Where it begins      | Runtime                                                   | OS-visible execution unit                                 |
| Who chooses it       | Runtime scheduler                                         | OS scheduler                                              |
| Kernel visibility    | Limited; kernel may only see the underlying kernel thread | High; OS sees each kernel-level thread as schedulable     |
| Switching cost       | Usually cheaper                                           | Usually more expensive                                    |
| Control              | Runtime control                                           | OS control                                                |
| Blocking support     | Can be weak in simple many-to-one mappings                | Stronger because other kernel-level threads can still run |
| Parallelism          | Not automatically guaranteed                              | Stronger multicore support                                |
| Debugging visibility | May need runtime-specific tools                           | OS tools can often show per-thread CPU usage              |

## Interview Focus

The strongest answer does not stop at naming the two types. It explains what changes when thread management moves from the runtime to the kernel.

1. User-level threads give faster switching and more runtime control.
2. Kernel-level threads give better OS visibility and stronger support for blocking and parallelism.
3. Assuming user-level threads always run in parallel is a common trap.
