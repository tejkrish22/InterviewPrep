---
notion-id: 35dd9a38-fc71-80a6-a08f-e8155a23ac4b
---
Some basic knowledge of the structure of computer system is required to understand how OS work
1. A modern general-purpose computer system consists of one or more CPUs and a number of device controllers connected through a common bus that provides access to shared memory.
    1. Each `device controller` is in charge of a specific type of device.
    2. The CPU and the device controllers can execute `concurrently`, `competing` for memory cycles.
    3. To ensure orderly access to the shared memory, a `memory controller` is provided whose function is to `synchronise` access to the memory.

![[image 5.png]]
2. **Bootstrap Program: **The `initial program` that runs when a computer is powered up or rebooted.
    1. It is stores in the ROM
    2. It must know how to load the OS and start executing that system.
    3. It must locate and `load the OS kernel into memory`.
3. **Interrupt: **The occurance of an event is usually signalled by an Interrupt from hardware or software.
    4. Hardware may trigger an interrupt at any time by sending a signal to the CPU, usually by the way of the system bus.
4. **System Call (Monitor Call): **Software may trigger an interrupt by executing a special operation called System Call.
    5.  When the CPU is interrupted, it stops what it is doing and immediately transfers execution to a fixed location. The fixed location usually contains the starting address where the Service Routine of the interrupt is located. 
    6. The ISR - Interrupt Service Routine contains the info on what should be done.
    7. The Interrupt service routine executes
    8. On completion, the CPU resumes the interrupted computation.