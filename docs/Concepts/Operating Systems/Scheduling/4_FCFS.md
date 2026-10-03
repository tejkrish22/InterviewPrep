> The process that arrives first gets the CPU first.

## Properties

1. Non-preemptive
2. FIFO like
3. Low scheduling overhead

## Problem

1. Convoy Effect : A long job at the front makes many short jobs wait.

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

| P1 (0-8) | P2 (8-12) | P3 (12-21) | P4 (21-26) | P5 (26-28) |
| -------- | --------- | ---------- | ---------- | ---------- |
- Final Results

| Process  | CT  | TAT  | WT   | RT   |     |
| -------- | --- | ---- | ---- | ---- | --- |
| P1       | 8   | 8    | 0    | 0    |     |
| P2       | 12  | 11   | 7    | 7    |     |
| P3       | 21  | 19   | 10   | 10   |     |
| P4       | 26  | 23   | 18   | 18   |     |
| P5       | 28  | 21   | 19   | 19   |     |
| Averages |     | 16.4 | 10.8 | 10.9 |     |
