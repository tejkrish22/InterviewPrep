# Graphs

## Recognition Cues
- Networks of nodes/edges, 2D matrix grids, dependency resolution (Topological Sort).
- Adjacency list representation, Kahn's algorithm for DAG topological ordering.

## Common Pitfalls
- Loop `for (int i = 0; i < V; i++)` to handle disconnected components.

## Related Problems
```dataview
LIST FROM "Data Structures and Algorithms/Problems"
WHERE contains(file.outlinks, this.file.link)
SORT file.ctime asc
```
