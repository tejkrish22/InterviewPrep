
|                | Program            | Process                              | Thread                                     |
| -------------- | ------------------ | ------------------------------------ | ------------------------------------------ |
| **Definition** | Stored             | Running                              | Execution path inside a process            |
| Purpose        | store instrucitons | isolated execution                   | concurrent work inside same process        |
| **Storage**    | Stored on disk     | Exists in memory while running       | Exists within a process (in memory)        |
| **Execution**  | Not executed       | Actively executing                   | Actively executing (part of process)       |
| **Memory**     | No runtime memory  | Has its own address space and memory | Uses the process's memory (shared)         |
| **Isolation**  | NA                 | Isolated from other process          | Not Isolated inside same process           |
| **Sharing**    | NA                 | Limited sharing with other processes | Shares memory and resources of the process |

1. Thread shares 
	1. code
	2. heap
	3. globals
	4. open files
	5. address space
2. Thread owns
	1. Stack
	2. Program Counter
	3. Registers
	4. Thread ID