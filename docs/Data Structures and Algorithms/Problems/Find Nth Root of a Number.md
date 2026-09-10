---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Binary Search On Answer]]"
confidence: 2
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

----
## Complexity

### Time Complexity

1. In worst case O (n x log m)
2. If we use binary exponentiation for power calculation then, O (log n x log m)

### Space Complexity

1. O (1)

---
## Look out

1. Overflow issues
2. Power Calculation - Binary Exponentiation