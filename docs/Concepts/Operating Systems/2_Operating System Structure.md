# Operating System Structure
---
## Micro Kernel Approach

1. This method structures the OS by removing all non-essential components from the kernel and implementing them as system and user-level programs. The result is kernel.

![[kernel.png|400]]

---
## System Call

--- start-multi-column: ID_o4qb
```column-settings
Number of Columns: 2
Largest Column: standard
```

1. System calls provide the means for a user program to ask the OS to perform tasks reserved for the OS on the user program's behalf
2. System calls provide an interface to the services made available by an OS. These calls are generally available as routines written in C and C++. Ex: printf("Hello World) -> write ()
3. The API specifies a set of functions that are available to an application programmer, including the parameters that are passed to each function and the return values the programmer can expect.

--- column-break ---

![[system_call.png]]

--- end-multi-column




![[system_call.png|212]]

4. System Calls can be grouped roughly into six major categories: process control, file manipulation, device manipulation, information maintenance, communications and protection.
---
## 