## The Core Split

1. A process provides one shared environment, and multiple threads execute inside it. 
2. Each thread has its own current execution path, but it does not get a separate process memory space.
3. Shared process environment: address space + process 0 level resources
4. Private thread execution state: the data needed to continue one thread’s current execution.

## Shared Between Threads

1. Anything that belongs to the process is usually visible to all threads inside that process.
2. Memory Segments
	1. Code or text segment: executable instructions of the program.
	2. Data segment: initialised global and static variables.
	3. BSS segment: uninitialised global and static variables.
	4. Heap: dynamically allocated memory.
	5. Memory-mapped regions: mapped files or shared mappings.
3. Process resources
	1. Open file descriptors: all threads share the same set.
	2. Credentials, permissions, and resource limits: threads in the same process use the same process identity and limits.
4. Other
	1. Common Caches: Threads can reuse shared cached data.
	2. Common Queues: Threads can efficiently exchange work through shared queues.
	3. Common Configuration: All threads can access the same configuration and process-wide settings.

## Private to each thread

1. Each thread keeps private execution state. 
2. This private state is about where that thread currently is in execution, not about giving the thread its own process memory.
	1. Own stack: function calls, return addresses, and local variables.
	2. Own program counter: the next instruction that thread will execute.
	3. Own CPU registers: current working values while the thread runs.
	4. Own thread ID and scheduling state: metadata the OS can use to track the thread separately.