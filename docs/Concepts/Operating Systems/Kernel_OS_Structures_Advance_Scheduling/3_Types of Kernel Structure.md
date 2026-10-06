## Why Kernel Structures matter?

1. The OS multiple services like
	1. scheduler
	2. memory manager
	3. file system
	4. etc
2. When designing OS, we can choose where to run these services, whether inside kernel or outside kernel
3. Inside Kernel
	1. Services can access kernel mechanisms directly
	2. faster and efficient
	3. but if something fails, entire kernel collapses
4. Outside Kernel
	1. Services can run isolated, making it safe for kernel
	2. But these services must communicate to kernel through mechanisms such as IPC and message passing
	3. Resulting in context switching and reduce performance

## Monolithic Kernel

1. Almost all operating-system services run inside kernel space
2. Pros
	1. Fast calls
	2. Fewer context switches
	3. Efficient common ops
3. Cons
	1. Large trusted code base
	2. Lower isolation
	3. Harder fault recovery
4. Linux is generally monolithic with loadable kernel modules

## Microkernel

1. A microkernel keeps only minimal core services inside the kernel. 
2. The kernel contains fundamental mechanisms such as low-level scheduling, address-space management, and IPC.
3. Other services, such as file-system services or driver services, run outside the kernel in user space as separate servers. 
4. These services communicate with the kernel using IPC, usually through message passing.
5. Pros
	1. Smaller Kernel code base
	2. Better isolation
	3. Easy fault tolerance
6. Cons
	1. More context switching and message passing
	2. Lower performance
## Hybrid

1. A hybrid kernel mixes monolithic and microkernel ideas. 
2. The goal is to balance performance and modularity. 
3. Services that need faster access may be placed inside kernel space, while services that can be separated may run in user space.
4. Ex: Windows NT and MacOS XNU

## Loadable Kernel Module

1. Loadable kernel modules are pieces of code that are loaded into the kernel when needed. 
2. They help keep the kernel lean and flexible because the system does not need to load every extra feature at boot time.
3. During boot, only the core base kernel required to start the system is loaded into RAM.
4. Extra features and drivers may remain on the hard disk or SSD until a need arises.

## Comparison

|                | Monolithic | Microkernel | Hybrid  |
| -------------- | ---------- | ----------- | ------- |
| Performance    | High       | Low         | High    |
| Isolation      | Low        | High        | Depends |
| Fault Recovery | Hard       | Easy        | Depends |
| Complexity     | Low        | High        | Depends |
