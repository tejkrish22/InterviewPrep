# Queue

## Recognition Cues
- FIFO, level-order traversal, Monotonic Deque (Sliding Window Maximum).
- Maintain dynamic sliding window maximum/minimum in $O(1)$ amortized time using `std::deque`.

## Common Pitfalls
- Remove out-of-window elements from the front of the deque before updating result.

## Related Problems
```dataview
LIST FROM "DSA/Problems"
WHERE contains(file.outlinks, this.file.link)
```
