---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Binary Search On Answer]]"
confidence: 3
unique: true
link: https://takeuforward.org/plus/dsa/problems/find-square-root-of-a-number?subject=dsa&approach=binary-search&tab=submissions
---
---
## Question

Given a positive integer n. Find and return its **square root**. If n is not a perfect square, then return the floor value of sqrt(n).
### Example

Input: n = 36
Output: 6
Explanation: 6 is the square root of 36.

---
## Code

```cpp
class Solution {
   public:
    int floorSqrt(int n) {
	    // Here we are searching on the range of answers, where the least
	    // possible ans is 0 and highest is n
        int low = 0;
        int high = n;
        int ans = -1;
        while (low <= high) {
            // Avoiding INT_MAX overflow
            int mid = low + (high-low) / 2;
            // Avoiding overflow during multiplication by promoting to long long 
            if ((long long)mid * mid <= n) {
                low = mid + 1;
                ans = mid;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
};

```

----
## Complexity

### Time Complexity

1. O (log n)

### Space Complexity

1. O (1)

---
## Look out

1. Integer overflows during addition and multiplication.