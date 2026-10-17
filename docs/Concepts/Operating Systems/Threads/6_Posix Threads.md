## Intro

1. POSIX stands for Portable Operating System Interface.
2. Pthreads are POSIX threads: a standard C interface for threaded programming on POSIX systems.

## Lifecycle of  a Real Thread

1. **Main thread starts:** The process begins execution with the main thread.
2. **Main calls create:** The main thread calls `pthread_create` to start another thread.
3. **Worker starts running:** The new worker thread begins executing the function assigned to it.
4. **Main and worker run concurrently:** The main thread and worker thread may execute at the same time logically.
5. **Worker finishes:** The worker returns from its function or calls `pthread_exit`.
6. **Another thread joins:** A thread such as the main thread can call `pthread_join` if the worker is joinable.
7. **Join waits and collects:** The join operation waits for completion and can optionally collect a return value.

After a successful join, the resources associated with the joinable thread can be cleaned correctly. The worker does the work; join ensures that another thread waits and can get the result.

## Core Pthread Functions

1. pthread_create: Creates a new thread and starts it from a function supplied by the programmer.
2. pthread_join: Waits for a joinable thread to finish and can collect the thread’s return value.
3. pthread_detach: Marks a thread so its resources can be cleaned automatically after it finishes; a detached thread cannot be joined later.
4. pthread_self: Gives the current thread ID, whether it is called from the main thread or from another running thread.
5. pthread_exit: Terminates the calling thread from wherever that thread is currently executing.

## Joinable Threads

1. **Waiting:** A joinable thread can be waited for using `pthread_join`.
2. **Completion status:** Joinable mode is useful when another thread must know that the work is done.
3. **Return value:** Join allows another thread to collect the worker thread’s return value.
4. **Resource cleanup:** Resources are fully cleaned after the join completes.
5. If a joinable thread finishes but is never joined, cleanup may remain incomplete. In that case, the system may still retain information about the completed thread.

## Detached Threads

1. **No later join:** A detached thread cannot be joined later.
2. **Fire-and-forget work:** Detach is used when no thread needs to wait for completion or collect a result.
3. **Automatic cleanup:** Detached thread resources can be released automatically after the thread exits.

> The design choice is about ownership of completion. Join when someone waits; detach when no one will wait.
