## Intro

> Context switching is the process in which the CPU moves from one task to another, even when the first task has not completed yet.

## Why context switching exists ?

1. Fair CPU sharing between all processes.
2. Keeps system responsive.

## Context Switch Flow

A full switch from Process A to Process B looks like

1. Process A is running.
2. A timer interrupt, blocking call, wakeup, or priority event occurs.
3. The operating system enters kernel mode.
4. The operating system saves Process A's context.
5. The scheduler chooses Process B.
6. The operating system restores Process B's context, if it already has a saved state.
7. The CPU resumes Process B from where it stopped.

## What gets saved ?

1. Program Counter - tells the system where execution should continue
2. CPU registers - store temporary values
3. Stack Pointer - preserve the function-call state
4. Current Process state
5. Scheduling Info
6. Memory context - preserves the virtual memory view needed by that process

## Voluntary and Involuntary Context Switch

1. Voluntary
	1. Process blocks itself because it cannot continue right now
	2. May be need some I/O usage
2. Involuntary - Preemption
	1. OS takes the CPU away from a running process
	2. Time slice expiry or higher priority task comes in

## Cost of Context Switching

Context switching enables multitasking, but it is not free. Every switch requires work that consumes CPU time.

1. Saving and restoring registers takes work because the operating system must preserve the old process state and load the new one.
2. The scheduler must decide which process should run next.
3. An address-space switch may be needed when the CPU moves to a process with a different virtual memory context.
4. Cache and TLB disruption can occur because each process may have different virtual-to-physical address mappings.
	1. The TLB, or Translation Look aside Buffer, caches recent virtual-address to physical-address mappings.
5. Branch predictor and pipeline effects can add cost because previously prepared instruction work may need to be cleared and rebuilt for the new process.
	1. The CPU may predict which branch of code will execute next. Based on that prediction, it can prepare future instructions in the pipeline to speed up execution.