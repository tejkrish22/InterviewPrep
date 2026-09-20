
## Program vs Process

1. *Program is a passive file* on disk/storage that contains executable code and metadata.
2. *Process is an active running instance*, that has memory, state, PID etc

## How an app becomes a running process
![[what_happens_when_we_open_app.png]]
## Internal Process Structure

1. Process ID: Unique identity for the process
2. Process State: Running, Ready, Waiting etc
3. Virtual Address Space: Isolated memory view for the process
4. Page Tables: Maps virtual addresses to physical address
5. Stack: Function calls, local variables, return info etc.
6. Heap Area: Dynamic Memory Allocation
7. Code / Data Mappings: Executable code and Global/Static data
8. Shared Libs: Dynamically loaded libraries used by the process
9. File Descriptor Table: Tracks open files, sockets, pipes etc.
10. Permissions and User Identity: User ID, Group ID, and access rights.
11. Scheduler Info: Priority, Scheduling Policy, Runtime stats etc