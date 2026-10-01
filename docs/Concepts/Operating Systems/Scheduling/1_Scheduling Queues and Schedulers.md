## Why Scheduling queues exist

1. A process can be in
	1. New - ly created
	2. Ready - for CPU
	3. Running - on CPU
	4. Waiting - for I/O
	5. Suspended - paused or swapped out
	6. Terminated - Done
2. So queues organise the processes by what they are waiting for and help the OS decide who runs next.

## Scheduling Queue

1. A scheduling queue is a data structure used by the operating system to group processes that are in a similar state. 
2. This lets the operating system pick processes from the correct place when the next action is possible.
3. Different Queues are
	1. New Queue
	2. Ready Queue
	3. Running
	4. Waiting Queue
	5. Suspended Queue
	6. Terminated

## Types of Schedulers

1. Long Term Scheduler - `who enters the active system ?`
	1. Decided which submitted jobs or processes are allowed to enter the active system.
	2. Controls the degree of multiprogramming
	3. More visible in batch or job-based systems
	4. Runs relatively rarely
2. Short Term Scheduler - `who gets the CPU next ?`
	1. Decides which ready process or thread gets the CPU next.
	2. CPU scheduler - FCFS, SJF, RR, Priority and MLFQ
	3. Runs very frequently and fast
3. Medium Term Scheduler - `who is suspended and resumed ?`
	1. When memory is under pressure, temporarily removes a process from memory by suspending or swapping it out, later brings back as well.
	2. Runs sometimes.