> MLFQ uses multiple priority queues. Processes can move between these queues depending on how they behave during execution.

## Properties

1. Multiple layers of queues will be present, having top to down priority approach and each queue can have its own policy.
2. For now, the policy is FCFS.
3. New jobs always start in high-priority queue
4. CPU-heavy jobs move down
5. Waiting jobs may be boosted up.
6. Higher queues have smaller time quantum, lower have larger.
7. Higher-priority queues run before lower-priority queues.
8. If a job uses its full time allotment, move it down.
9. These rules works because
	1. Short and interactive jobs get quick response because they begin in the top queue. If they finish quickly, they do not keep getting pushed downward.
	2. CPU-heavy jobs gradually move lower because they keep using their full time allotment. Boosting prevents older jobs from waiting forever.

## Problems

1. Many parameters: Queue levels, time quanta, and boost intervals must be carefully configured.
2. Starvation Without Boosting: Lower-priority queues may wait indefinitely if priorities are never refreshed.

## Example

- Given processes

| Process | AT  | BT  |
| ------- | --- | --- |
| P1      | 0   | 9   |
| P2      | 1   | 4   |
| P3      | 1   | 5   |
| P4      | 2   | 4   |
| P5      | 3   | 2   |
- Gantt chart

| P1 (0-2) | P2 (2-4) | P3 (4-6) | P4 (6-8) | P5 (8-10) | P1 (10-14) | P2 (14-16) | P3 (16- 19) | P4 (19-21) | P1 (21-24) |
| -------- | -------- | -------- | -------- | --------- | ---------- | ---------- | ----------- | ---------- | ---------- |
- Metrics

| Process | AT  | BT  | First | CT  | TAT  | WT   | RT  |
| ------- | --- | --- | ----- | --- | ---- | ---- | --- |
| P1      | 0   | 9   | 0     | 24  | 24   | 15   | 0   |
| P2      | 1   | 4   | 2     | 16  | 15   | 11   | 1   |
| P3      | 1   | 5   | 4     | 19  | 18   | 13   | 3   |
| P4      | 2   | 4   | 6     | 21  | 19   | 15   | 4   |
| P5      | 3   | 2   | 8     | 10  | 7    | 5    | 5   |
| Average |     |     |       |     | 16.6 | 11.8 | 2.6 |
