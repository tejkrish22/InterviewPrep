---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Binary Search On Answer]]"
confidence: 4
unique: false
link: https://takeuforward.org/plus/dsa/problems/minimum-days-to-make-m-bouquets?subject=dsa&approach=binary-search
---
---
## Question

Given n roses and an array nums where nums[i] denotes that the 'ith' rose will bloom on the nums[i]th day, only adjacent bloomed roses can be picked to make a bouquet. Exactly k adjacent bloomed roses are required to make a single bouquet. Find the **minimum number of days** required to make at least m bouquets, each containing k roses. Return -1 if it is not possible.
### Example

Input: n = 8, nums = [7, 7, 7, 7, 13, 11, 12, 7], m = 2, k = 3
Output: 12
Explanation: On the 12th the first 4 flowers and the last 3 flowers would have already bloomed. So, we can easily make 2 bouquets, one with the first 3 and another with the last 3 flowers.

---
## Code

```cpp
class Solution {
   public:
    int func(vector<int> arr, int ith_day, int k, int m) {
        int n = arr.size();
        // clamp the values to 0 for easy calculation
        for (int i = 0; i < n; i++) {
            arr[i] = max(0, arr[i] - ith_day);
        }
        int currentRoses = 0;
        int currentBoqs = 0;

        for (int i = 0; i < n; i++) {
            if (arr[i] == 0)
                currentRoses += 1;
            else
                currentRoses = 0;
            if (currentRoses == k) {
                currentBoqs += 1;
                currentRoses = 0;
            }
        }
        return currentBoqs;
    }
    int roseGarden(int n, vector<int> arr, int k, int m) {
        if (n < (m * k)) return -1;
		// low is minimum no. of days possible
        int low = *min_element(arr.begin(), arr.end());
        // high is maximum no. of days possible
        int high = *max_element(arr.begin(), arr.end());
        int ans = -1;
        while (low <= high) {
            int mid = (low + high) / 2;

            int possible = func(arr, mid, k, m);
            if (possible >= m) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
};
```

----
## Complexity

### Time Complexity

1. O (log(max-min+1) x n)

### Space Complexity

1. O (1)

---
## Look out

1. Make sure that the array is passed by value but not reference, when you are modifying the array in the called function.