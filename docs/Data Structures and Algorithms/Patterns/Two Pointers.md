# Two Pointers

## Recognition Cues
- Sorted arrays, pair/triplet searching, container with most water, trapping rain water.
- Shrink search space from `left = 0` and `right = n - 1` ($O(N)$ vs $O(N^2)$).

## Common Pitfalls
- Skip duplicates when finding unique triplets (`if (i > 0 && nums[i] == nums[i-1]) continue;`).

## Related Problems
```dataview
LIST FROM "DSA/Problems"
WHERE contains(file.outlinks, this.file.link)
```
