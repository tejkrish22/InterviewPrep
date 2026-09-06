## Recognition Cues

- Sorted arrays, rotated sorted arrays, monotonic predicate function ($FFF...TTT$).
- Search space halving: `mid = low + (high - low) / 2`.

## Common Pitfalls

- Avoid overflow: use `low + (high - low) / 2` instead of `(low + high) / 2`.
- When multiplying values derived from the search (e.g., `mid * mid`), cast to `long long` **before** the operation to prevent overflow.
- Beware infinite loop when `low = mid` without rounding up `mid = low + (high - low + 1) / 2`.

---

## Sub Patterns

### Upper and Lower Limits

Finding boundaries in a sorted array — lower bound, upper bound, first/last occurrence, floor/ceil. The key decision is whether `mid` belongs to the left or right half based on the comparison (`<` vs `<=`).

```dataview
LIST FROM "Data Structures and Algorithms/Problems"
WHERE SubPattern = [[Upper and Lower Limits]]
SORT file.ctime asc
```

---

### Find the Sorted Half

For **rotated sorted arrays**. The crux: *one half is always sorted* — identify it, then check if the target lies within the sorted half. If yes, search there; otherwise, search the other half.

```dataview
LIST FROM "Data Structures and Algorithms/Problems"
WHERE SubPattern = [[Find the Sorted Half]]
SORT file.ctime asc
```

---

### Binary Search On Answer

The search space is the **answer range**, not an array index. Formulate a monotonic predicate (e.g., *"is X a valid answer?"*) and binary search over the answer space.

```dataview
LIST FROM "Data Structures and Algorithms/Problems"
WHERE SubPattern = [[Binary Search On Answer]]
SORT file.ctime asc
```

---

### Other

Problems using Binary Search that don't fall neatly into a sub-pattern above.

```dataview
LIST FROM "Data Structures and Algorithms/Problems"
WHERE SubPattern != [[Upper and Lower Limits]] and SubPattern != [[Find the Sorted Half]] and SubPattern != [[Binary Search On Answer]]
SORT file.ctime asc
```

