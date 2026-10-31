## Intro

1. [[4_Petersons Algorithm]] solves mutual exclusion for two processes, but real systems may have many processes or threads competing, so two-process logic is not enough for every case.
2. The Bakery algorithm is a classic software solution for `n` processes.
3. Its central idea is simple: a process takes a ticket, waits behind earlier tickets, enters the critical section, and clears its ticket on exit.

## Share Variables

1. The Bakery algorithm uses two shared arrays: `choosing[n]` and `number[n]`.
2. `choosing[i] = true`: Process i is currently picking a ticket.
3. `number[i] = 0`: Process i does not want to enter.
4. `number[i] > 0`: Process i has a ticket.
5. Ticket value: A new ticket is chosen as `1 + max(number[])`, using the current tickets visible to the process.
6. The `number` array stores the ticket. Every process can see every other process's ticket and compare priority pairs.
7. A process with smaller ticket has higher priority, if two process have same ticket number then tie broken in favour of smaller PID.

## Code

### Shared State

```c
// Shared variables — visible to all n processes
bool choosing[n] = {false}; // choosing[i] = true while Pi is picking a ticket
int  number[n]   = {0};     // number[i] = 0  → Pi not interested
                             // number[i] > 0  → Pi holds a ticket
```

### Process $P_i$

```c
do {
    // --- ENTRY SECTION ---
    choosing[i] = true;                                    // about to pick a ticket
    number[i] = 1 + max(number[0], ..., number[n-1]);     // take a ticket
    choosing[i] = false;                                   // done picking

    for (int j = 0; j < n; j++) {
        if (j == i) continue;
        while (choosing[j]);                               // wait if Pj is mid-pick
        while (number[j] != 0 &&                          // wait if Pj has a ticket
              (number[j] < number[i] ||                   //   AND smaller ticket
              (number[j] == number[i] && j < i)));        //   OR same ticket but lower PID
    }

    // --- CRITICAL SECTION ---

    // --- EXIT SECTION ---
    number[i] = 0; // give up ticket

    // --- REMAINDER SECTION ---
} while (true);
```

## How It Satisfies the Requirements

1. **Mutual Exclusion:**
   - Suppose $P_i$ and $P_j$ are both in the critical section. For $P_i$ to have passed its inner `while` for $j$, it must have seen `number[j] == 0` OR `BEFORE(i, j)` was true (meaning $P_i$ had higher priority). But the same logic applies symmetrically to $P_j$ — it would have waited for $P_i$. Since `BEFORE` is a strict total order, both cannot simultaneously have higher priority over each other. Contradiction. ∴ mutual exclusion holds.

2. **Progress:**
   - A process with no ticket (`number[i] == 0`) never blocks anyone. The process holding the smallest `(number, pid)` pair — a strict minimum — will not be blocked by any other process's inner `while`, so it always enters. No circular waiting is possible under a total order.

3. **Bounded Waiting:**
   - When $P_i$ picks ticket $k$, every process that picks a ticket later gets $k$ or higher (only concurrent pickers may also get $k$, but are then ordered by PID). So $P_i$ waits behind at most the processes that had tickets before it entered the choosing phase — a finite bound.

## Why Two `while` Loops per Peer?

| Loop | Guards against |
|------|----------------|
| `while (choosing[j])` | Reading `number[j]` mid-write — the value could be 0 (not yet assigned) when it will shortly be non-zero. Without this guard we might wrongly skip a process that is about to get a smaller ticket. |
| `while (number[j] != 0 && BEFORE(j, i))` | Correctly yielding to a process that has a valid ticket with higher priority (lower `(number, pid)`). |

## Comparison with Peterson's

| Property | Peterson's | Bakery |
|----------|-----------|--------|
| Processes supported | 2 | n (any number) |
| Shared variables | `flag[2]`, `turn` | `choosing[n]`, `number[n]` |
| Tie-breaking | `turn` variable | `(number, pid)` lexicographic order |
| Busy-wait loops | 1 per process | 2 per peer process |
| Ticket overflow? | N/A | Possible in theory (unbounded tickets); handled with modular arithmetic in practice |
