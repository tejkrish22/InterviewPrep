# Binary Search

## Recognition Cues
- Sorted arrays, rotated sorted arrays, monotonic predicate function ($FFF...TTT$).
- Search space halving: `mid = low + (high - low) / 2`.

## Common Pitfalls
- Avoid overflow: use `low + (high - low) / 2` instead of `(low + high) / 2`.
- Beware infinite loop when `low = mid` without rounding up `mid = low + (high - low + 1) / 2`.

## Related Problems
```dataview
LIST FROM "Data Structures and Algorithms/Problems"
WHERE contains(file.outlinks, this.file.link)
SORT file.ctime asc
```
