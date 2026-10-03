
## Preemptive and Non-Preemptive Scheduling

| Non-Preemptive                                        | Preemptive                                      |
| ----------------------------------------------------- | ----------------------------------------------- |
| 1. OS does not forcibly interrupt the running process | 1. OS can interrupt the running process         |
| 2. Lower Overhead                                     | 2. Higher overhead because of context switching |
| 3. Ex: FCFS, SJF, HRRN                                | 3. SRTF, Round Robin etc                        |
## Workload Types

1. CPU-Bound Workload
	1. A CPU-bound workload has long CPU bursts. 
	2. A CPU burst is the continuous period during which a process uses the CPU before it blocks, gets preempted, or finishes.
2. I/O-Bound Workload
	1. An I/O-bound workload has short CPU bursts and frequent waiting. 
	2. Such a process often waits for events instead of continuously using the CPU.

## Scheduling Metrics

Scheduling algorithms are compared using metrics. These metrics help evaluate whether an algorithm is good for a particular workload and goal.

1. **Arrival Time (AT)** - Time at which process enters the ready queue
2. **Burst Time (BT)** - Total CPU time taken by the process
3. **Completion Time (CT)** - Time at which process finished execution
4. **Turn Around Time (TAT)** - Total time taken from arrival to completion `(CT - AT)`
5. **Waiting Time (WT)** - Total time the process spends waiting in ready queue `(TAT - BT)`
6. **Response Time (RT)** - Time taken for the process since arrival to get the CPU for the first time
7. **Throughput** - Number of process completed per unit time

## Gantt Chart

> A Gantt chart is a timeline that shows which process gets the CPU and for how long.

![[gantt_chart.png]]
For P1 the given values are
1. Arrival Time = 2
2. First CPU usage = 5
3. Completion time = 11
4. Response Time = 5 - 2 = 3
5. Turn Around Time = 11 - 2 = 9
6. Burst Time = (7-5) + (11-9) = 4
7. Waiting Time = 9 - 4 = 5

