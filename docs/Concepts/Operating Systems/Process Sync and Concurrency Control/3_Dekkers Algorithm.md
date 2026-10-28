## Intro

1. Dekker's algorithm is an early software-only mutual exclusion solution.
2. It uses shared variables rather than special atomic hardware instructions.
3. Its value is conceptual: it shows how difficult mutual exclusion is without hardware support and acts as a bridge from critical-section theory to Peterson's cleaner algorithm.

## Problem Setup

1. There are two processes, P0 and P1, and both may want to enter the critical section.
2. The algorithm uses shared indicators to represent interest and priority.
	1. `flag[0]` : shows that P0 wants to enter
	2. `flag[1]` : shows that P1 wants to enter
	3. `turn` : Decides priority when both processes want to enter.
3. The turn variable works as a shared tie-breaker. If turn is 0, P0 gets priority; if turn is 1, P1 gets priority.

## Goal of the Algorithm

The algorithm must satisfy the three critical section requirements:

1. **Mutual Exclusion** : Both processes should not be inside the critical section together.
2. **Progress** : If entry is possible, the system should not postpone entry forever.
3. **Bounded waiting** : One waiting process should not be bypassed forever.

## Assumptions

1. **Atomic reads and writes:** A shared-variable read or write is treated as one indivisible action.
2. **Expected memory order:** Memory operations are assumed to appear in the order the algorithm expects.
3. **Two-process scope:** The algorithm is designed for two processes, not directly for many.

## Code

### Shared State

```c
// Shared variables between P0 and P1
bool flag[2] = {false, false}; // flag[i] = true indicates Pi wants to enter critical section
int turn = 0;                  // Tie-breaker: 0 prioritizes P0, 1 prioritizes P1
```

### Process 0 (`P0`)

```c
do {
    // --- ENTRY SECTION ---
    flag[0] = true; // 1. Signal intent to enter critical section

    // 2. While Process 1 also wants to enter, resolve contention
    while (flag[1]) {
        if (turn != 0) {
            // Priority belongs to P1; temporarily withdraw P0's intent to prevent deadlock
            flag[0] = false;

            // Busy-wait until turn is handed back to P0
            while (turn != 0) {
                // busy wait
            }

            // Re-assert intent to enter
            flag[0] = true;
        }
    }

    // --- CRITICAL SECTION ---
    // Safe access to shared resources
    // ------------------------

    // --- EXIT SECTION ---
    turn = 1;       // Pass priority to P1
    flag[0] = false; // Relinquish interest

    // --- REMAINDER SECTION ---
    // Non-critical operations
    // -------------------------
} while (true);
```

### Process 1 (`P1`)

```c
do {
    // --- ENTRY SECTION ---
    flag[1] = true; // 1. Signal intent to enter critical section

    // 2. While Process 0 also wants to enter, resolve contention
    while (flag[0]) {
        if (turn != 1) {
            // Priority belongs to P0; temporarily withdraw P1's intent to prevent deadlock
            flag[1] = false;

            // Busy-wait until turn is handed back to P1
            while (turn != 1) {
                // busy wait
            }

            // Re-assert intent to enter
            flag[1] = true;
        }
    }

    // --- CRITICAL SECTION ---
    // Safe access to shared resources
    // ------------------------

    // --- EXIT SECTION ---
    turn = 0;       // Pass priority to P0
    flag[1] = false; // Relinquish interest

    // --- REMAINDER SECTION ---
    // Non-critical operations
    // -------------------------
} while (true);
```

## How It Satisfies the Requirements

1. **Mutual Exclusion:**
   - A process only enters the critical section when either the other process is not interested (`flag[other] == false`) or the other process has backed off (`flag[other] = false`) while waiting for its turn.
   - It is impossible for both `flag[0]` and `flag[1]` to be `true` and both to exit the outer `while` loop simultaneously.

2. **Progress:**
   - If only one process requests entry (`flag[i] == true`, `flag[other] == false`), the `while (flag[other])` loop terminates immediately, and the process enters without delay.
   - If both processes request entry simultaneously, contention is broken deterministically by `turn`. The process not favored by `turn` temporarily resets its `flag` to `false`, allowing the favored process to exit its `while` loop and proceed. Thus, deadlock is prevented.

3. **Bounded Waiting:**
   - When a process exits the critical section, it explicitly assigns `turn` to the other process (`turn = other`).
   - A waiting process is guaranteed priority on the very next attempt and cannot be starved indefinitely.
