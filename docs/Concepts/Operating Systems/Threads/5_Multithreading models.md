## Intro

1. A user-level thread is managed by the runtime, while a kernel-level thread is known to the operating system scheduler.
2. User-level threads cannot directly use the CPU. The runtime works through kernel-level threads, and those kernel-level threads are scheduled by the operating system.
3. Multithreading models explain how user-level threads map to kernel-level threads

## Factors

1. Blocking Behaviour
2. Multicore parallelism
3. Overhead
4. Debugging
5. Scheduling

## Standard Models

1. Many-to-one model
	1. Many user-level threads map to one kernel-level thread.
	2. Pros
		1. The runtime manages threads without frequent kernel involvement
		2. User-space control is quick
		3. Low overhead as kernel is less involved
	3. Cons
		1. Blocking problem
		2. No multicore parallelism
		3. Limited kernel visibility
2. One-to-One model
	1. Each user-level thread maps to one kernel-level thread
	2. Pros
		1. Independent Blocking
		2. Parallel execution on multiple cores
		3. Good OS kernel visibility
	3. Cons
		1. Kernel Overhead
	4. Modern Linux Pthreads fit this model at the operating system thread level.
3. Many-to-Many model
	1. Many user-level threads map to many kernel-level threads
	2. Balanced - combines lightweight task management with hardware parallelism.
		1. Runtime can create required number of user level threads
		2. OS gives multiple kernel-level threads to schedule
		3. Better parallelism than many-to-one
		4. Less overhead as this avoids creating kernel threads for small tasks
	3. Runtime and kernel coordination becomes harder, and runtime-specific debugging may be needed.
4. Two-Level model
	1. The two-level model extends many-to-many. Many user-level threads can still map to many kernel-level threads, but the model adds optional binding.
	2. Binding means a selected user thread is tied to a particular kernel thread. This gives control when a special thread needs predictable kernel backing.
	3. It combines flexibility with selected control.
	4. It is more complex than the simpler models.
