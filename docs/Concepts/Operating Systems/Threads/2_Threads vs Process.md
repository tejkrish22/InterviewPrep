
## Core Difference

> Process: Owns resources and provides isolation
> Thread: Executes code inside a process

## Memory and Isolation

1. Processes usually have separate virtual address spaces. A virtual address space is the memory view that a process can use. 
2. Because each process has its own address space, one process normally cannot directly touch another process’s memory.
3. Threads are different. Threads inside the same process share one address space, so they can access the same heap, globals, code, and process resources.
4. The risk is that one thread can corrupt data used by another thread.

|         | Benefit                    | Risk                                              |
| ------- | -------------------------- | ------------------------------------------------- |
| Process | More Safety                | Communication and switching can be heavier        |
| Thread  | More Convenience and Speed | Shared data can be damaged if handled incorrectly |
## Creation and Switching Cost

| Operation | Process                                              | Thread                                                   |
| --------- | ---------------------------------------------------- | -------------------------------------------------------- |
| Creation  | Higher cost because a new process context is needed  | Lower cost because existing process resources are reused |
| Switching | Heavier because memory-addressing context may change | Lighter in the same process, but not free                |
## Communication and Correctness

|           | Process                        | Thread                   |
| --------- | ------------------------------ | ------------------------ |
| Mechanism | IPC - pipes, sockets, messages | Through shared memory    |
| Overhead  | More complex and consuming     | Requires Synchronisation |
## Crash Impact and Failure Boundary

|          | Process                          | Thread                                                                         |
| -------- | -------------------------------- | ------------------------------------------------------------------------------ |
| Impact   | Affects that process             | Can affect the whole process because threads share memory and failure boundary |
| Boundary | Other processes remain protected | Other threads are affected                                                     |
## Summary

|Dimension|Process| Thread                                             |
|---|---|---|
|Definition|A running program with its own resources| An execution path inside a process                 |
|Main role|Owns resources| Executes code                                      |
|Address space|Usually has a separate address space| Shares the process address space                   |
|Heap and globals|Private from other processes| Shared between threads of the same process         |
|Stack|A process contains thread stacks| Each thread has its own stack                      |
|Creation cost|Usually higher| Usually lower                                      |
|Switch cost|Usually heavier| Usually lighter                                    |
|Communication|Uses IPC| Usually uses shared memory inside the same process |
|Crash impact|Isolates better| Can affect the whole process                       |
|Best use|Protection, isolation, stability, and security| Shared work, responsiveness, and CPU utilisation   
