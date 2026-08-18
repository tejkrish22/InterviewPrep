# BFS (Breadth-First Search)

## Recognition Cues
- Shortest path in unweighted graphs or uniform-cost grid traversals, level-order traversal.
- Uses `std::queue`. Guarantees shortest path on first arrival to target node.

## Common Pitfalls
- **Visited Timing:** Mark node visited when **enqueuing** (not dequeuing) to prevent duplicate additions and TLE.

## Related Problems
```dataview
LIST FROM "DSA/Problems"
WHERE contains(file.outlinks, this.file.link)
```
