## What is Thread Pool ?

1. A thread pool is a group of reusable worker threads.
2. The application submits tasks into a task queue, and worker threads take tasks from that queue when they become available.
3. thread pool = workers + queue + limits

## Why Thread Pools Exist ?

1. Creating a thread is lighter than creating a process, but it is still not free.
2. Because every thread creation involves extra overhead like configuring stack memory etc.
3. Under high traffic, the one-thread-per-request approach can create too many threads.
4. That can increase memory usage, context switching, contention, and latency instability.
5. A thread pool solves this by reusing a controlled number of workers.

## How Thread Pools help servers ?

1. Imagine 500 tasks are requested to be deployed and the machine gets overwhelmed.
2. With a thread pool, the server may have only 32 workers. In that case, only 32 tasks execute at once, and the remaining requests wait in a queue.

## Important Thread Pool Settings

1. Pool Size - decides how many worker threads
	1. If too small then CPU underuse and high waiting time
	2. If too high then more overhead and context switch
2. Queue Limit - decides size of the queue
3. Shutdown Behaviour - decides how the pools stops
4. Rejection Policy - decides what happens when the pool is overloaded.
5. Core Size  - minimum number of always-ready workers
6. Maximum Size - upper limit of workers that can be created
7. Keep-Alive - idle time after which the worker may be killed

## Queueing and BackPressure

1. A thread pool still needs queue control.
2. The pool size controls how much work runs, while the queue size controls how much work waits.
3. If the queue is unbounded, waiting work can grow forever.
4. BackPressure Controls
	1. Bounded Queues
	2. Timeouts
	3. Rejection
	4. Rate Limiting
	5. Load shedding
