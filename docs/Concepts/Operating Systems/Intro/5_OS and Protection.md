
> The OS is not only a manager but also a safety boundary.
> **OS Protection = Hardware Support + Kernel Enforcement + Permissions + Limits**

## Layer 1: User Mode and Kernel Mode

1. User Mode
	1. Normal apps run here
	2. Limited privileges
	3. Cannot directly control hardware or page tables.
2. Kernel Mode
	1. OS kernel runs here
	2. Privileged access
	3. Manages hardware and resources

## Layer 2: Process Isolation using Virtual Memory

1. Each process gets its own virtual address space.
2. If a process accesses forbidden memory
	1. CPU raises a fault
	2. OS handles it
	3. Process may get segmentation fault

## Layer 3: File permissions and user identity

1. When a process opens a file, OS checks
	1. which user running it
	2. which group the user belongs to
	3. who owns file
	4. read / write / execute permissions
2. The OS uses user identity, group, ownership, permissions and the requested operation to decide if access is allowed.
   
## Layer 4: Controlled Device Access

1. When app requests device access
	1. OS validates, checks permissions and routes requests
	2. OS uses drivers and controlled I/O paths
	3. Device performs the operation
	4. Result returns to the app

## Layer 5: Resource limits and isolation

1. OS can limit
	1. CPU
	2. Memory
	3. Processes
	4. Open Files
	5. Disk Usage
	6. Containers add cgroups and namespaces for stronger isolation views