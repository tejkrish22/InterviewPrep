> Instead of keeping every ready process in one queue, MLQ splits the ready queue into multiple fixed queues. Each queue represents a known class of work.

## Properties

1. Ready queue is divided into multiple fixed shares
2. MLQ schedules by queue priority first, and then by the policy inside that queue.

## Problems

1. Rigid Queue Assignment: Process cannot easily move between queues.
2. Starvation: Lower priority queues may rarely run
3. Incorrect classification: Placing a process in the wrong queue can reduce performance
4. Dynamic adaption is missing

