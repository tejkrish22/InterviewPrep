# Union Find (Disjoint Set Union - DSU)

## Recognition Cues
- Dynamic connectivity, connected components in undirected graph, Kruskal's MST.
- Path Compression + Union by Rank ($O(\alpha(N)) \approx O(1)$).

## Common Pitfalls
- Path compression: `parent[i] = find(parent[i])`.

## Related Problems
```dataview
LIST FROM "DSA/Problems"
WHERE contains(file.outlinks, this.file.link)
```
