## Intro

> **Process State:** What is happening to the process right now ?

> **PCB: ** Kernel-side record of everything needed to manage the process
## Beginner Process States

1. New
2. Ready
3. Running
4. Waiting / Blocked
5. Terminated

## Process State Flow
![[process_state_flow.png|440]]
## Linux states

1. Running or Runnable
2. Interruptible sleep
3. Uninterruptible sleep
4. Stopped
5. Tracing Stop - A process is controlled by a debugger
6. Zombie - Terminated child whose parent has not collected exit status, not running.
7. Idle Kernel Thread

## Process Control Block

PCB stores the minimum info needed to *pause, resume, schedule, observe and clean up* a process.

Process state alone is not enough, we need context to make state transition.

1. **Identity**
	1. PID, PPID
	2. process group / session
	3. user id, group id
2. **Execution State**
	1. Current state
	2. Program counter
	3. CPU registers
	4. Stack Pointer
3. **Scheduling**
	1. Priority
	2. CPU usage
	3. Scheduling Policy / Class
4. **Memory and Resources**:
	1. Address space metadata
	2. Memory mappings
	3. Page - Table info
	4. Open files, sockets etc
	5. I/O status

## Context Switch Flow

1. CPU executing Process A
2. Preemption or block happens
3. Registers, PC, SP, etc saved in PCB(A)
4. Scheduled picks eligible process B
5. State loaded from PCB(B)
6. CPU resumes Process B
