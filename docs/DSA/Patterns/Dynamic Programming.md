# Dynamic Programming (DP)

## Recognition Cues
- Overlapping subproblems, optimal substructure, count ways, min cost.
- Patterns: 1D DP, 0/1 Knapsack (loop backwards), Unbounded Knapsack (loop forwards), LCS / Strings.

## Common Pitfalls
- Initialize min-cost DP tables with `1e9` (not `0`).
- 0/1 Knapsack 1D space optimization requires iterating weight backwards.

## Related Problems
```dataview
LIST FROM "DSA/Problems"
WHERE contains(file.outlinks, this.file.link)
```
