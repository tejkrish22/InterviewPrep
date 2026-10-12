## Overview

An **Operating System (OS)** is system software that sits between user applications and hardware.

- **High-Yield Definition:** *"An OS abstracts hardware complexity, manages shared resources (CPU, Memory, I/O), and enforces process protection and security."*
- **Core Mental Model:** **Applications request** $\to$ **OS checks, manages, and executes**.

---

## 3 Core Roles of an OS

| Role | Primary Function | Key Responsibilities |
| :--- | :--- | :--- |
| **1. Resource Manager** | Fairly allocates finite hardware resources | CPU scheduling, RAM allocation, I/O queueing |
| **2. Abstraction Layer** | Hides raw hardware complexity | Exposes `Process`, `File`, `Socket`, `Virtual Memory` |
| **3. Guard (Protection)** | Prevents process interference & unauthorized access | Memory isolation, privilege checks via **System Calls** |

---

## OS vs. Kernel

| Component | Definition | Includes / Responsibilities |
| :--- | :--- | :--- |
| **Kernel** | The core, **privileged** engine operating in Kernel Mode | CPU scheduling, memory management, device drivers, system call handling |
| **Operating System** | The complete software platform (Kernel + Userland tools) | Kernel + **Shell**, **System Services/Daemons**, **Libraries** (libc/Win32), **Utilities** |

---

## Key OS Abstractions

| Abstraction | Low-Level Hardware Reality | OS Abstraction Provided |
| :--- | :--- | :--- |
| **Process** | Program Code & Registers | Isolated running program instance |
| **Thread** | Execution Stream on Core | Execution path *within* a process |
| **Virtual Memory** | Physical RAM & Swap Disk | Private, contiguous address space per process |
| **File** | Disk Sectors / Flash Blocks | Named, persistent, structured storage object |
| **Socket** | Network Interface Card (NIC) | Network communication endpoint |
| **System Call** | CPU Interrupt / Software Trap | Controlled transition from **User Mode** $\to$ **Kernel Mode** |

---

## Boot Sequence & Bare Metal

### System Boot Lifecycle

$$\text{Firmware (BIOS/UEFI)} \longrightarrow \text{Bootloader (GRUB)} \longrightarrow \text{OS Kernel loaded to RAM} \longrightarrow \text{Userland Init}$$

1. **Firmware (BIOS/UEFI):** Hardware POST (Power-On Self-Test) & boot device selection.
2. **Bootloader:** Bare-metal code that loads the OS kernel into memory and yields control.
3. **OS Kernel:** Initializes memory, hardware drivers, and spawns the first userland process (`init`/`systemd`).

### Bare Metal Software

- **Definition:** Programs executing directly on hardware **without an OS** (e.g., BIOS/UEFI, bootloaders, microcontrollers).
- **Trade-offs:** Total hardware control and zero overhead, but **loses** memory protection, process isolation, standard APIs, and multitasking.

---

## Interview Quick Answers

| Question | Low-Yield Answer (Avoid) | High-Yield Answer (Use) |
| :--- | :--- | :--- |
| **What is an OS?** | *"An interface between user and hardware."* | *"An OS abstracts hardware, manages CPU/RAM resources, and enforces protection between processes."* |
| **Is OS = Kernel?** | *"Yes, they are identical terms."* | *"No. The kernel is the privileged core engine; the OS is the complete OS environment including shell, libraries, and utilities."* |
| **Can code run without OS?** | *"No, all software requires an OS."* | *"Yes. Bare metal software (firmware, bootloaders, embedded systems) runs directly on hardware."* |
