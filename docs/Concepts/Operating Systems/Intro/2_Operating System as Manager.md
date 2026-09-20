
## OS as Resource Manager

1. In a computer many applications could run together and they need access to things like
	1. CPU
	2. Memory
	3. File Storage
	4. Devices
	5. Network
2. The OS decides who gets which resource, when and under what rules.
3. Resources are physically connected through hardware pathways, while the OS controls and coordinates how software uses them. They can communicate through controllers, buses etc with the rules by OS.

## CPU Management

1. Many processes may be ready to run, but CPU time is limited.
2. OS Scheduler - Scheduling Algorithms
	1. Who runs now
	2. Who waits
	3. How long each task runs
	4. Which task gets priority
	5. How to keep the system responsive
3. CPU Execution
	1. Single - Core
		1. One thread at a time
		2. Fast switching creates the illusion of many apps
	2. Multi - Core
		1. Multiple threads can truly run
		2. OS still manages placement and fairness

## Memory Management

1. Every process needs memory to run. RAM stores running code and data.
2. Virtual Memory makes each process feel it has private memory
3. OS Manages memory so that
	1. Isolation & Protection
		1. Each process gets its own address space
		2. One process cannot directly override another
	2. Management and Efficiency
		1. Memory is loaded and freed
		2. Physical RAM is used efficiently

## File Management

1. Files are named persistent data.
2. OS manages
	1. file names
	2. directories and paths
	3. metadata
	4. permissions
	5. open files
	6. caching
	7. storage

## Device Management

1. Applications would require various I/O devices
2. OS manages how the applications can use these devices
3. The following components of OS comprises the device management
	1. Drivers - OS uses drivers to understand the hardware
	2. Interrupts - OS uses interrupts to read device events
	3. DMA - OS uses DMA for efficient data transfer
	4. Buffers - OS uses buffers for temporary I/O data.

## System Calls 

1. Apps requests OS services using system calls
2. Ex:
	1. create process
	2. allocate memory
	3. open / read / write memory
3. The flow, when App needs a service or resource
	1. App makes a system call 
	2. Kernel validates, checks permissions, and parameters
	3. Kernel performs required action on hardware or resources
	4. Result is returned to the application



