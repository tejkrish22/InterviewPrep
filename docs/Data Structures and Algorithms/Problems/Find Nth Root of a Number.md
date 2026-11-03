---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Binary Search On Answer]]"
streak: 0
times_reviewed: 0
last_reviewed:
next_review: 2026-11-08
trigger:
unique: false
link: https://takeuforward.org/plus/dsa/problems/find-nth-root-of-a-number?subject=dsa&approach=binary-search&tab=editorial
---
---

## Question

Given two numbers N and M, find the **Nth** root of M. The Nth root of a number M is defined as a number X such that when X is raised to the power of N, it equals M. If the Nth root is not an integer, return -1.

### Example

Input: N = 3, M = 27
Output: 3
Explanation: The cube root of 27 is equal to 3.

---

## Code

### Brute Force

```cpp
class Solution {
public:
    int NthRoot(int n, int m) {
        // Try every candidate root
        for (int x = 0; x <= m; x++) {
            long long p = 1;
            for (int i = 0; i < n; i++) {
                p *= x;
                if (p > m) break;
            }
            if (p == m) return x;
            if (p > m) return -1;
        }
        return -1;
    }
};
```

- TC: O(m x n)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
   public:
    int calPower (int m, int n, int target){
	    // To capture overflow use long long
        long long ans = 1;
        for (int i=0; i<n; i++){
            ans = ans*m;
            // If the answer exceeds target slightly, break; thus avoiding 
            // overflow
            if (ans>target){
                return 1;
            }
        }
        if (ans<target) return -1;
        else return 0;
    }
    int NthRoot(int n, int m) {
	    // Do binary search on answer
        int low = 0;
        int high = m;
        int ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            // Do not use in-built pow function, because it might cause overflow
            // Use the custom function
            int val = calPower(mid, n, m);

            if (val == 0) {
                ans = mid;
                break;
            }
            else if (val<0){
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        return ans;
    }
};

```

- TC: O(n x log m)
    - This is the worst case.
    - If binary exponentiation is used for the power calculation, it becomes O(log n x log m).
- SC: O(1)

---

## Look out

1. Overflow issues
2. Power Calculation - Binary Exponentiation
