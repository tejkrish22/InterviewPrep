> Shortest Remaining Time First scheduler, at every arrival or scheduling decision, SRTF runs the process with the least remaining CPU time.

## Properties

1. Preemptive
2. Better than SJF, as SJF cannot react when a shorted job arrives after a long job starts.
3. SRTF improves average waiting time, turn around time than SJF

## Problems

1. Need Context Switching due to preemption
2. Need Burst time info
3. Long jobs can starve

## Example

- Gives processes

| Process | AT  | BT  |
| ------- | --- | --- |
| P1      | 0   | 8   |
| P2      | 1   | 4   |
| P3      | 2   | 9   |
| P4      | 3   | 5   |
| P5      | 7   | 2   |

- Gantt Chart

| P1 (0-1) | P2 (1-5) | P4 (5-7) | P5 (7-9) | P4 (9-12) | P1 (12-19) | P3 (19-28) |
| -------- | -------- | -------- | -------- | --------- | ---------- | ---------- |

- Metrics

| Process | AT  | BT  | First | CT  | TAT | WT  | RT  |
| ------- | --- | --- | ----- | --- | --- | --- | --- |
| P1      | 0   | 8   | 0     | 19  | 19  | 11  | 0   |
| P2      | 1   | 4   | 1     | 5   | 4   | 0   | 0   |
| P3      | 2   | 9   | 19    | 28  | 26  | 17  | 17  |
| P4      | 3   | 5   | 5     | 12  | 9   | 4   | 2   |
| P5      | 7   | 2   | 7     | 9   | 2   | 0   | 0   |
| Average |     |     |       |     | 12  | 6.4 | 3.8 |


