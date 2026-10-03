> A preemptive algo similar FCFS in queue order, that allows a process to take CPU only for fixed time quantum.

## Properties

1. Process are allowed for only fixed time quantum
2. Preemption
3. Time quantum is inversely proportional to overhead
4. Improves response time.

## Problems

1. Performance depends on value of time quantum
2. Too many context switches
3. Can worsen the turn around time

## Example

- Given Process

| Process | AT  | BT  |
| ------- | --- | --- |
| P1      | 0   | 0   |
| P2      | 1   | 5   |
| P3      | 2   | 8   |
| P4      | 3   | 4   |
- Gantt Chart

| P1 (0-4) | P2 (4-8) | P3 (8-12) | P4 (12-16) | P1 (16-20) | P2 (20-21) | P3 (21-25) | P1 (25-27) |
| -------- | -------- | --------- | ---------- | ---------- | ---------- | ---------- | ---------- |

- Metrics

| Process | AT  | BT  | First | CT  | TAT   | WT  | RT  |
| ------- | --- | --- | ----- | --- | ----- | --- | --- |
| P1      | 0   | 0   | 0     | 27  | 27    | 17  | 0   |
| P2      | 1   | 5   | 4     | 21  | 20    | 15  | 3   |
| P3      | 2   | 8   | 8     | 25  | 23    | 15  | 6   |
| P4      | 3   | 4   | 12    | 16  | 13    | 9   | 9   |
| Average |     |     |       |     | 20.75 | 14  | 4.5 |
