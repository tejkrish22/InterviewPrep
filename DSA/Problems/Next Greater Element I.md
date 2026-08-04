---
pattern:
  - "[[Stack]]"
confidence: "2"
Date: 2026-08-04
---
### Key Idea
- Use a Monotonic Stack (decreasing order). Traverse right-to-left: pop elements off stack `<= nums[i]`. The remaining stack top is the Next Greater Element. Push `nums[i]` onto stack.

### Complexity
- **Time:** $O(N)$ — Each element is pushed and popped at most once.
- **Space:** $O(N)$ — Stack storage for array indices/values.

### Pitfalls & Mistakes
- Stored values instead of indices on the stack when distance/width calculations were required.
- Forgot to check `!st.empty()` before calling `st.top()`, leading to runtime empty stack crash.
