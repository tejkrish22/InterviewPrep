## What is Thread?

1. A thread is a scheduled execution path inside a process.
2. A thread has private execution state, but it shares the process environment
3. Each thread keeps its own
	1. Program Counter - next instruction
	2. CPU registers - current working values
	3. Stack - function calls and local variables
	4. State - ready, running, blocked or finished
4. Threads within the same process share
	1. Code
	2. Heap
	3. Global Variables
	4. Open Files
	5. Address space
	6. Permissions

## Single Threaded Process

1. A single-threaded process has only one execution path.
2. At one moment, only one part of that process is logically active.
3. This design is simple to reason about because only one path touches program state.
4. But it is not enough for many responsive browsers, servers, editors, and databases.

## Multithreaded Process

1. A multithreaded process has many execution paths inside one process.
2. A main thread may accept work from users or clients, while worker threads handle separate requests.
3. On multicore systems, runnable threads may execute on different cores.

## Role of Scheduler

1. The scheduler gives CPU time to ready work. In many real systems, the scheduler chooses a runnable thread or task.
2. Scheduling decides who runs. It does not make shared data safe.
3. Because threads share memory and process resources, careless updates can create timing bugs.
4. Shared-data correctness belongs to synchronisation, which is a separate topic.
