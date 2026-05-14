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
    2. These cards are collected as batches and are given to CPU to process the job.
    3. But during the job if any I/O is necessary then the CPU will be in idle time which reduces the efficiency.
3. Multiprogram
    1. Inside RAM we will do multiple process simultaneously.
    2. These process are processed in CPU one by one,
    3. When P1 is given to CPU and P1 needs I/O then CPU will take the next process P2
    4. Non-Preemptive
    5. Avoid Idleness
4. MultiTasking
    1. Preemptive.
    2. But here time sharing happens, that is CPU allocates fixed time slots to each process.
    3. If P1 needs 10s to complete, and CPU uses 5s slot, then after running P1 for 5s; CPU takes P2.
    4. Avoid Idleness and improves response time
5. Real Time OS
    1. The CPU processes the tasks in real time unlike batch processing.
    2. Hard Real Time
        1. Tightly time constrained
        2. No space to delay
        3. Critical like Missile systems
    3. Soft Real Time
        1. Less tightly time constrained
        2. Space for delay is present
6. Distributed
    1. The processing environment is geographically distributed and connected them via network.
    2. If one of the system fails then the other system can pick up.
        1. Availability
        2. Fault Tolerance
        3. Scalability
7. Clustered
    1. In a single Network multiple devices are connected and act as a single super computer
8. Embedded
    1. OS working to achieve single functionality only.
    2. Usually can't ask the OS to work on different function.