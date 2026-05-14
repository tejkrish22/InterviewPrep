## Process States

![[Pasted image 20260513193028.png]]

### Primary States

1. **New** 
	1. A process stored in secondary memory or creating a process.
2. **Ready**
	1. Process enters the RAM.
	2. The process is brought in by `Long Term Scheduler`.
	3. CPU can interrupt the process and put the existing process in Ready state, if
		1. Higher Priority Process comes in
		2. If allotted time is completed for the process; handled by `Short Term Scheduler`
		3. `Preemptive` process can be paused
		4. `Non Preemptive` process can't be paused.
3. **Running**
	1. The process is scheduled to dispatch based on availability computing power with CPU.
	2. Based on type of CPU (Multi-processing vs Single-Processing)
4. **Termination**
	1. Process is ended.
	2. Deallocation of resources is done.
5. **Waiting**
	1. If the process requires any I/O or need to satisfy any dependency to continue the process; then the process is moved to Waiting state.
	2. If the I/O is completed, then the process is moved Ready state.

## Additional States

1. **Suspend Wait**
	1. If the memory is filled with processes in Wait state, then these processes are `swapped` out into secondary memory; into suspend wait state.
	2. This is handled by `Medium Term Scheduler`.
2. **Suspend Ready**
	1. If the memory is filled with processes in Ready state, then these processes are moved into suspend ready to include any higher priority process.
3. **Backing Store**
	1. If the process has completed its I/O in suspend wait state and wait state has enough processes already then this process back stored in suspend ready state.