---
title: WFH Sprint Nov 20 - Dec 5
description: Day-by-day plan to finish Striver's 180 sheet and the TUF Operating Systems course in two weeks of WFH.
tags:
  - plan
---

## Goal

Finish the **160 remaining problems** of Striver's 180 sheet and **OS Modules 6 to 14** on TUF (111 lessons, 18 quizzes) between Fri Nov 20 and Sat Dec 5, while keeping revision going. Coverage comes first: when time runs out, revision gives way, not new problems.

This note lives in `private/`, so Quartz doesn't publish it. Daily DSA reviews still come from the [[DSA Dashboard]].

---

## Daily Time Budget

| Day type | New DSA | DSA revision | New OS | OS revision | Total |
| --- | --- | --- | --- | --- | --- |
| Weekday (Mon to Fri) | 4 h | 1.5 h | 1.5 h | 30 min | 7.5 h |
| Weekend (Nov 21, 22, 28, 29) | 7 h | 2 h | 2 h | 1 h | 12 h |
| Fri Dec 4 (buffer) | Catch-up only | 6 h | 1.5 h (last OS lessons) | - | 7.5 h |
| Sat Dec 5 (final revision) | - | 8 h | - | 4 h | 12 h |

---

## Rules for These Two Weeks

### New DSA Problems

1. Go in the order listed for the day. It follows the sheet.
2. **Solved before** (marked ♻️): solve cold, 15 minutes max.
3. **New problem**: 2 minutes to name the pattern, then try for **15 minutes**. Stuck: read the editorial or watch the video at 1.5x to 2x, close it, and type it from memory. **Hard stop at 25 minutes** (35 for ⏱️ long ones); never let one problem eat the day.
4. Write a **short note** in `Problems/` (the template fills itself): `pattern`, `SubPattern`, `link`, `trigger`, **Key Insight** and the **optimal code** only. No brute-force write-up.
5. Log it the same day with **Templater: Insert Templates/Review.md**:
	- Solved it yourself within the cap: pick **Clean**. It comes back in 7 days, and you skip tomorrow's review.
	- Needed the editorial or video: pick **Failed**. It comes back tomorrow.

### DSA Revision

1. Open the [[DSA Dashboard]] and work through **Due Today**, oldest first, 10 minutes per problem.
2. Do as many as the revision time allows (about 9 on weekdays and 12 on weekends). Order: yesterday's Failed ones first, then 7-day ones.
3. If Due Today is above 15, run **Templater: Insert Templates/Rebalance Reviews.md** (start tomorrow, cap 5, don't skip Sundays). Leftovers flow into Dec 4 and 5.
4. Reviews will outgrow the time from about Nov 28. That is expected: this sprint trades some revision for coverage. Dec 4 and 5 are mostly revision to make up for it.

### OS

1. Watch at **1.5x** (2x for topics you know). Keep notes short: definitions, one diagram or table, and interview one-liners, in the matching `Concepts/Operating Systems/` folder.
2. OS revision slot: the day's TUF quizzes first, then the listed re-reads. A quiz below 70% means re-watching that topic's weakest lesson.

### Falling Behind

- **Behind on new DSA**: carry the unfinished problems to the next day before its own list. Never skip a module; the Dec 4 buffer absorbs up to about 12 problems.
- **Behind on OS**: drop to 2x speed and skip re-reads for that day. Dec 4 has 1.5 h for leftover lessons.
- **Bad day**: do DSA revision and the new DSA list only. Skip OS for the day and catch up at the weekend.

---

## Overview

| Date | New DSA | New OS | DSA reviews: expected / room for |
| --- | --- | --- | --- |
| Fri Nov 20 | 10: Binary Search | 6 lessons: Module 6 | ~7 / 9 |
| Sat Nov 21 | 16: Binary Search, Sliding Window and Two Pointers, Recursion and Backtracking | 9 lessons: Module 6, Module 7 | ~5 / 12 |
| Sun Nov 22 | 17: Recursion and Backtracking, Linked List | 10 lessons: Module 7, Module 8 | ~8 / 12 |
| Mon Nov 23 | 9: Linked List, Stack and Queues | 6 lessons: Module 8 | ~14 / 9 |
| Tue Nov 24 | 10: Stack and Queues, Greedy Algorithms | 8 lessons: Module 8, Module 9 | ~10 / 9 |
| Wed Nov 25 | 10: Greedy Algorithms, Heaps | 7 lessons: Module 9 | ~5 / 9 |
| Thu Nov 26 | 10: Heaps, Binary Trees | 7 lessons: Module 10 | ~6 / 9 |
| Fri Nov 27 | 11: Binary Trees, Binary Search Trees | 6 lessons: Module 10, Module 11 | ~14 / 9 |
| Sat Nov 28 | 17: Binary Search Trees, Graphs | 8 lessons: Module 11 | ~18 / 12 |
| Sun Nov 29 | 15: Graphs | 8 lessons: Module 12 | ~25 / 12 |
| Mon Nov 30 | 9: Graphs, Dynamic Programming | 7 lessons: Module 12, Module 13 | ~24 / 9 |
| Tue Dec 1 | 9: Dynamic Programming | 7 lessons: Module 13 | ~18 / 9 |
| Wed Dec 2 | 8: Dynamic Programming, Tries | 7 lessons: Module 13 | ~14 / 9 |
| Thu Dec 3 | 9: Strings, Bit Manipulation, Mathematics | 8 lessons: Module 13, Module 14 | ~15 / 9 |
| Fri Dec 4 | Catch-up | 7 lessons: Module 14 | ~15 / 36 |
| Sat Dec 5 | Final revision | OS revision | ~14 / 48 |

Expected reviews assume half of the new problems need the solution on the first try. Use the Dashboard for the real number.

---

## Day by Day

### Fri Nov 20 (Weekday, 7.5 h)

#### DSA Revision (1 h 30 min)

- [ ] Overdue from before the sprint: 4 Sum, Find Minimum in Rotated Sorted Array, Find Peak Element, Find Subarray with Maximum Product, Longest Consecutive Sequence in an Array, Longest subarray with sum K
- [ ] Due today: Merge two sorted arrays without extra space

#### New DSA (10 problems, 4 h)

##### Binary Search

- [ ] [Search in rotated sorted array-II](https://takeuforward.org/practice/dsa/search-in-rotated-sorted-array-2?category=binary-search&source=strivers-180-master-dsa-patterns): Binary Search
- [ ] [Single element in sorted array](https://takeuforward.org/practice/dsa/single-element-in-sorted-array?category=binary-search&source=strivers-180-master-dsa-patterns): Binary Search
- [ ] [Search in 2D matrix - II](https://takeuforward.org/practice/dsa/search-in-2d-matrix-ii?category=binary-search&source=strivers-180-master-dsa-patterns): Binary Search
- [ ] [Find Peak Element - II](https://takeuforward.org/practice/dsa/find-peak-element-ii?category=binary-search&source=strivers-180-master-dsa-patterns): Binary Search
- [ ] [Find Nth root of a number](https://takeuforward.org/practice/dsa/find-nth-root-of-a-number?category=search-on-answer&source=strivers-180-master-dsa-patterns): Search on Answer
- [ ] [Koko eating bananas](https://takeuforward.org/practice/dsa/koko-eating-bananas?category=search-on-answer&source=strivers-180-master-dsa-patterns): Search on Answer
- [ ] [Aggressive Cows](https://takeuforward.org/practice/dsa/aggressive-cows?category=search-on-answer&source=strivers-180-master-dsa-patterns): Search on Answer
- [ ] [Book Allocation Problem](https://takeuforward.org/practice/dsa/book-allocation-problem?category=search-on-answer&source=strivers-180-master-dsa-patterns): Search on Answer
- [ ] [Matrix Median](https://takeuforward.org/practice/dsa/matrix-median?category=search-on-answer&source=strivers-180-master-dsa-patterns): Search on Answer
- [ ] [Kth element of 2 sorted arrays](https://takeuforward.org/practice/dsa/kth-element-of-2-sorted-arrays?category=partition-search&source=strivers-180-master-dsa-patterns): Partition Search
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (6 lessons)

##### Module 6: Process Synchronization and Concurrency Control

- [ ] [Locks, Mutexes, and Types of Locks](https://takeuforward.org/learning/core-subject/locks-mutexes-and-types-of-locks?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (12 min)
- [ ] [Semaphores](https://takeuforward.org/learning/core-subject/semaphores?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (16 min)
- [ ] [Mutex vs Semaphores](https://takeuforward.org/learning/core-subject/mutex-vs-semaphores?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (8 min)
- [ ] [Producer-Consumer Problem](https://takeuforward.org/learning/core-subject/producer-consumer-problem-pre?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (14 min)
- [ ] [Condition Variables in OS](https://takeuforward.org/learning/core-subject/condition-variables-in-os?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (22 min)
- [ ] [Monitoring in OS](https://takeuforward.org/learning/core-subject/monitoring-in-os?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (12 min)

#### OS Revision (30 min)

- [ ] Re-read Module 1 (OS basics): `Concepts/Operating Systems/Intro/` (done before the sprint)

### Sat Nov 21 (Weekend, 12 h)

#### DSA Revision (2 h)

- [ ] Clear Due Today on the Dashboard, up to 12 problems (expected about 5)

#### New DSA (16 problems, 7 h)

##### Binary Search

- [ ] [Median of 2 sorted arrays](https://takeuforward.org/practice/dsa/median-of-2-sorted-arrays?category=partition-search&source=strivers-180-master-dsa-patterns) ⏱️: Partition Search

##### Sliding Window and Two Pointers

- [ ] [Longest Substring Without Repeating Characters](https://takeuforward.org/practice/dsa/longest-substring-without-repeating-characters?category=sliding-window&source=strivers-180-master-dsa-patterns): Sliding Window
- [ ] [Maximum Points You Can Obtain from Cards](https://takeuforward.org/practice/dsa/maximum-points-you-can-obtain-from-cards-?category=sliding-window&source=strivers-180-master-dsa-patterns): Sliding Window
- [ ] [Max Consecutive Ones III](https://takeuforward.org/practice/dsa/max-consecutive-ones-iii?category=sliding-window&source=strivers-180-master-dsa-patterns): Sliding Window
- [ ] [Longest Repeating Character Replacement](https://takeuforward.org/practice/dsa/longest-repeating-character-replacement?category=sliding-window&source=strivers-180-master-dsa-patterns): Sliding Window
- [ ] [Longest Substring With At Most K Distinct Characters](https://takeuforward.org/practice/dsa/longest-substring-with-at-most-k-distinct-characters?category=sliding-window&source=strivers-180-master-dsa-patterns): Sliding Window
- [ ] [Minimum Window Substring](https://takeuforward.org/practice/dsa/minimum-window-substring-?category=sliding-window&source=strivers-180-master-dsa-patterns): Sliding Window
- [ ] [Number of Substrings Containing All Three Characters](https://takeuforward.org/practice/dsa/number-of-substrings-containing-all-three-characters?category=counting-windows&source=strivers-180-master-dsa-patterns): Counting Windows
- [ ] [Binary Subarrays With Sum](https://takeuforward.org/practice/dsa/binary-subarrays-with-sum?category=counting-windows&source=strivers-180-master-dsa-patterns): Counting Windows
- [ ] [Count number of Nice subarrays](https://takeuforward.org/practice/dsa/count-number-of-nice-subarrays?category=counting-windows&source=strivers-180-master-dsa-patterns): Counting Windows

##### Recursion and Backtracking

- [ ] [Power Set](https://takeuforward.org/practice/dsa/power-set?category=subsets-combinations&source=strivers-180-master-dsa-patterns): Subsets & Combinations
- [ ] [Generate Parentheses](https://takeuforward.org/practice/dsa/generate-parentheses?category=subsets-combinations&source=strivers-180-master-dsa-patterns): Subsets & Combinations
- [ ] [Letter Combinations of a Phone Number](https://takeuforward.org/practice/dsa/letter-combinations-of-a-phone-number?category=subsets-combinations&source=strivers-180-master-dsa-patterns): Subsets & Combinations
- [ ] [Combination Sum](https://takeuforward.org/practice/dsa/combination-sum?category=subsets-combinations&source=strivers-180-master-dsa-patterns): Subsets & Combinations
- [ ] [Combination Sum II](https://takeuforward.org/practice/dsa/combination-sum-ii?category=subsets-combinations&source=strivers-180-master-dsa-patterns): Subsets & Combinations
- [ ] [Subsets II](https://takeuforward.org/practice/dsa/subsets-ii?category=subsets-combinations&source=strivers-180-master-dsa-patterns): Subsets & Combinations
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (9 lessons)

##### Module 6: Process Synchronization and Concurrency Control

- [ ] [Readers-Writers Problem](https://takeuforward.org/learning/core-subject/readers-writers-problem?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (20 min)
- [ ] [Sleeping Barber Problem](https://takeuforward.org/learning/core-subject/sleeping-barber-problem?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (12 min)
- [ ] [Dining Philosophers Problem](https://takeuforward.org/learning/core-subject/dining-philosophers-problem?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (13 min)

##### Module 7: Deadlock, Starvation, and Concurrency Bugs

- [ ] [Deadlock in Operating Systems](https://takeuforward.org/learning/core-subject/deadlock-in-operating-systems?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (9 min)
- [ ] [Conditions for Deadlock](https://takeuforward.org/learning/core-subject/conditions-for-deadlock?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (11 min)
- [ ] [Resource Allocation Graph](https://takeuforward.org/learning/core-subject/resource-allocation-graph?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (10 min)
- [ ] [Wait-for Graph, Safe State, and Unsafe State](https://takeuforward.org/learning/core-subject/wait-for-graph-safe-state-and-unsafe-state?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (14 min)
- [ ] [Deadlock Prevention](https://takeuforward.org/learning/core-subject/deadlock-prevention?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (10 min)
- [ ] [Deadlock Avoidance](https://takeuforward.org/learning/core-subject/deadlock-avoidance?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (8 min)

#### OS Revision (60 min)

- [ ] Re-read Module 2 (Process management): `Concepts/Operating Systems/Process Management/` (done before the sprint)
- [ ] [Quiz - Locks and Semaphores](https://takeuforward.org/quiz/core-subject/quiz-locks-and-semaphores?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] [Quiz - Process Synchronization Problems](https://takeuforward.org/quiz/core-subject/quiz-process-synchronization-problems?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (TUF quiz, 30 MCQs)

### Sun Nov 22 (Weekend, 12 h)

#### DSA Revision (2 h)

- [ ] Clear Due Today on the Dashboard, up to 12 problems (expected about 8)

#### New DSA (17 problems, 7 h)

##### Recursion and Backtracking

- [ ] [Palindrome partitioning](https://takeuforward.org/practice/dsa/palindrome-partitioning?category=subsets-combinations&source=strivers-180-master-dsa-patterns): Subsets & Combinations
- [ ] [Word Search](https://takeuforward.org/practice/dsa/word-search?category=backtracking&source=strivers-180-master-dsa-patterns): Backtracking
- [ ] [N Queen](https://takeuforward.org/practice/dsa/n-queen?category=backtracking&source=strivers-180-master-dsa-patterns): Backtracking
- [ ] [Sudoku Solver](https://takeuforward.org/practice/dsa/sudoko-solver?category=backtracking&source=strivers-180-master-dsa-patterns) ⏱️: Backtracking

##### Linked List

- [ ] [Find Middle of Linked List](https://takeuforward.org/practice/dsa/find-middle-of-linked-list?category=fast-slow-pointers&source=strivers-180-master-dsa-patterns): Fast & Slow Pointers
- [ ] [Find the intersection point of Y LL](https://takeuforward.org/practice/dsa/find-the-intersection-point-of-y-ll?category=fast-slow-pointers&source=strivers-180-master-dsa-patterns) ⏱️: Fast & Slow Pointers
- [ ] [Check if LL is palindrome or not](https://takeuforward.org/practice/dsa/check-if-ll-is-palindrome-or-not?category=fast-slow-pointers&source=strivers-180-master-dsa-patterns) ♻️: Fast & Slow Pointers
- [ ] [Detect a loop in LL](https://takeuforward.org/practice/dsa/detect-a-loop-in-ll?category=fast-slow-pointers&source=strivers-180-master-dsa-patterns): Fast & Slow Pointers
- [ ] [Remove Nth node from the back of the LL](https://takeuforward.org/practice/dsa/remove-nth-node-from-the-back-of-the-ll?category=fast-slow-pointers&source=strivers-180-master-dsa-patterns): Fast & Slow Pointers
- [ ] [Find the starting point in LL](https://takeuforward.org/practice/dsa/find-the-starting-point-in-ll?category=fast-slow-pointers&source=strivers-180-master-dsa-patterns): Fast & Slow Pointers
- [ ] [Length of loop in LL](https://takeuforward.org/practice/dsa/length-of-loop-in-ll?category=fast-slow-pointers&source=strivers-180-master-dsa-patterns): Fast & Slow Pointers
- [ ] [Reverse a LL](https://takeuforward.org/practice/dsa/reverse-a-ll?category=reversal-rewiring&source=strivers-180-master-dsa-patterns) ⏱️: Reversal & Rewiring
- [ ] [Merge two Sorted Lists](https://takeuforward.org/practice/dsa/merge-sorted-lists-?category=reversal-rewiring&source=strivers-180-master-dsa-patterns): Reversal & Rewiring
- [ ] [Sort a Linked List of 0's 1's and 2's](https://takeuforward.org/practice/dsa/sort-a-ll-of-0's-1's-and-2's?category=reversal-rewiring&source=strivers-180-master-dsa-patterns): Reversal & Rewiring
- [ ] [Add two numbers in Linked List](https://takeuforward.org/practice/dsa/add-two-numbers-in-ll?category=reversal-rewiring&source=strivers-180-master-dsa-patterns): Reversal & Rewiring
- [ ] [Rotate a LL](https://takeuforward.org/practice/dsa/rotate-a-ll?category=reversal-rewiring&source=strivers-180-master-dsa-patterns): Reversal & Rewiring
- [ ] [Sort LL](https://takeuforward.org/practice/dsa/sort-ll?category=reversal-rewiring&source=strivers-180-master-dsa-patterns): Reversal & Rewiring
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (10 lessons)

##### Module 7: Deadlock, Starvation, and Concurrency Bugs

- [ ] [Banker’s Algorithm](https://takeuforward.org/learning/core-subject/bankers-algorithm-pre?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (20 min)
- [ ] [Deadlock Detection](https://takeuforward.org/learning/core-subject/deadlock-detection?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (17 min)
- [ ] [Deadlock Recovery](https://takeuforward.org/learning/core-subject/deadlock-recovery?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (11 min)
- [ ] [Starvation vs Deadlock vs Livelock](https://takeuforward.org/learning/core-subject/starvation-vs-deadlock-vs-livelock?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (8 min)
- [ ] [Priority Inversion](https://takeuforward.org/learning/core-subject/priority-inversion-pre?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (8 min)
- [ ] [Debugging Concurrency Bugs](https://takeuforward.org/learning/core-subject/debugging-concurrency-bugs?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (8 min)

##### Module 8: System Calls and Inter-Process Communication

- [ ] [System Calls in Operating System](https://takeuforward.org/learning/core-subject/system-calls-in-operating-system?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (12 min)
- [ ] [Types of System Calls](https://takeuforward.org/learning/core-subject/types-of-system-calls?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (6 min)
- [ ] [Traps, Interrupts, and Exceptions](https://takeuforward.org/learning/core-subject/traps-interrupts-and-exceptions?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (11 min)
- [ ] [fork, exec, wait, and exit](https://takeuforward.org/learning/core-subject/fork-exec-wait-and-exit?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (12 min)

#### OS Revision (60 min)

- [ ] Re-read Module 3 (CPU scheduling): `Concepts/Operating Systems/Scheduling/` (done before the sprint)
- [ ] [Quiz - Classical Synchronization Problems](https://takeuforward.org/quiz/core-subject/quiz-classical-synchronization-problems?category=module-6-process-synchronization-and-concurrency-control&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] [Quiz - Deadlocks in Operating Systems](https://takeuforward.org/quiz/core-subject/quiz-deadlocks-in-operating-systems?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (TUF quiz, 30 MCQs)

### Mon Nov 23 (Weekday, 7.5 h)

#### DSA Revision (1 h 30 min)

- [ ] Clear Due Today on the Dashboard, up to 9 problems (expected about 14)

#### New DSA (9 problems, 4 h)

##### Linked List

- [ ] [Clone a LL with random and next pointer](https://takeuforward.org/practice/dsa/clone-a-ll-with-random-and-next-pointer?category=reversal-rewiring&source=strivers-180-master-dsa-patterns) ⏱️: Reversal & Rewiring
- [ ] [Reverse LL in group of given size K](https://takeuforward.org/practice/dsa/reverse-ll-in-group-of-given-size-k?category=reversal-rewiring&source=strivers-180-master-dsa-patterns): Reversal & Rewiring
- [ ] [Flattening of LL](https://takeuforward.org/practice/dsa/flattening-of-ll?category=reversal-rewiring&source=strivers-180-master-dsa-patterns) ⏱️: Reversal & Rewiring

##### Stack and Queues

- [ ] [Next Greater Element](https://takeuforward.org/practice/dsa/next-greater-element?category=monotonic-stack-queue&source=strivers-180-master-dsa-patterns): Monotonic Stack / Queue
- [ ] [Next Greater Element - 2](https://takeuforward.org/practice/dsa/next-greater-element---2?category=monotonic-stack-queue&source=strivers-180-master-dsa-patterns) ⏱️: Monotonic Stack / Queue
- [ ] [Stock span problem](https://takeuforward.org/practice/dsa/stock-span-problem?category=monotonic-stack-queue&source=strivers-180-master-dsa-patterns): Monotonic Stack / Queue
- [ ] [Sum of Subarray Minimums](https://takeuforward.org/practice/dsa/sum-of-subarray-minimums?category=monotonic-stack-queue&source=strivers-180-master-dsa-patterns): Monotonic Stack / Queue
- [ ] [Sum of Subarray Ranges](https://takeuforward.org/practice/dsa/sum-of-subarray-ranges?category=monotonic-stack-queue&source=strivers-180-master-dsa-patterns): Monotonic Stack / Queue
- [ ] [Remove K Digits](https://takeuforward.org/practice/dsa/remove-k-digits?category=monotonic-stack-queue&source=strivers-180-master-dsa-patterns): Monotonic Stack / Queue
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (6 lessons)

##### Module 8: System Calls and Inter-Process Communication

- [ ] [Program Loading, Linking, and Dynamic Libraries](https://takeuforward.org/learning/core-subject/program-loading-linking-and-dynamic-libraries?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (11 min)
- [ ] [Zombie and Orphan Processes](https://takeuforward.org/learning/core-subject/zombie-and-orphan-processes?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (9 min)
- [ ] [Daemon Processes](https://takeuforward.org/learning/core-subject/daemon-processes?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (17 min)
- [ ] [Inter-Process Communication (IPC)](https://takeuforward.org/learning/core-subject/inter-process-communication-ipc?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (7 min)
- [ ] [Pipes and Named Pipes](https://takeuforward.org/learning/core-subject/pipes-and-named-pipes?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (21 min)
- [ ] [Message Queues](https://takeuforward.org/learning/core-subject/message-queues?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (10 min)

#### OS Revision (30 min)

- [ ] Re-read Module 4 (Kernel and OS structures): `Concepts/Operating Systems/Kernel OS Structures and Advanced Scheduling/` (done before the sprint)
- [ ] [Quiz - Deadlock Handling in Operating Systems](https://takeuforward.org/quiz/core-subject/quiz-deadlock-handling-in-operating-systems?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] [Quiz - Deadlock Recovery and Concurrency Issues](https://takeuforward.org/quiz/core-subject/quiz-deadlock-recovery-and-concurrency-issues?category=module-7-deadlock-starvation-and-concurrency-bugs&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] [Quiz - System Calls and Interrupts](https://takeuforward.org/quiz/core-subject/quiz-system-calls-and-interrupts?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (TUF quiz, 30 MCQs)

### Tue Nov 24 (Weekday, 7.5 h)

#### DSA Revision (1 h 30 min)

- [ ] Clear Due Today on the Dashboard, up to 9 problems (expected about 10)

#### New DSA (10 problems, 4 h)

##### Stack and Queues

- [ ] [Sliding Window Maximum](https://takeuforward.org/practice/dsa/sliding-window-maximum?category=monotonic-stack-queue&source=strivers-180-master-dsa-patterns): Monotonic Stack / Queue
- [ ] [Largest rectangle in a histogram](https://takeuforward.org/practice/dsa/largest-rectangle-in-a-histogram?category=monotonic-stack-queue&source=strivers-180-master-dsa-patterns) ⏱️: Monotonic Stack / Queue
- [ ] [Maximum Rectangles](https://takeuforward.org/practice/dsa/maximum-rectangles?category=monotonic-stack-queue&source=strivers-180-master-dsa-patterns): Monotonic Stack / Queue
- [ ] [Implement Min Stack](https://takeuforward.org/practice/dsa/implement-min-stack?category=data-structure-design&source=strivers-180-master-dsa-patterns): Data Structure Design
- [ ] [Asteroid Collision](https://takeuforward.org/practice/dsa/asteroid-collision?category=data-structure-design&source=strivers-180-master-dsa-patterns): Data Structure Design
- [ ] [Celebrity Problem](https://takeuforward.org/practice/dsa/celebrity-problem?category=data-structure-design&source=strivers-180-master-dsa-patterns): Data Structure Design
- [ ] [LRU Cache](https://takeuforward.org/practice/dsa/lru-cache?category=data-structure-design&source=strivers-180-master-dsa-patterns): Data Structure Design
- [ ] [LFU Cache](https://takeuforward.org/practice/dsa/lfu-cache?category=data-structure-design&source=strivers-180-master-dsa-patterns): Data Structure Design

##### Greedy Algorithms

- [ ] [Jump Game - I](https://takeuforward.org/practice/dsa/jump-game---i?category=greedy&source=strivers-180-master-dsa-patterns): Greedy
- [ ] [Valid Parenthesis Checker](https://takeuforward.org/practice/dsa/valid-paranthesis-checker?category=greedy&source=strivers-180-master-dsa-patterns) ♻️: Greedy
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (8 lessons)

##### Module 8: System Calls and Inter-Process Communication

- [ ] [Shared Memory](https://takeuforward.org/learning/core-subject/shared-memory?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (6 min)
- [ ] [Memory-Mapped Files and mmap](https://takeuforward.org/learning/core-subject/memory-mapped-files-and-mmap?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (9 min)
- [ ] [Signals in Operating Systems](https://takeuforward.org/learning/core-subject/signals-in-operating-systems?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (7 min)
- [ ] [Sockets in Operating Systems](https://takeuforward.org/learning/core-subject/sockets-in-operating-systems?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (7 min)
- [ ] [IPC Decision Guide](https://takeuforward.org/learning/core-subject/ipc-decision-guide?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (6 min)

##### Module 9: Memory Management in Operating System

- [ ] [Address Space in Operating System](https://takeuforward.org/learning/core-subject/address-space-in-operating-system?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (13 min)
- [ ] [Stack, Heap, Code, and Data Segments](https://takeuforward.org/learning/core-subject/stack-heap-code-and-data-segments?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (17 min)
- [ ] [Memory Allocation APIs: malloc, free, brk, and mmap](https://takeuforward.org/learning/core-subject/memory-allocation-apis-malloc-free-brk-and-mmap?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (17 min)

#### OS Revision (30 min)

- [ ] Re-read Module 5 (Threads): `Concepts/Operating Systems/Threads/` (done before the sprint)
- [ ] [Quiz - Process System Calls and Program Loading](https://takeuforward.org/quiz/core-subject/quiz-process-system-calls-and-program-loading?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] [Quiz - Daemons and IPC Basics](https://takeuforward.org/quiz/core-subject/quiz-daemons-and-ipc-basics?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] Re-read your Module 6 notes (Process Synchronization and Concurrency Control), 3-day revision

### Wed Nov 25 (Weekday, 7.5 h)

#### DSA Revision (1 h 30 min)

- [ ] Clear Due Today on the Dashboard, up to 9 problems (expected about 5)

#### New DSA (10 problems, 4 h)

##### Greedy Algorithms

- [ ] [Candy](https://takeuforward.org/practice/dsa/candy?category=greedy&source=strivers-180-master-dsa-patterns) ⏱️: Greedy
- [ ] [N meetings in one room](https://takeuforward.org/practice/dsa/n-meetings-in-one-room?category=intervals-scheduling&source=strivers-180-master-dsa-patterns): Intervals & Scheduling
- [ ] [Insert Interval](https://takeuforward.org/practice/dsa/insert-interval?category=intervals-scheduling&source=strivers-180-master-dsa-patterns): Intervals & Scheduling
- [ ] [Non-overlapping Intervals](https://takeuforward.org/practice/dsa/non-overlapping-intervals?category=intervals-scheduling&source=strivers-180-master-dsa-patterns): Intervals & Scheduling
- [ ] [Minimum number of platforms required for a railway](https://takeuforward.org/practice/dsa/minimum-number-of-platforms-required-for-a-railway?category=intervals-scheduling&source=strivers-180-master-dsa-patterns): Intervals & Scheduling
- [ ] [Job sequencing Problem](https://takeuforward.org/practice/dsa/job-sequencing-problem?category=intervals-scheduling&source=strivers-180-master-dsa-patterns): Intervals & Scheduling

##### Heaps

- [ ] [Heapify Algorithm](https://takeuforward.org/practice/dsa/heapify-algorithm?category=heap-priority-queue&source=strivers-180-master-dsa-patterns): Heap / Priority Queue
- [ ] [Build heap from a given Array](https://takeuforward.org/practice/dsa/build-heap-from-a-given-array?category=heap-priority-queue&source=strivers-180-master-dsa-patterns): Heap / Priority Queue
- [ ] [Implement Min Heap](https://takeuforward.org/practice/dsa/implement-min-heap?category=heap-priority-queue&source=strivers-180-master-dsa-patterns): Heap / Priority Queue
- [ ] [K-th Largest element in an array](https://takeuforward.org/practice/dsa/k-th-largest-element-in-an-array?category=heap-priority-queue&source=strivers-180-master-dsa-patterns) ⏱️: Heap / Priority Queue
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (7 lessons)

##### Module 9: Memory Management in Operating System

- [ ] [Logical Address vs. Physical Address and MMU](https://takeuforward.org/learning/core-subject/logical-address-vs-physical-address-and-mmu?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (12 min)
- [ ] [Swapping in Operating System](https://takeuforward.org/learning/core-subject/swapping-in-operating-system?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (15 min)
- [ ] [Contiguous Memory Allocation](https://takeuforward.org/learning/core-subject/contiguous-memory-allocation?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (7 min)
- [ ] [Fixed vs. Variable Partitioning](https://takeuforward.org/learning/core-subject/fixed-vs-variable-partitioning?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (10 min)
- [ ] [First Fit, Best Fit, Worst Fit, and Next Fit](https://takeuforward.org/learning/core-subject/first-fit-best-fit-worst-fit-and-next-fit?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (10 min)
- [ ] [Internal vs. External Fragmentation](https://takeuforward.org/learning/core-subject/internal-vs-external-fragmentation?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (8 min)
- [ ] [Compaction and Buddy System](https://takeuforward.org/learning/core-subject/compaction-and-buddy-system?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (10 min)

#### OS Revision (30 min)

- [ ] Re-read Module 6, first half (Race conditions to hardware sync): `Concepts/Operating Systems/Process Sync and Concurrency Control/` (done before the sprint)
- [ ] [Quiz - IPC Memory and Message Passing](https://takeuforward.org/quiz/core-subject/quiz-ipc-memory-and-message-passing?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] [Quiz - Signals, Sockets, and IPC Choices](https://takeuforward.org/quiz/core-subject/quiz-signals-sockets-and-ipc-choices?category=module-8-system-calls-and-inter-process-communication&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] [Quiz - Process Memory Basics](https://takeuforward.org/quiz/core-subject/quiz-process-memory-basics?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] Re-read your Module 7 notes (Deadlock, Starvation, and Concurrency Bugs), 3-day revision

### Thu Nov 26 (Weekday, 7.5 h)

#### DSA Revision (1 h 30 min)

- [ ] Clear Due Today on the Dashboard, up to 9 problems (expected about 6)

#### New DSA (10 problems, 4 h)

##### Heaps

- [ ] [Find Median from Data Stream](https://takeuforward.org/practice/dsa/find-median-from-data-stream?category=heap-priority-queue&source=strivers-180-master-dsa-patterns): Heap / Priority Queue

##### Binary Trees

- [ ] [Level Order Traversal](https://takeuforward.org/practice/dsa/level-order-traversal?category=bfs&source=strivers-180-master-dsa-patterns): BFS
- [ ] [Maximum Width of BT](https://takeuforward.org/practice/dsa/maximum-width-of-bt?category=bfs&source=strivers-180-master-dsa-patterns): BFS
- [ ] [Right/Left View of BT](https://takeuforward.org/practice/dsa/right-left-view-of-bt?category=bfs&source=strivers-180-master-dsa-patterns): BFS
- [ ] [Top View of BT](https://takeuforward.org/practice/dsa/top-view-of-bt?category=bfs&source=strivers-180-master-dsa-patterns): BFS
- [ ] [Print all nodes at a distance of K in BT](https://takeuforward.org/practice/dsa/print-all-nodes-at-a-distance-of-k-in-bt?category=bfs&source=strivers-180-master-dsa-patterns): BFS
- [ ] [Minimum time taken to burn the BT from a given Node](https://takeuforward.org/practice/dsa/minimum-time-taken-to-burn-the-bt-from-a-given-node?category=bfs&source=strivers-180-master-dsa-patterns): BFS
- [ ] [Vertical Order Traversal](https://takeuforward.org/practice/dsa/vertical-order-traversal?category=bfs&source=strivers-180-master-dsa-patterns): BFS
- [ ] [Print root to leaf path in BT](https://takeuforward.org/practice/dsa/print-root-to-leaf-path-in-bt?category=dfs-tree-dp&source=strivers-180-master-dsa-patterns): DFS / Tree DP
- [ ] [Diameter of Binary Tree](https://takeuforward.org/practice/dsa/diameter-of-binary-tree?category=dfs-tree-dp&source=strivers-180-master-dsa-patterns): DFS / Tree DP
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (7 lessons)

##### Module 10: Paging and Virtual Memory in Operating System

- [ ] [Paging in Operating System](https://takeuforward.org/learning/core-subject/paging-in-operating-system?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (15 min)
- [ ] [Paging vs Segmentation](https://takeuforward.org/learning/core-subject/paging-vs-segmentation?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (9 min)
- [ ] [Pages, Frames, Page Tables, and PTEs](https://takeuforward.org/learning/core-subject/pages-frames-page-tables-and-ptes?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (10 min)
- [ ] [PTE Numerical](https://takeuforward.org/learning/core-subject/pte-numerical?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (8 min)
- [ ] [Multilevel Paging](https://takeuforward.org/learning/core-subject/multilevel-paging?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (24 min)
- [ ] [Inverted Page Table](https://takeuforward.org/learning/core-subject/inverted-page-table?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (9 min)
- [ ] [TLB in Operating System](https://takeuforward.org/learning/core-subject/tlb-in-operating-system?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (17 min)

#### OS Revision (30 min)

- [ ] [Quiz - Memory Allocation and Address Translation](https://takeuforward.org/quiz/core-subject/quiz-memory-allocation-and-address-translation?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] [Quiz - Memory Allocation Strategies](https://takeuforward.org/quiz/core-subject/quiz-memory-allocation-strategies?category=module-9-memory-management-in-operating-system&source=operating-system-by-striver) (TUF quiz, 30 MCQs)

### Fri Nov 27 (Weekday, 7.5 h)

#### DSA Revision (1 h 30 min)

- [ ] Clear Due Today on the Dashboard, up to 9 problems (expected about 14)

#### New DSA (11 problems, 4 h)

##### Binary Trees

- [ ] [Lowest Common Ancestor in BT](https://takeuforward.org/practice/dsa/lca-in-bt?category=dfs-tree-dp&source=strivers-180-master-dsa-patterns): DFS / Tree DP
- [ ] [Boundary Traversal](https://takeuforward.org/practice/dsa/boundary-traversal?category=dfs-tree-dp&source=strivers-180-master-dsa-patterns): DFS / Tree DP
- [ ] [Construct a BT from Preorder and Inorder](https://takeuforward.org/practice/dsa/construct-a-bt-from-preorder-and-inorder?category=dfs-tree-dp&source=strivers-180-master-dsa-patterns): DFS / Tree DP
- [ ] [Morris Inorder Traversal](https://takeuforward.org/practice/dsa/morris-inorder-traversal-?category=dfs-tree-dp&source=strivers-180-master-dsa-patterns): DFS / Tree DP
- [ ] [Maximum path sum](https://takeuforward.org/practice/dsa/maximum-path-sum-?category=dfs-tree-dp&source=strivers-180-master-dsa-patterns): DFS / Tree DP
- [ ] [Serialize and De-serialize BT](https://takeuforward.org/practice/dsa/serialize-and-de-serialize-bt?category=dfs-tree-dp&source=strivers-180-master-dsa-patterns): DFS / Tree DP

##### Binary Search Trees

- [ ] [Insert a given node in BST](https://takeuforward.org/practice/dsa/insert-a-given-node-in-bst?category=inorder-traversal&source=strivers-180-master-dsa-patterns): Inorder Traversal
- [ ] [LCA in BST](https://takeuforward.org/practice/dsa/lca-in-bst?category=inorder-traversal&source=strivers-180-master-dsa-patterns): Inorder Traversal
- [ ] [Delete a node in BST](https://takeuforward.org/practice/dsa/delete-a-node-in-bst?category=inorder-traversal&source=strivers-180-master-dsa-patterns): Inorder Traversal
- [ ] [Inorder successor and predecessor in BST](https://takeuforward.org/practice/dsa/inorder-successor-and-predecessor-in-bst?category=inorder-traversal&source=strivers-180-master-dsa-patterns): Inorder Traversal
- [ ] [Kth Smallest and Largest element in BST](https://takeuforward.org/practice/dsa/kth-smallest-and-largest-element-in-bst?category=inorder-traversal&source=strivers-180-master-dsa-patterns): Inorder Traversal
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (6 lessons)

##### Module 10: Paging and Virtual Memory in Operating System

- [ ] [Effective Access Time with TLB](https://takeuforward.org/learning/core-subject/effective-access-time-with-tlb?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (11 min)
- [ ] [Virtual Memory in Operating System](https://takeuforward.org/learning/core-subject/virtual-memory-in-operating-system?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (10 min)
- [ ] [Demand Paging](https://takeuforward.org/learning/core-subject/demand-paging?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (8 min)
- [ ] [Page Fault in Operating System](https://takeuforward.org/learning/core-subject/page-fault-in-operating-system?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (14 min)
- [ ] [Copy-on-Write and Lazy Allocation](https://takeuforward.org/learning/core-subject/copy-on-write-and-lazy-allocation?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (21 min)

##### Module 11: Page Replacement Algorithms and Thrashing

- [ ] [Page Replacement Algorithms](https://takeuforward.org/learning/core-subject/page-replacement-algorithms-pre?category=module-11-page-replacement-algorithms-and-thrashing&source=operating-system-by-striver) (14 min)

#### OS Revision (30 min)

- [ ] [Quiz - Paging and Segmentation](https://takeuforward.org/quiz/core-subject/quiz-paging-and-segmentation?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] [Quiz - Page Tables and TLB](https://takeuforward.org/quiz/core-subject/quiz-page-tables-and-tlb?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] Re-read your Module 8 notes (System Calls and Inter-Process Communication), 3-day revision

### Sat Nov 28 (Weekend, 12 h)

#### DSA Revision (2 h)

- [ ] Clear Due Today on the Dashboard, up to 12 problems (expected about 18)

#### New DSA (17 problems, 7 h)

##### Binary Search Trees

- [ ] [Check if a tree is a BST or not](https://takeuforward.org/practice/dsa/check-if-a-tree-is-a-bst-or-not?category=inorder-traversal&source=strivers-180-master-dsa-patterns) ♻️: Inorder Traversal
- [ ] [Construct a BST from a preorder traversal](https://takeuforward.org/practice/dsa/construct-a-bst-from-a-preorder-traversal?category=inorder-traversal&source=strivers-180-master-dsa-patterns): Inorder Traversal
- [ ] [Two sum in BST](https://takeuforward.org/practice/dsa/two-sum-in-bst?category=inorder-traversal&source=strivers-180-master-dsa-patterns): Inorder Traversal
- [ ] [Correct BST with two nodes swapped](https://takeuforward.org/practice/dsa/correct-bst-with-two-nodes-swapped?category=inorder-traversal&source=strivers-180-master-dsa-patterns): Inorder Traversal
- [ ] [Largest BST in Binary Tree](https://takeuforward.org/practice/dsa/largest-bst-in-binary-tree?category=inorder-traversal&source=strivers-180-master-dsa-patterns): Inorder Traversal

##### Graphs

- [ ] [Flood fill algorithm](https://takeuforward.org/practice/dsa/flood-fill-algorithm?category=bfs-dfs&source=strivers-180-master-dsa-patterns): BFS / DFS
- [ ] [Number of islands](https://takeuforward.org/practice/dsa/number-of-islands?category=bfs-dfs&source=strivers-180-master-dsa-patterns): BFS / DFS
- [ ] [Rotten Oranges](https://takeuforward.org/practice/dsa/rotten-oranges?category=bfs-dfs&source=strivers-180-master-dsa-patterns): BFS / DFS
- [ ] [Distance of nearest cell having one](https://takeuforward.org/practice/dsa/distance-of-nearest-cell-having-one?category=bfs-dfs&source=strivers-180-master-dsa-patterns): BFS / DFS
- [ ] [Surrounded Regions](https://takeuforward.org/practice/dsa/surrounded-regions?category=bfs-dfs&source=strivers-180-master-dsa-patterns): BFS / DFS
- [ ] [Number of distinct islands](https://takeuforward.org/practice/dsa/number-of-distinct-islands?category=bfs-dfs&source=strivers-180-master-dsa-patterns): BFS / DFS
- [ ] [Detect a cycle in an undirected graph](https://takeuforward.org/practice/dsa/detect-a-cycle-in-an-undirected-graph?category=bfs-dfs&source=strivers-180-master-dsa-patterns) ⏱️: BFS / DFS
- [ ] [Bipartite graph](https://takeuforward.org/practice/dsa/bipartite-graph?category=bfs-dfs&source=strivers-180-master-dsa-patterns) ⏱️: BFS / DFS
- [ ] [Detect a cycle in a directed graph](https://takeuforward.org/practice/dsa/detect-a-cycle-in-a-directed-graph?category=ordering-connectivity&source=strivers-180-master-dsa-patterns): Ordering & Connectivity
- [ ] [Topological sort or Kahn's algorithm](https://takeuforward.org/practice/dsa/topological-sort-or-kahns-algorithm?category=ordering-connectivity&source=strivers-180-master-dsa-patterns): Ordering & Connectivity
- [ ] [Course Schedule II](https://takeuforward.org/practice/dsa/course-schedule-ii?category=ordering-connectivity&source=strivers-180-master-dsa-patterns): Ordering & Connectivity
- [ ] [Alien Dictionary](https://takeuforward.org/practice/dsa/alient-dictionary?category=ordering-connectivity&source=strivers-180-master-dsa-patterns): Ordering & Connectivity
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (8 lessons)

##### Module 11: Page Replacement Algorithms and Thrashing

- [ ] [FIFO Page Replacement](https://takeuforward.org/learning/core-subject/fifo-page-replacement?category=module-11-page-replacement-algorithms-and-thrashing&source=operating-system-by-striver) (11 min)
- [ ] [Optimal Page Replacement](https://takeuforward.org/learning/core-subject/optimal-page-replacement?category=module-11-page-replacement-algorithms-and-thrashing&source=operating-system-by-striver) (9 min)
- [ ] [LRU Page Replacement](https://takeuforward.org/learning/core-subject/lru-page-replacement?category=module-11-page-replacement-algorithms-and-thrashing&source=operating-system-by-striver) (13 min)
- [ ] [LFU and MFU Page Replacement](https://takeuforward.org/learning/core-subject/lfu-and-mfu-page-replacement?category=module-11-page-replacement-algorithms-and-thrashing&source=operating-system-by-striver) (16 min)
- [ ] [Second-Chance and Clock Page Replacement](https://takeuforward.org/learning/core-subject/second-chance-and-clock-page-replacement?category=module-11-page-replacement-algorithms-and-thrashing&source=operating-system-by-striver) (16 min)
- [ ] [Belady's Anomaly](https://takeuforward.org/learning/core-subject/beladys-anomaly-pre?category=module-11-page-replacement-algorithms-and-thrashing&source=operating-system-by-striver) (16 min)
- [ ] [Thrashing and Working Set Model](https://takeuforward.org/learning/core-subject/thrashing-and-working-set-model?category=module-11-page-replacement-algorithms-and-thrashing&source=operating-system-by-striver) (12 min)
- [ ] [Frame Allocation Strategies](https://takeuforward.org/learning/core-subject/frame-allocation-strategies?category=module-11-page-replacement-algorithms-and-thrashing&source=operating-system-by-striver) (11 min)

#### OS Revision (60 min)

- [ ] [Quiz - TLB and Virtual Memory](https://takeuforward.org/quiz/core-subject/quiz-tlb-and-virtual-memory?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] [Quiz - Page Faults and Lazy Allocation](https://takeuforward.org/quiz/core-subject/quiz-page-faults-and-lazy-allocation?category=module-10-paging-and-virtual-memory-in-operating-system&source=operating-system-by-striver) (TUF quiz, 30 MCQs)
- [ ] Re-read your Module 6 notes (Process Synchronization and Concurrency Control), 7-day revision
- [ ] Re-read your Module 9 notes (Memory Management in Operating System), 3-day revision

### Sun Nov 29 (Weekend, 12 h)

#### DSA Revision (2 h)

- [ ] Clear Due Today on the Dashboard, up to 12 problems (expected about 25)

#### New DSA (15 problems, 7 h)

##### Graphs

- [ ] [Kosaraju's algorithm](https://takeuforward.org/practice/dsa/kosaraju's-algorithm?category=ordering-connectivity&source=strivers-180-master-dsa-patterns): Ordering & Connectivity
- [ ] [Bridges in graph](https://takeuforward.org/practice/dsa/bridges-in-graph?category=ordering-connectivity&source=strivers-180-master-dsa-patterns): Ordering & Connectivity
- [ ] [Articulation point in graph](https://takeuforward.org/practice/dsa/articulation-point-in-graph?category=ordering-connectivity&source=strivers-180-master-dsa-patterns): Ordering & Connectivity
- [ ] [Shortest path in undirected graph with unit weights](https://takeuforward.org/practice/dsa/shortest-path-in-undirected-graph-with-unit-weights?category=shortest-path&source=strivers-180-master-dsa-patterns): Shortest Path
- [ ] [Shortest path in DAG](https://takeuforward.org/practice/dsa/shortest-path-in-dag?category=shortest-path&source=strivers-180-master-dsa-patterns): Shortest Path
- [ ] [Dijkstra's algorithm](https://takeuforward.org/practice/dsa/dijkstra's-algorithm?category=shortest-path&source=strivers-180-master-dsa-patterns) ⏱️: Shortest Path
- [ ] [Path with minimum effort](https://takeuforward.org/practice/dsa/path-with-minimum-effort?category=shortest-path&source=strivers-180-master-dsa-patterns): Shortest Path
- [ ] [Cheapest flight within K stops](https://takeuforward.org/practice/dsa/cheapest-flight-within-k-stops?category=shortest-path&source=strivers-180-master-dsa-patterns): Shortest Path
- [ ] [Bellman ford algorithm](https://takeuforward.org/practice/dsa/bellman-ford-algorithm?category=shortest-path&source=strivers-180-master-dsa-patterns): Shortest Path
- [ ] [Floyd warshall algorithm](https://takeuforward.org/practice/dsa/floyd-warshall-algorithm?category=shortest-path&source=strivers-180-master-dsa-patterns) ⏱️: Shortest Path
- [ ] [Word ladder I](https://takeuforward.org/practice/dsa/word-ladder-i?category=shortest-path&source=strivers-180-master-dsa-patterns): Shortest Path
- [ ] [Word ladder II](https://takeuforward.org/practice/dsa/word-ladder-ii?category=shortest-path&source=strivers-180-master-dsa-patterns) ⏱️: Shortest Path
- [ ] [Disjoint Set](https://takeuforward.org/practice/dsa/disjoint-set-?category=dsu-mst&source=strivers-180-master-dsa-patterns) ⏱️: DSU / MST
- [ ] [Find the MST weight](https://takeuforward.org/practice/dsa/find-the-mst-weight?category=dsu-mst&source=strivers-180-master-dsa-patterns) ⏱️: DSU / MST
- [ ] [Number of operations to make network connected](https://takeuforward.org/practice/dsa/number-of-operations-to-make-network-connected?category=dsu-mst&source=strivers-180-master-dsa-patterns): DSU / MST
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (8 lessons)

##### Module 12: File System in Operating System

- [ ] [File System in Operating System](https://takeuforward.org/learning/core-subject/file-system-in-operating-system-pre?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (25 min)
- [ ] [Files, Directories, and Paths](https://takeuforward.org/learning/core-subject/files-directories-and-paths?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (18 min)
- [ ] [File Descriptor in Operating System](https://takeuforward.org/learning/core-subject/file-descriptor-in-operating-system?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (21 min)
- [ ] [File Access Methods](https://takeuforward.org/learning/core-subject/file-access-methods?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (11 min)
- [ ] [Inode, FCB, and File Metadata](https://takeuforward.org/learning/core-subject/inode-fcb-and-file-metadata?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (15 min)
- [ ] [Hard Link vs Soft Link](https://takeuforward.org/learning/core-subject/hard-link-vs-soft-link?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (13 min)
- [ ] [File Permissions and ACLs](https://takeuforward.org/learning/core-subject/file-permissions-and-acls?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (13 min)
- [ ] [Directory Structure in Operating System](https://takeuforward.org/learning/core-subject/directory-structure-in-operating-system?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (9 min)

#### OS Revision (60 min)

- [ ] Re-read your Module 7 notes (Deadlock, Starvation, and Concurrency Bugs), 7-day revision

### Mon Nov 30 (Weekday, 7.5 h)

#### DSA Revision (1 h 30 min)

- [ ] Clear Due Today on the Dashboard, up to 9 problems (expected about 24)

#### New DSA (9 problems, 4 h)

##### Graphs

- [ ] [Number of islands II](https://takeuforward.org/practice/dsa/number-of-islands-ii?category=dsu-mst&source=strivers-180-master-dsa-patterns): DSU / MST
- [ ] [Making a large island](https://takeuforward.org/practice/dsa/making-a-large-island?category=dsu-mst&source=strivers-180-master-dsa-patterns): DSU / MST

##### Dynamic Programming

- [ ] [Frog jump with K distances](https://takeuforward.org/practice/dsa/frog-jump-with-k-distances?category=state-transition-dp&source=strivers-180-master-dsa-patterns): State Transition DP
- [ ] [House robber](https://takeuforward.org/practice/dsa/house-robber?category=state-transition-dp&source=strivers-180-master-dsa-patterns): State Transition DP
- [ ] [Ninja's training](https://takeuforward.org/practice/dsa/ninja's-training?category=state-transition-dp&source=strivers-180-master-dsa-patterns) ⏱️: State Transition DP
- [ ] [Unique paths II](https://takeuforward.org/practice/dsa/unique-paths-ii?category=state-transition-dp&source=strivers-180-master-dsa-patterns): State Transition DP
- [ ] [Best time to buy and sell stock with transaction fees](https://takeuforward.org/practice/dsa/best-time-to-buy-and-sell-stock-with-cooldown-and-transaction-fees?category=state-transition-dp&source=strivers-180-master-dsa-patterns): State Transition DP
- [ ] [Best time to buy and sell stock IV](https://takeuforward.org/practice/dsa/best-time-to-buy-and-sell-stock-iv?category=state-transition-dp&source=strivers-180-master-dsa-patterns): State Transition DP
- [ ] [0 and 1 Knapsack](https://takeuforward.org/practice/dsa/0-and-1-knapsack?category=knapsack-dp&source=strivers-180-master-dsa-patterns) ⏱️: Knapsack DP
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (7 lessons)

##### Module 12: File System in Operating System

- [ ] [File Allocation Methods](https://takeuforward.org/learning/core-subject/file-allocation-methods?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (8 min)
- [ ] [Contiguous, Linked, and Indexed File Allocation](https://takeuforward.org/learning/core-subject/contiguous-linked-and-indexed-file-allocation?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (8 min)
- [ ] [Free Space Management](https://takeuforward.org/learning/core-subject/free-space-management?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (11 min)
- [ ] [Caching and Buffering in File Systems](https://takeuforward.org/learning/core-subject/caching-and-buffering-in-file-systems?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (14 min)
- [ ] [Journaling and Crash Consistency](https://takeuforward.org/learning/core-subject/journaling-and-crash-consistency?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (24 min)
- [ ] [Backup, Recovery, and Network File Systems](https://takeuforward.org/learning/core-subject/backup-recovery-and-network-file-systems?category=module-12-file-system-in-operating-system&source=operating-system-by-striver) (19 min)

##### Module 13: Storage Management, Disk Scheduling, and I/O Systems

- [ ] [HDD vs SSD](https://takeuforward.org/learning/core-subject/hdd-vs-ssd?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)

#### OS Revision (30 min)

- [ ] Re-read your Module 10 notes (Paging and Virtual Memory in Operating System), 3-day revision

### Tue Dec 1 (Weekday, 7.5 h)

#### DSA Revision (1 h 30 min)

- [ ] Clear Due Today on the Dashboard, up to 9 problems (expected about 18)

#### New DSA (9 problems, 4 h)

##### Dynamic Programming

- [ ] [Partition a set into two subsets with minimum absolute sum difference](https://takeuforward.org/practice/dsa/partition-a-set-into-two-subsets-with-minimum-absolute-sum-difference?category=knapsack-dp&source=strivers-180-master-dsa-patterns): Knapsack DP
- [ ] [Target sum](https://takeuforward.org/practice/dsa/target-sum?category=knapsack-dp&source=strivers-180-master-dsa-patterns): Knapsack DP
- [ ] [Coin change II](https://takeuforward.org/practice/dsa/coin-change-ii?category=knapsack-dp&source=strivers-180-master-dsa-patterns): Knapsack DP
- [ ] [Longest common subsequence](https://takeuforward.org/practice/dsa/longest-common-subsequence?category=sequence-dp&source=strivers-180-master-dsa-patterns) ⏱️: Sequence DP
- [ ] [Longest common substring](https://takeuforward.org/practice/dsa/longest-common-substring?category=sequence-dp&source=strivers-180-master-dsa-patterns): Sequence DP
- [ ] [Longest palindromic subsequence](https://takeuforward.org/practice/dsa/longest-palindromic-subsequence?category=sequence-dp&source=strivers-180-master-dsa-patterns): Sequence DP
- [ ] [Longest Increasing Subsequence](https://takeuforward.org/practice/dsa/longest-increasing-subsequence?category=sequence-dp&source=strivers-180-master-dsa-patterns) ⏱️: Sequence DP
- [ ] [Number of Longest Increasing Subsequences](https://takeuforward.org/practice/dsa/number-of-longest-increasing-subsequences?category=sequence-dp&source=strivers-180-master-dsa-patterns): Sequence DP
- [ ] [Edit distance](https://takeuforward.org/practice/dsa/edit-distance?category=sequence-dp&source=strivers-180-master-dsa-patterns) ⏱️: Sequence DP
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (7 lessons)

##### Module 13: Storage Management, Disk Scheduling, and I/O Systems

- [ ] [Disk Structure: Tracks, Sectors, Cylinders, Blocks, and Pages](https://takeuforward.org/learning/core-subject/disk-structure-tracks-sectors-cylinders-blocks-and-pages?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [Disk Access Time](https://takeuforward.org/learning/core-subject/disk-access-time?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [Disk Scheduling Algorithms](https://takeuforward.org/learning/core-subject/disk-scheduling-algorithms-pre?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [FCFS Disk Scheduling](https://takeuforward.org/learning/core-subject/fcfs-disk-scheduling?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [SSTF Disk Scheduling](https://takeuforward.org/learning/core-subject/sstf-disk-scheduling?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [SCAN and C-SCAN Disk Scheduling](https://takeuforward.org/learning/core-subject/scan-and-c-scan-disk-scheduling?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [LOOK and C-LOOK Disk Scheduling](https://takeuforward.org/learning/core-subject/look-and-c-look-disk-scheduling?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)

#### OS Revision (30 min)

- [ ] Re-read your Module 8 notes (System Calls and Inter-Process Communication), 7-day revision
- [ ] Re-read your Module 11 notes (Page Replacement Algorithms and Thrashing), 3-day revision

### Wed Dec 2 (Weekday, 7.5 h)

#### DSA Revision (1 h 30 min)

- [ ] Clear Due Today on the Dashboard, up to 9 problems (expected about 14)

#### New DSA (8 problems, 4 h)

##### Dynamic Programming

- [ ] [Wildcard matching](https://takeuforward.org/practice/dsa/wildcard-matching?category=sequence-dp&source=strivers-180-master-dsa-patterns) ⏱️: Sequence DP
- [ ] [Matrix chain multiplication](https://takeuforward.org/practice/dsa/matrix-chain-multiplication?category=partition-dp&source=strivers-180-master-dsa-patterns) ⏱️: Partition DP
- [ ] [Palindrome partitioning II](https://takeuforward.org/practice/dsa/palindrome-partitioning-ii-?category=partition-dp&source=strivers-180-master-dsa-patterns): Partition DP

##### Tries

- [ ] [Trie Implementation and Advanced Operations](https://takeuforward.org/practice/dsa/trie-implementation-and-advanced-operations?category=trie&source=strivers-180-master-dsa-patterns): Trie
- [ ] [Longest Word with All Prefixes](https://takeuforward.org/practice/dsa/longest-word-with-all-prefixes?category=trie&source=strivers-180-master-dsa-patterns): Trie
- [ ] [Number of distinct substrings in a string](https://takeuforward.org/practice/dsa/number-of-distinct-substrings-in-a-string?category=trie&source=strivers-180-master-dsa-patterns): Trie
- [ ] [Maximum XOR of two numbers in an array](https://takeuforward.org/practice/dsa/maximum-xor-of-two-numbers-in-an-array?category=trie&source=strivers-180-master-dsa-patterns) ⏱️: Trie
- [ ] [Maximum Xor with an element from an array](https://takeuforward.org/practice/dsa/maximum-xor-with-an-element-from-an-array?category=trie&source=strivers-180-master-dsa-patterns): Trie
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (7 lessons)

##### Module 13: Storage Management, Disk Scheduling, and I/O Systems

- [ ] [RAID in Operating System](https://takeuforward.org/learning/core-subject/raid-in-operating-system?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [Fragmentation, Swap Space, and Bad Blocks](https://takeuforward.org/learning/core-subject/fragmentation-swap-space-and-bad-blocks?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [Device Drivers in Operating System](https://takeuforward.org/learning/core-subject/device-drivers-in-operating-system?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [Interrupts in Operating System](https://takeuforward.org/learning/core-subject/interrupts-in-operating-system?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [DMA in Operating System](https://takeuforward.org/learning/core-subject/dma-in-operating-system?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [Polling vs Interrupts and Blocking vs Non-Blocking I/O](https://takeuforward.org/learning/core-subject/polling-vs-interrupts-and-blocking-vs-non-blocking-io?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [Spooling vs Buffering in Operating System](https://takeuforward.org/learning/core-subject/spooling-vs-buffering-in-operating-system?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)

#### OS Revision (30 min)

- [ ] Re-read your Module 9 notes (Memory Management in Operating System), 7-day revision

### Thu Dec 3 (Weekday, 7.5 h)

#### DSA Revision (1 h 30 min)

- [ ] Clear Due Today on the Dashboard, up to 9 problems (expected about 15)

#### New DSA (9 problems, 4 h)

##### Strings

- [ ] [Rabin Karp Algorithm](https://takeuforward.org/practice/dsa/rabin-karp-algorithm?category=string-matching&source=strivers-180-master-dsa-patterns) ⏱️: String Matching
- [ ] [Z function](https://takeuforward.org/practice/dsa/z-function?category=string-matching&source=strivers-180-master-dsa-patterns) ⏱️: String Matching
- [ ] [KMP Algorithm or LPS array](https://takeuforward.org/practice/dsa/kmp-algorithm-or-lps-array?category=string-matching&source=strivers-180-master-dsa-patterns): String Matching
- [ ] [Shortest Palindrome](https://takeuforward.org/practice/dsa/shortest-palindrome?category=string-matching&source=strivers-180-master-dsa-patterns): String Matching

##### Bit Manipulation

- [ ] [Power Set Bit Manipulation](https://takeuforward.org/practice/dsa/power-set-bit-manipulation?category=bit-manipulation&source=strivers-180-master-dsa-patterns): Bit Manipulation
- [ ] [Single Number - II](https://takeuforward.org/practice/dsa/single-number---ii?category=bit-manipulation&source=strivers-180-master-dsa-patterns) ⏱️: Bit Manipulation
- [ ] [Single Number - III](https://takeuforward.org/practice/dsa/single-number---iii?category=bit-manipulation&source=strivers-180-master-dsa-patterns): Bit Manipulation
- [ ] [Find the repeating and missing number](https://takeuforward.org/practice/dsa/find-the-repeating-and-missing-number?category=bit-manipulation&source=strivers-180-master-dsa-patterns) ⏱️: Bit Manipulation

##### Mathematics

- [ ] [Print all primes till N](https://takeuforward.org/practice/dsa/print-all-primes-till-n?category=number-theory&source=strivers-180-master-dsa-patterns): Number Theory
- [ ] Close: one line per finished sub-pattern in its Recognition Cues

#### New OS (8 lessons)

##### Module 13: Storage Management, Disk Scheduling, and I/O Systems

- [ ] [Event-Based I/O and Network I/O Path](https://takeuforward.org/learning/core-subject/event-based-io-and-network-io-path?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)
- [ ] [Booting, BIOS vs UEFI, and Bootloader](https://takeuforward.org/learning/core-subject/booting-bios-vs-uefi-and-bootloader?category=module-13-storage-management-disk-scheduling-and-io-systems&source=operating-system-by-striver)

##### Module 14: OS Security, Virtualization, Containers, and Interview Revision

- [ ] [Users, Groups, Authentication, and Authorization](https://takeuforward.org/learning/core-subject/users-groups-authentication-and-authorization?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)
- [ ] [Access Control Models: ACLs, Access Matrix, and Capabilities](https://takeuforward.org/learning/core-subject/access-control-models-acls-access-matrix-and-capabilities?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)
- [ ] [Privilege Separation, Sandboxing, and File System Encryption](https://takeuforward.org/learning/core-subject/privilege-separation-sandboxing-and-file-system-encryption?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)
- [ ] [Common OS Security Risks](https://takeuforward.org/learning/core-subject/common-os-security-risks?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)
- [ ] [Virtual Machines and Hypervisors](https://takeuforward.org/learning/core-subject/virtual-machines-and-hypervisors?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)
- [ ] [Containers in Operating System](https://takeuforward.org/learning/core-subject/containers-in-operating-system?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)

#### OS Revision (30 min)

- [ ] Re-read your Module 12 notes (File System in Operating System), 3-day revision

### Fri Dec 4 (Buffer day, 7.5 h)

#### DSA Revision (6 h)

- [ ] Finish any new problems still carried over
- [ ] Clear Due Today on the Dashboard, then everything Rebalance pushed here
- [ ] Re-read the `trigger` lines of every Graphs and DP problem

#### New OS (7 lessons)

##### Module 14: OS Security, Virtualization, Containers, and Interview Revision

- [ ] [Containers vs Virtual Machines](https://takeuforward.org/learning/core-subject/containers-vs-virtual-machines?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)
- [ ] [Namespaces and cgroups](https://takeuforward.org/learning/core-subject/namespaces-and-cgroups?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)
- [ ] [OS Observability and Performance Debugging](https://takeuforward.org/learning/core-subject/os-observability-and-performance-debugging?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)
- [ ] [Modern OS Trends: eBPF, Serverless, and Sandboxed Runtimes](https://takeuforward.org/learning/core-subject/modern-os-trends-ebpf-serverless-and-sandboxed-runtimes?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)
- [ ] [OS Concepts in Backend Systems and Databases](https://takeuforward.org/learning/core-subject/os-concepts-in-backend-systems-and-databases?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)
- [ ] [CPU Scheduling Exam Add-ons: Convoy Effect, LJF, and LRTF](https://takeuforward.org/learning/core-subject/cpu-scheduling-exam-add-ons-convoy-effect-ljf-and-lrtf?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)
- [ ] [Must-Know OS Interview and Exam Checklist](https://takeuforward.org/learning/core-subject/must-know-os-interview-and-exam-checklist?category=module-14-os-security-virtualization-containers-and-interview-revision&source=operating-system-by-striver)

#### OS Revision

- [ ] Re-read your Module 10 notes (Paging and Virtual Memory in Operating System), 7-day revision

### Sat Dec 5 (Final revision, 12 h)

#### DSA Revision (8 h)

- [ ] Clear Due Today on the Dashboard
- [ ] Mixed blind round: 1 random problem from each module (16), 15 minutes each, name the pattern first
- [ ] Re-solve every problem still at `streak: 0`
- [ ] Update Recognition Cues in each sub-pattern note with what the blind round taught you

#### OS Revision (240 min)

- [ ] Every OS module's notes, one pass, writing 3 interview questions per module
- [ ] Redo the TUF quizzes you scored lowest on
- [ ] Explain aloud: deadlock conditions and Banker's, paging and TLB, page replacement, fork/exec, IPC choices, file system inodes
