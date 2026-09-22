## Intro

> A process is an OS managed execution container for a running program.

1. A program is a passive file on disk, whereas process is an active running instance of that file.
2. When a process started, the OS gives
	1. Memory to run in
	2. PID
	3. CPU state
	4. Permissions
	5. File and I/O handles
	6. Scheduling state
	7. Accounting information
3. Same program file can produce many separate processes.

## Inside a Process

> A process is not just code running, It is `code + memory + execution state + resource + OS metadata`.

1. Memory Parts
	1. code - execution instructions
	2. data - global / static data
	3. heap - dynamic allocations
	4. stack - function call, local variables
2. Execution state
	1. Program counter - next instruction 
	2. Stack pointer - current stack position
	3. Registers - temporary CPU values
3. Resources and Identity
	1. Open file descriptors - file descriptors are non-negative integers used by kernel to uniquely identify and track an open file, device, on network socket for process
	2. Sockets
	3. Signal Handlers
	4. Credentials
	5. User ID and Group ID
	6. Resource limits
## Parent Process

1. PID : Process ID used by OS tools and system calls
2. PPID: Parent Process ID
3. Ex: Shell starts a command 
	1. Shell is parent process
	2. Command Execution is child process
4. **Zombie Process:** It is a child process that has already finished executing, but whose parent has not collected its exit status.

