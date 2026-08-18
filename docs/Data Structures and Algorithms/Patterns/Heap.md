# Heap (Priority Queue)

## Recognition Cues
- Top K largest/smallest, dynamic median in data stream, merge K sorted lists.
- Top K Largest $\rightarrow$ Min-Heap of size $K$. Top K Smallest $\rightarrow$ Max-Heap of size $K$.

## Common Pitfalls
- C++ `priority_queue` is MAX-heap by default; use `greater<T>` for Min-heap.

## Related Problems
```dataview
LIST FROM "DSA/Problems"
WHERE contains(file.outlinks, this.file.link)
```
