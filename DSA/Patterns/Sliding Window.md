# Sliding Window

## Recognition Cues
- Contiguous subarray or substring condition (max/min length, exact K unique characters).
- Expand `right` to include elements; shrink `left` while condition is invalid.

## Common Pitfalls
- Sliding Window does NOT work with negative numbers (use Prefix Sum + HashMap instead).
- Window size formula: `right - left + 1`.

## Related Problems
```dataview
LIST FROM "DSA/Problems"
WHERE contains(file.outlinks, this.file.link)
```
