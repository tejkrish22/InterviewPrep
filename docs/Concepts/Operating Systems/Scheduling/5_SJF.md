> Shortest Job First scheduling runs the smallest CPU burst process first, among the available processes

## Properties

1. Non-preemptive
2. Solves the convoy problem of FCFS
3. Improved average waiting time, turn around time

## Problem

1. Need to know or predict the CPU burst time of each process
2. Long process can starve

## Example

- Given Process

| Process | AT  | BT  |
| ------- | --- | --- |
| P1      | 0   | 8   |
| P2      | 1   | 4   |
| P3      | 2   | 9   |
| P4      | 3   | 5   |
| P5      | 7   | 2   |
- Gantt Chart

| P1 (0-8) | P5 (8-10) | P2 (10-14) | P4 (14-19) | P3 (19-28) |
| -------- | --------- | ---------- | ---------- | ---------- |


- Metrics

| Process | AT  | BT  | First Start | CT  | TAT  | WT  | RT  |
| ------- | --- | --- | ----------- | --- | ---- | --- | --- |
| P1      | 0   | 8   | 0           | 8   | 8    | 0   | 0   |
| P2      | 1   | 4   | 10          | 14  | 13   | 9   | 9   |
| P3      | 2   | 9   | 19          | 28  | 26   | 17  | 17  |
| P4      | 3   | 5   | 14          | 19  | 16   | 11  | 11  |
| P5      | 7   | 2   | 8           | 10  | 3    | 1   | 1   |
| Average |     |     |             |     | 13.2 | 7.6 | 7.6 |
