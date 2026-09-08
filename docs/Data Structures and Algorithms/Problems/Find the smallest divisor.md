---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Binary Search On Answer]]"
confidence: 3
unique: false
link: https://takeuforward.org/plus/dsa/problems/find-the-smallest-divisor?subject=dsa&approach=binary-search&sidebar=open
---
---
## Question

Given an array of integers nums and an integer limit as the threshold value, find the **smallest positive integer divisor** such that upon dividing all the elements of the array by this divisor, the sum of the division results is less than or equal to the threshold value.

After dividing each element by the chosen divisor, take the **ceiling** of the result **(i.e., round up to the next whole number)**.
### Example

Input: nums = [1, 2, 3, 4, 5], limit = 8
Output: 3
Explanation: We can get a sum of 15(1 + 2 + 3 + 4 + 5) if we choose 1 as a divisor. 
The sum is 9(1 + 1 + 2 + 2 + 3) if we choose 2 as a divisor. Upon dividing all the elements of the array by 3, we get 1,1,1,2,2 respectively. Now, their sum is equal to 7 <= 8 i.e. the threshold value. So, 3 is the minimum possible answer.

---
## Code

```cpp
class Solution {
   public:
    int func(vector<int>& arr, int divisor) {
        int n = arr.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
	        // integer division results in floor, so first typecast to double;
	        // Do division and then apply the ceil
            ans += ceil((double)arr[i] / (double)divisor);
        }
        return ans;
    }
    int smallestDivisor(vector<int>& arr, int limit) {
        int n = arr.size();
        
        int low = 1;
        // More than than if we go; the sum remains constant
        int high = *max_element(arr.begin(), arr.end());
        int ans = -1;
        while (low <= high) {
            int mid = (low+high) / 2;
            
            int val = func(arr, mid);
            
            if (val > limit) {
                low = mid + 1;
            } else {
                ans = mid;
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

1.  O (log(max(arr)) * n)

### Space Complexity

1. O(1)

---
## Look out

1. While applying ceiling to integer division, first type cast to double.