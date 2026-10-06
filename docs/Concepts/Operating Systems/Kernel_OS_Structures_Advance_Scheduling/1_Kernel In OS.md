## What is Kernel ?

1. The kernel is the protected core of an operating system. 
2. It is the part that performs the heavy lifting behind application requests, resource management, protection, and controlled access to hardware.
3. Applications do not directly control CPU, memory, files, devices, or other resources. 
4. They ask for services through system calls, and the kernel decides whether the request is allowed and how it should be performed.

## Core responsibilities of Kernel

1. CPU Management: Schedules processes and allocates CPU time.
2. Memory Management: Allocates, protects, and frees system memory.
3. File Management: Organises files, directories, and storage access.
4. Device Management: Controls hardware devices through device drivers.
5. Interrupt Management: Handles hardware and software interrupts efficiently.
6. Networking Management: Manages network communication and protocol processing.
7. Protection Management: Enforces security, permissions, and process isolation.

## Application and Kernel Interaction

1. Applications request kernel services through system calls. 
2. A system call is the controlled path from application code into kernel work.
3. The interaction flow is simple at a high level, but important:
	1. An application requests a service
	2. The request enters through a system call
	3. The kernel receives and analyses the request
	4. The kernel checks permissions
	5. If allowed, the kernel performs the operation
	6. The kernel interacts with hardware or resources if needed
	7. The kernel returns a result when necessary

## User Mode and Kernel Mode

1. The boundary between user mode and kernel mode protects the system.
2. User Mode
	1. Normal applications run in user mode with limited privileges 
3. Kernel Mode
	1. Trusted kernel code runs in kernel mode with high privilege.

## OS vs Kernel

1. The kernel and the full operating system are related, but they are not exactly the same.
2. The kernel is the privileged core. It exposes system calls and performs the central protected work of the system.
3. A full operating system includes the kernel plus user-space components that make the system usable.
4. User space components include
	1. System Programs
	2. Services
	3. Utilities
	4. Libraries
	5. etc
5. Linux is a kernel, while Ubuntu is full linux-based OS distribution