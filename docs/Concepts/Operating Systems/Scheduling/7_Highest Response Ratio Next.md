> Non-preemptive CPU scheduling algo that chooses the ready process with the highest response ratio.

## Properties

1. Non-preemptive
2. `Response Ratio = 1 + (waiting time / burst time) 
3. As waiting time increases, the response ratio increases. This is the aging effect: a process that waits longer gets a higher chance of being selected.
4. Addresses the weakness of SJF.

## Problems

1. Requires burst time
2. Non-preemptive
3. Recalculates ration every time

## Example

- Given Processes

| Process | AT  | BT  |
| ------- | --- | --- |
| P1      | 0   | 8   |
| P2      | 1   | 4   |
| P3      | 2   | 9   |
| P4      | 3   | 5   |
| P5      | 7   | 2   |
- Gantt Chart

| P1 (0-8) | P2 (8-12) | P5 (12-14) | P4 (14-19) | P3 (19--28) |
| -------- | --------- | ---------- | ---------- | ----------- |
- Metrics

| Process | AT  | BT  | CT  | TAT | WT  | RT  |
| ------- | --- | --- | --- | --- | --- | --- |
| P1      | 0   | 8   | 8   | 8   | 0   | 0   |
| P2      | 1   | 4   | 12  | 11  | 7   | 7   |
| P3      | 2   | 9   | 28  | 26  | 17  | 17  |
| P4      | 3   | 5   | 19  | 16  | 11  | 11  |
| P5      | 7   | 2   | 14  | 7   | 5   | 5   |
