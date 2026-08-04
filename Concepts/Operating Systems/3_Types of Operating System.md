1. There are several types of operating system
    1. Batch
    2. Multiprogrammed
    3. MultiTasking
    4. Real Time OS
    5. Distributed
    6. Clustered
    7. Embedded
2. Batch
    1. During old days when that many PCs are not available people used to batch processing using punch cards, paper tape, magnetic tape.
    2. These cards are collected as batches and are given to CPU to process the jobs by the operator.
    3. But during the job if any I/O is necessary then the CPU will be in idle time which reduces the efficiency.
    4. Spooling (Simultaneous Peripheral Operations Online)
	    1. In a computer system input-output devices, such as printers are very slow relative to the performance of the rest of the system.
	    2. Spooling is the process in which data is temporarily held in memory or other volatile storage to be used by a device or a program.
	    3. This way CPU is not loaded.
	    4. Ex: Printer's spool or mouse spool.
3. Multiprogram
    1. Inside memory we will do multiple process simultaneously.
    2. These process are processed in CPU one by one,
    3. When P1 is given to CPU and P1 needs I/O then CPU will take the next process P2.
    4. Non-Preemptive.
    5. CPU will never be in IDLE, Efficient utilisation
4. MultiTasking
    1. It is logical extension of multi-programming, it allows many users to share the computer in parallel. 
    2. The CPU executes multiple jobs by switching among them,, but the switches occur so frequent that, each user is given the impression that the entire computer system is dedicated to his use, even though its being shared among many users.
5. Multiprocessing
	1. Multiprocessor Operating System refers to use of two or more CPUs within a single computer system. These multiple CPUs share system bus, memory and other peripheral devices.
	2. Multiple concurrent processes each run on a separate CPU, here we achieve a true parallel execution.
	3. Can be categorised as Symmetric processing and Asymmetric Processing where in first one all processors are treated same but in later each processor is given a role
	
6. Real Time OS
    1. A real time os is a special purpose os which has well defined fixed time constraints. Processing must be done within the defined time limit or the system will fail.
    2. Hard Real Time
        1. Tightly time constrained
        2. No space to delay
        3. Critical like Missile systems, Airbags.
    3. Soft Real Time
        1. Less tightly time constrained
        2. Space for delay is present
7. Distributed
    1. This OS is a software over a collection of independent, networked, communicating, loosely coupled nodes and physically separate computational nodes.
    2. If one of the system fails then the other system can pick up.
        1. Availability
        2. Fault Tolerance
        3. Scalability
8. Clustered
    1. In a single Network multiple devices are connected and act as a single super computer
9. Embedded
    1. OS working to achieve single functionality only.
    2. Usually can't ask the OS to work on different function.