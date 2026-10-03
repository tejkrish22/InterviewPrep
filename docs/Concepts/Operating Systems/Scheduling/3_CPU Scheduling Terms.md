## Core Metrics & Equations

| Metric | Full Name | Formula / Definition | Goal |
| :--- | :--- | :--- | :--- |
| **AT** | Arrival Time | Clock time when process enters the Ready Queue | N/A |
| **BT** | Burst Time | Total CPU execution time required by the process | N/A |
| **CT** | Completion Time | Clock time when process finishes execution | Minimize |
| **TAT** | Turnaround Time | $\text{TAT} = \text{CT} - \text{AT}$ (Total time in system) | Minimize |
| **WT** | Waiting Time | $\text{WT} = \text{TAT} - \text{BT}$ (Time spent waiting in Ready Queue) | Minimize |
| **RT** | Response Time | $\text{RT} = \text{Time of First CPU Execution} - \text{AT}$ | Minimize |
| **Throughput** | Throughput | $\text{Throughput} = \frac{\text{Completed Processes}}{\text{Total Time}}$ | Maximize |

---

## Preemptive vs. Non-Preemptive Scheduling

| Property | Non-Preemptive | Preemptive |
| :--- | :--- | :--- |
| **CPU Control** | Process holds CPU until it voluntarily blocks (I/O) or terminates | OS forcibly interrupts running process via timer interrupt / priority |
| **Context Switch Overhead** | Low (only switches when process yields) | Higher (frequent context switches) |
| **Response Time** | Poor for interactive jobs (short jobs can wait behind long jobs) | Excellent for interactive / time-sharing systems |
| **Algorithms** | FCFS, SJF, HRRN | SRTF, Round Robin, Preemptive Priority, MLFQ |

---

## Workload Types

1. **CPU-Bound Workload:** Characterized by long CPU bursts and rare I/O requests (e.g., video encoding, matrix multiplication).
2. **I/O-Bound Workload:** Characterized by short CPU bursts and frequent I/O waits (e.g., text editor, web browser, database queries).

---

## Master Algorithm Comparison Matrix

| Algorithm | Type | Selection Criteria | Strengths | Drawbacks | Best Used For |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FCFS** | Non-Preemptive | Arrival Time (FIFO) | Simple, zero scheduling overhead | **Convoy Effect** (long job blocks short jobs) | Batch systems with uniform burst lengths |
| **SJF** | Non-Preemptive | Shortest CPU Burst | **Provably Optimal** for minimum avg waiting time | Needs future burst prediction, **Starvation** of long jobs | Long batch workloads with known burst times |
| **SRTF** | Preemptive | Shortest Remaining Time | Minimizes waiting time dynamically | High context switch overhead, **Starvation** | Interactive systems with burst estimation |
| **HRRN** | Non-Preemptive | Highest Response Ratio $RR = 1 + \frac{WT}{BT}$ | Solves SJF starvation using **Aging** | Requires burst time estimation | Mitigating starvation without preemption |
| **Round Robin (RR)** | Preemptive | Time Quantum ($q$) + FIFO | Excellent **Response Time**, Fair execution | High overhead if $q$ is too small; becomes FCFS if $q \to \infty$ | Time-sharing / Interactive user OS |
| **Priority** | Preemptive / Non-Preemptive | Highest Priority Rank | Flexible execution for critical tasks | **Starvation** of low-priority jobs (Fixed by **Aging**) | Real-time & embedded systems |
| **MLQ** | Static Preemptive | Multiple Fixed Queues | Separates foreground (interactive) & background (batch) jobs | Rigid (no queue movement), **Starvation** of low queues | Systems with fixed, distinct job classes |
| **MLFQ** | Dynamic Preemptive | Dynamic Queue Feedback | Learns process behavior adaptively without prior BT info | Complex parameter tuning ($q$, boost interval) | General-purpose modern OS (Linux, Windows) |

---

## Critical Interview Concepts & Edge Cases

1. **Convoy Effect:** Occurs in FCFS when a CPU-bound process occupies the CPU, forcing many short I/O-bound processes to wait in the Ready Queue.
2. **Starvation vs. Deadlock:**
   - **Starvation:** Indefinite delay of a low-priority process because higher-priority jobs keep arriving (Solvable via **Aging**).
   - **Deadlock:** Permanent block where 2+ processes wait for resources held by each other (No progress possible).
3. **Aging:** Technique to prevent starvation by gradually increasing the priority (or response ratio) of a process the longer it waits in the Ready Queue.
4. **Round Robin Time Quantum ($q$) Extremes:**
   - If $q \to \infty$: Round Robin degenerates into **FCFS**.
   - If $q \to 0$: CPU spends all its time on **Context Switching Overhead** (thrashing) rather than executing process instructions.

---

## Gantt Chart Calculation Example

A Gantt chart is a timeline displaying CPU allocation per process over time.

![[gantt_chart.png]]

**Example Metrics Calculation for P1:**
- **Arrival Time (AT):** 2
- **First Execution Time:** 5
- **Completion Time (CT):** 11
- **Burst Time (BT):** $(7 - 5) + (11 - 9) = 4$
- **Turnaround Time (TAT):** $\text{CT} - \text{AT} = 11 - 2 = 9$
- **Waiting Time (WT):** $\text{TAT} - \text{BT} = 9 - 4 = 5$
- **Response Time (RT):** $\text{First Execution} - \text{AT} = 5 - 2 = 3$
