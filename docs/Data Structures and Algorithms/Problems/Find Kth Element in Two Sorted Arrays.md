---
pattern: "[[Binary Search]]"
SubPattern: "[[Binary Search on Partition]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-22
next_review: 2026-11-28
trigger: Two sorted arrays, kth smallest without merging → same partition idea as median but left half size = k, answer is always max(l1, l2)
unique: false
link: https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1
tags:
  - striver180
---
---

## Question

Given two sorted arrays a and b of size m and n respectively. Find the kth element of the final sorted array.

### Example

Input: a = [2, 3, 6, 7, 9], b = [1, 4, 8, 10], k = 5
Output: 6
Explanation: The final sorted array would be [1, 2, 3, 4, 6, 7, 8, 9, 10]. The 5th element of this array is 6.

---

## Key Insight

1. Same partition idea as Median — find a cut in both arrays so the left half has exactly `k` elements total (`left = k`, `mid2 = k - mid1`).
2. The partition is valid when `l1 ≤ r2 AND l2 ≤ r1`. The kth element is `max(l1, l2)` — the largest in the left half.
3. Unlike Median, there's no even/odd case — just always return `max(l1, l2)`.
4. The search range for `mid1` is `[max(0, k-n), min(k, m)]` not `[0, m]` — this keeps `mid2` within `[0, n]` at all times.

---

## Code

### Binary Search

```cpp
class Solution {
public:
    int kthElement(vector<int>& a, vector<int>& b, int k) {
        int m = a.size();
        int n = b.size();

        // Ensure a is smaller array for optimization
        if (m > n) {
            // Swap a and b
            return kthElement(b, a, k); 
        }
        
        // Length of the left half
        int left = k; 

        // Apply binary search
        int low = max(0, k - n);
        int high = min(k, m);
        
        while (low <= high) {
            int mid1 = (low + high) >> 1;
            int mid2 = left - mid1;

            // Initialize l1, l2, r1, r2
            int l1 = (mid1 > 0) ? a[mid1 - 1] : INT_MIN;
            int l2 = (mid2 > 0) ? b[mid2 - 1] : INT_MIN;
            int r1 = (mid1 < m) ? a[mid1] : INT_MAX;
            int r2 = (mid2 < n) ? b[mid2] : INT_MAX;

            // Check if we have found the answer
            if (l1 <= r2 && l2 <= r1) {
                return max(l1, l2);
            } 
            else if (l1 > r2) {
                // Eliminate the right half
                high = mid1 - 1;
            } 
            else {
                // Eliminate the left half
                low = mid1 + 1;
            }
        }
        
         // Dummy return statement 
        return -1;
    }
};
```

- TC: O(log(min(m,n)))
- SC: O(1)

---

## Look out

1. `low = max(0, k-n)` not `0` — if b has only `n` elements, arr1 must contribute at least `k-n` to the left half; going below that makes `mid2 > n` (out of bounds).
2. `high = min(k, m)` not `m` — left half needs exactly `k` elements; taking more than `k` from arr1 alone makes no sense, and arr1 only has `m` elements.
3. Always binary search on the smaller array — swap if `m > n` to keep `mid2` non-negative (`mid2 = k - mid1 ≥ 0` is only guaranteed when searching the smaller one).
4. `INT_MIN`/`INT_MAX` sentinels for boundary cases when `mid1 = 0` or `mid1 = m`.

---

## Related Problems

1. [[Median of 2 sorted arrays]]
