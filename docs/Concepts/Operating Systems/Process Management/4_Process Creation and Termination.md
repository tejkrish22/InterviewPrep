## Fork

1. In unix-like systems, *fork* creates a child process by duplicating the calling process.
	1. After Fork
		1. Parent and child continues after fork
		2. Parent and child have separate execution states
	2. Return Values
		1. Parent gets child's PID
		2. Child gets 0
		3. failure returns -1 in parent
	3. Scheduling state
		1. Parent and child run order is not guaranteed
	4. Memory Note
		1. Parent and child have separate address space
	5. Copy-on-write
		1. Modern linux may initially share physical pages safely and copy a page only when one process writes

##  Exec

1. What is *exec* ?
	1. does not create a new process
	2. replaces current process image with a new program
	3. PID usually remains the same
	4. old code/data/heap/stack are replaced
	5. new argv and env are used
	6. successful exec does not return to old code
2. Consider the following command in shell - `ls > out.txt`
	1. **Fork Child** - shell creates a child process
	2. **Prepare Setup** - Child inherits the env and open file handles
	3. **Redirect I/O** - child's stdout is redirected to out.txt
	4. **Set env** - child's environment variables are set as needed
	5. **Connect pipes** - If needed, child connects to pipes
	6. **exec ls** - child replaces its image with the ls program
3. exec replaces the current program, fork creates a new program.

## Wait / Waitpid

1. What is `wait`?
	1. wait for child state change
	2. learns which child finished
	3. collect exit status
	4. allow OS to remove child zombie record
2. A process can create child and uses `wait` command and waits for child termination.
3. Ways a process terminates
	1. Normal exit - 0
	2. Error exit - non-zero 
	3. Killed by signal - SIGTERM, SIGKILL etc
	4. Supervisor Termination - timeout, restart policy
4. On Termination, OS usually
	1. stops process from running
	2. release memory
	3. closes resources
	4. records exit status
	5. notifies parent
	6. keeps minimal record until reaped by parent

## Zombies, Orphans, Signals and Failures

1. Zombie
	1. terminated child whose parent has ot collected status
	2. does not run or use cpu
	3. keeps PID, exit status, minimal accounting info
	4. removed when parent reaps it
2. Orphan
	1. child is still running, but original parent has terminated
	2. adopted by an init-like process or sub reaper
3. Signals
	1. kill - command sends a signal `kill -SIGTERM 1234`
	2. SIGTERM - polite termination request
	3. SIGKILL - forceful kill
	4. SIGSTOP  - pause
	5. SIGCONT - resume
	6. SIGCHILD - child changed state
4. A process creation can fail due to
	1. Process limits
	2. Memory Pressure
	3. PID limit
	4. Permissions
	5. Resource limits
	6. etc
5. Reap children to avoid zombies, Orphans get adopted, Signals control behaviour