## Intro

1. Classic software solution for the critical-section problem between two processes.
2. Uses only shared variables and gives a clean reasoning model for mutual exclusion.
3. Studied after Dekker's algorithm as it keeps the same goal but makes the logic more compact & symmetric.

## Problem and Setup

1. Two processes, `P0` and `P1`, compete for a shared critical section (same problem setup as [[3_Dekkers Algorithm]]).
2. Shared state:
	- `flag[0]`: Indicates `P0` wishes to enter the critical section.
	- `flag[1]`: Indicates `P1` wishes to enter the critical section.
	- `turn`: Tie-breaker variable that determines priority when both processes compete.

## Code

### Shared State

```c
// Shared variables between P0 and P1
bool flag[2] = {false, false}; // flag[i] = true indicates Pi wants to enter critical section
int turn;                      // Specifies whose turn it is if both wish to enter
```

### Process 0 (`P0`)

```c
do {
    // --- ENTRY SECTION ---
    flag[0] = true; // 1. Express intent to enter critical section
    turn = 1;       // 2. Be polite: give priority/turn to P1

    // 3. Busy-wait while P1 is interested AND it is P1's turn
    while (flag[1] && turn == 1) {
        // busy wait (spin)
    }

    // --- CRITICAL SECTION ---
    // Safe access to shared resources
    // ------------------------

    // --- EXIT SECTION ---
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
    flag[1] = true; // 1. Express intent to enter critical section
    turn = 0;       // 2. Be polite: give priority/turn to P0

    // 3. Busy-wait while P0 is interested AND it is P0's turn
    while (flag[0] && turn == 0) {
        // busy wait (spin)
    }

    // --- CRITICAL SECTION ---
    // Safe access to shared resources
    // ------------------------

    // --- EXIT SECTION ---
    flag[1] = false; // Relinquish interest

    // --- REMAINDER SECTION ---
    // Non-critical operations
    // -------------------------
} while (true);
```

### Generalized Process ($P_i$)

For process $P_i$ where the other process is $P_j$ ($j = 1 - i$):

```c
do {
    // --- ENTRY SECTION ---
    flag[i] = true;
    turn = j;
    while (flag[j] && turn == j) {
        // busy wait
    }

    // --- CRITICAL SECTION ---
    // ...

    // --- EXIT SECTION ---
    flag[i] = false;

    // --- REMAINDER SECTION ---
    // ...
} while (true);
```

## How It Satisfies the Requirements

1. **Mutual Exclusion:**
   - For both `P0` and `P1` to be in the critical section simultaneously, both `flag[0]` and `flag[1]` must be `true`.
   - However, `turn` can only hold one value at any moment (either `0` or `1`). Whichever process performed its write to `turn` last will overwrite the previous write, forcing itself to wait in the `while` loop while allowing the other to proceed. Thus, both cannot exit the loop simultaneously.

2. **Progress:**
   - If only one process desires entry (e.g., `flag[0] == true`, `flag[1] == false`), the condition `flag[1] && turn == 1` is immediately `false`, and `P0` enters without obstruction.
   - If both processes request entry concurrently (`flag[0] == true`, `flag[1] == true`), `turn` will be either `0` or `1`. The process favored by `turn` will immediately pass the `while` condition and enter the critical section. No deadlock occurs.

3. **Bounded Waiting:**
   - Once a process (e.g., `P0`) leaves the critical section, it resets `flag[0] = false`, releasing the waiting process (`P1`).
   - Even if `P0` immediately tries to re-enter, it must execute `turn = 1`, explicitly offering priority back to `P1`. Therefore, `P0` can enter at most once before `P1` is granted access.

## Why Peterson's is Cleaner than Dekker's

1. **No nested back-off logic:** Dekker's requires temporarily withdrawing intent (`flag[i] = false`), waiting for `turn`, and re-asserting intent. Peterson's achieves deadlock freedom and priority hand-off in a single, elegant `while (flag[j] && turn == j)` condition.
2. **Symmetric structure:** The entry, exit, and contention-handling structures are identical for both processes.
