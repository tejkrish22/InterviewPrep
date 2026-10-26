## What is Critical Section?

1. A critical section is the code region that accesses shared state and must be protected.
2. It is dangerous because interleaving inside this region can break correctness.
3. Structure
	1. Entry Section: Ask permission
	2. Critical Section: Access shared data
	3. Exit Section: Release Permission
	4. Remainder Section: Normal code

## Mutual Exclusion

1. Mutual exclusion means at most one thread is inside the critical section at a time.
2. Threads exclude each other from entering the protected region together.
3. Mutual exclusion is the first requirement of the critical-section problem.
4. However, mutual exclusion alone is not the full solution. A correct critical-section solution also needs progress and bounded waiting.

## Progress

1. Progress means entry should not be postponed forever when the critical section is free and threads want to enter.
2. Progress protects system movement. The system should keep moving when it can.

## Bounded Waiting

1. Bounded waiting means a waiting thread should not be skipped forever.
2. Bounded waiting protects fairness.
3. One waiting thread should not be bypassed endlessly.

## Atomicity and Invariants

1. Atomicity means a group of operations appears indivisible.
2. An invariant is a rule that should always remain true for shared state

## Common Mistakes

1. Protecting only write operations -> read also requires protection
2. Making critical section too large -> reduces concurrency
3. Making critical section too small -> can break correctness
4. Locking every variable -> Immutable / private data need no synchronisation.
