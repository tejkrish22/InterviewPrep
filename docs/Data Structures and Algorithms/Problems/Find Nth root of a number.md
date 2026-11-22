---
pattern: "[[Binary Search]]"
SubPattern:
  - "[[Binary Search On Answer]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-22
next_review: 2026-11-23
trigger: The solution range is 1 -> m, so binary search on this search space by calculating power using binary exponentiation
unique: false
link: https://takeuforward.org/practice/dsa/find-nth-root-of-a-number?category=search-on-answer&source=strivers-180-master-dsa-patterns&sidebar=0&tab=solution&solution=linear-search
tags:
  - striver180
---
---

## Question

Given two numbers N and M, find the **Nth** root of M. The Nth root of a number M is defined as a number X such that when X is raised to the power of N, it equals M. If the Nth root is not an integer, return -1.

### Example

Input: N = 3, M = 27
Output: 3
Explanation: The cube root of 27 is equal to 3.

---

## Key Insight

1. The solution range is 1 -> m, so binary search on this search space by calculating power using binary exponentiation

---

## Code

### Brute Force

```cpp
class Solution {
private:
    /* Function to calculate power using
    exponentiation by squaring method*/
    long long func(int b, int exp) {
        long long ans = 1;
        long long base = b;
        
        // Exponentiation by squaring method
        while (exp > 0) {
            if (exp % 2 != 0) {
                exp--;
                ans = ans * base;
            } else {
                exp /= 2;
                base = base * base;
            }
        }
        return ans;
    }
public:
    /* Function to find the nth root
    of m using linear search*/
    int NthRoot(int N, int M) {
        // Linear search on the answer space
        for (int i = 1; i <= M; i++) {
            long long val = func(i, N);
            
            /* Check if the computed
            value is equal to M */
            if (val == M * 1ll) {
                // Return the root value
                return i; 
            } else if (val > M * 1ll) {
                break;
            }
        }
        // Return -1 if no root found
        return -1; 
    }
};
```

- TC: O(m x log n)
- SC: O(1)

### Binary Search on Answer

```cpp
class Solution {
   private:
    /* Function to calculate power using
    exponentiation by squaring method*/
    int helperFunc(int mid, int n, int m) {
        long long ans = 1, base = mid;

        while (n > 0) {
            if (n % 2) {
                ans = ans * base;
                if (ans > m) return 2;  // Early exit
                n--;
            } else {
                n /= 2;
                base = base * base;
                if (base > m) return 2;
            }
        }
        if (ans == m) return 1;
        return 0;
    }

   public:
    /* Function to find the nth root
    root of m using binary search*/
    int NthRoot(int N, int M) {
        // Binary search on the answer space
        int low = 1, high = M;

        while (low <= high) {
            int mid = (low + high) / 2;
            int midN = func(mid, N, M);
            if (midN == 1) {
                // Return mid if mid^N== M
                return mid;
            } else if (midN == 0) {
                // Move to the right half if mid^N < M
                low = mid + 1;
            } else {
                // Move to the left half if mid^N > M
                high = mid - 1;
            }
        }
        // Return -1 if no nth root found
        return -1;
    }
};
```

- TC: O(log m x log n)
- SC: O(1)

---

## Look out

1. Binary Exponentiation

---

## Related Problems

1.
