> Priority scheduling is a CPU scheduling approach where the scheduler prefers the highest-priority ready process whenever it has to make a decision.

## Properties

1. Can be both preemptive and non-preemptive, depends on system.
2. Order of priority can also vary
3. Can include aging factor to avoid starvation; by gradually increasing the priority of the process as their waiting time increases.

## Problems

1. Starvation: Low-priority processes may wait indefinitely if higher-priority jobs keep arriving.
2. Priority Inversion: A high-priority process may be blocked by a lower-priority process holding a required resource.
3. Difficult Priority Assignment: Choosing appropriate priority values can be challenging.

## Example

- Given Processes

| Process | AT  | BT  | Priority |
| ------- | --- | --- | -------- |
| P1      | 0   | 8   | 3        |
| P2      | 1   | 4   | 1        |
| P3      | 2   | 9   | 4        |
| P4      | 3   | 5   | 2        |
| P5      | 7   | 2   | 1        |

- Gantt Chart

| P1 (0-8) | P2 (8-12) | P5 (12-14) | P4 (14-19) | P3 (19-28) |
| -------- | --------- | ---------- | ---------- | ---------- |

- Metrics

| Process | AT  | BT  | CT  | TAT | WT  | RT  |
| ------- | --- | --- | --- | --- | --- | --- |
| P1      | 0   | 8   | 8   | 8   | 0   | 0   |
| P2      | 1   | 4   | 12  | 11  | 7   | 7   |
| P3      | 2   | 9   | 28  | 26  | 17  | 17  |
| P4      | 3   | 5   | 19  | 16  | 11  | 11  |
| P5      | 7   | 2   | 14  | 7   | 5   | 5   |
