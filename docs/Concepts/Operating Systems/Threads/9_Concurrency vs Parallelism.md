## Concurrency vs. Parallelism

> *"Concurrency is about **dealing** with lots of things at once. Parallelism is about **doing** lots of things at once."* — Rob Pike

| Feature | Concurrency | Parallelism |
| --- | --- | --- |
| **Definition** | Managing multiple tasks making progress over overlapping time | Executing multiple tasks simultaneously at the exact same physical instant |
| **Hardware Requirement** | Can run on a **single CPU core** (or multiple) | Strictly requires **multiple CPU cores** or processors |
| **Mechanism** | Time-slicing / interleaving or event-driven async I/O | Simultaneous hardware execution across separate cores |
| **Primary Goal** | Responsiveness and efficient resource utilization (preventing idle CPU) | Throughput and pure computation speedup |

---

## Single-Core Concurrency (Time Sharing)

On a machine with only **1 CPU core**, true simultaneous execution is physically impossible. However, the OS achieves concurrency through **Time Sharing (Time Slicing)**:

```text
Time ───>
[ Thread 1: 5ms ] ──> (Context Switch) ──> [ Thread 2: 5ms ] ──> (Context Switch) ──> [ Thread 1: 5ms ]
```

1. **Time Slicing:** The OS scheduler allocates tiny slices of CPU time (e.g., 5–10 milliseconds) to each active thread.
2. **Context Switching:** When a thread's time slice expires or it waits on I/O, the CPU saves its register state, loads another thread's state, and resumes execution.
3. **The Illusion of Multitasking:** Because these switches occur hundreds of times per second, human users perceive music playing, web browsing, and code compiling as happening "at the same time," even though the single core executes only one instruction at any given nanosecond.

---

## Parallelism (Multi-Core Execution)

Parallelism requires **multiple physical CPU cores**. Multiple instructions are executed at the **exact same clock cycle**:

```text
Core 1: [ Thread 1: Compressing Video File ............ ]
Core 2: [ Thread 2: Compiling C++ Code ................ ]
Core 3: [ Thread 3: Calculating Physics Simulation .... ]
```

1. **Hardware Parallelism:** Each thread is assigned to a dedicated physical hardware core.
2. **Zero Time Sharing Needed:** Threads do not compete for CPU cycles or wait for context switches.
3. **Best Suited For:** Heavy CPU-bound workloads (video rendering, matrix math, machine learning training, cryptography).

---

## Concurrency with Async I/O (No Extra Threads Needed)

Concurrency does **not** require creating hundreds of OS threads. In fact, for I/O-heavy applications (web servers, database queries, network APIs), spawning thousands of threads is wasteful because threads spend 99% of their time idle waiting for data.

### The Problem with Blocking I/O

- A CPU instruction takes ~**0.5 nanoseconds**.
- A network packet or database query takes ~**50 milliseconds** (50,000,000 ns).
- If a thread waits synchronously (blocking), the CPU sits idle for millions of cycles doing zero work.

### The Solution: Non-Blocking Event Loop

Instead of blocking a thread, an **Event Loop** registers the I/O task with the OS kernel (via `epoll` on Linux, `kqueue` on macOS) and moves on immediately to process other work.

```text

                    ┌──> 1. Request User Profile (DB query started) ──┐
                    │                                                 │
Client Requests ──> │──> 2. Request Image (Disk read started)         │──> OS Kernel (epoll / kqueue)
                    │                                                 │    (Waits for hardware I/O)
                    └──> 3. Calculate Cart Total (Instant CPU work)   │
                                                                      │
Event Loop ◄────────────────────── [ Event: DB Query Ready! 🔔 ] ─────┘
  │
  └──> Runs callback: Sends User Profile response back to client
```

### Real-World Concrete Example

Consider a single-threaded server (like **Node.js**, **Nginx**, or **Redis**) handling 3 incoming requests:

1. **0.0 ms:** Request A arrives: needs to fetch data from Database (takes 40 ms).
   - Server tells the OS: *"Start this database socket read and buzz me when packets arrive."*
   - Server **does not sleep**; it returns immediately.
2. **0.1 ms:** Request B arrives: needs to calculate `2 + 2`.
   - Server runs computation immediately and responds to Client B within 0.1 ms.
3. **0.2 ms:** Request C arrives: needs to read a file from SSD (takes 10 ms).
   - Server tells OS to read the file asynchronously.
4. **10.2 ms:** OS notifies server: *"File read for Request C is done!"*
   - Event loop picks up the event and sends response to Client C.
5. **40.1 ms:** OS notifies server: *"Database query for Request A is done!"*
   - Event loop picks up the event and sends response to Client A.

**Key Takeaway:** A **single thread** handled 3 overlapping requests concurrently without blocking, without thread contention, and without memory overhead for multiple thread stacks.

---

## Summary Comparison

| Model | Hardware | How It Works | Best For | Examples |
| --- | --- | --- | --- | --- |
| **Time-Sliced Concurrency** | 1 Core | OS rapidly context-switches between threads | Desktop OS multitasking on small chips | Embedded systems, single-core CPUs |
| **True Parallelism** | Multi-Core | Cores run distinct instructions simultaneously | CPU-bound math, video encoding, rendering | C++ multithreading, OpenMP, GPU shaders |
| **Async I/O Concurrency** | 1 Core / Thread | Single event loop multiplexes non-blocking I/O events | High-traffic network servers, web APIs | Node.js, Nginx, Redis, Python `asyncio` |
