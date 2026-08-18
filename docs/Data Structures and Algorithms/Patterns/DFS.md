# DFS (Depth-First Search)

## Recognition Cues
- Exploring all paths completely before backtracking, island counting, cycle detection.
- Uses implicit call stack or explicit `std::stack`. Mark `visited` on entry.

## Common Pitfalls
- Unmark `visited[node] = false` when backtracking for all-paths generation.

## Related Problems
```dataview
LIST FROM "DSA/Problems"
WHERE contains(file.outlinks, this.file.link)
```
