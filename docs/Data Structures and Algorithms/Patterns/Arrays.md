# Arrays

## Recognition Cues
- Subarray sum equals K, prefix sums, contiguous array queries.
- Prefix sums allow $O(1)$ range sum queries: `sum(L...R) = P[R] - P[L-1]`.

## Common Pitfalls
- For negative numbers, prefix sum + hash map is required (Sliding Window fails).

## Related Problems
```dataview
LIST FROM "Data Structures and Algorithms/Problems"
WHERE contains(file.outlinks, this.file.link)
SORT file.ctime asc
```
