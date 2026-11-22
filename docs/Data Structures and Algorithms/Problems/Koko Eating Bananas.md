---
pattern: "[[Binary Search]]"
SubPattern: "[[Binary Search On Answer]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-22
next_review: 2026-11-23
trigger: Minimize a rate/value over a monotonic feasibility space → binary search on the answer range
unique: false
link: https://takeuforward.org/practice/dsa/koko-eating-bananas?category=search-on-answer&source=strivers-180-master-dsa-patterns&sidebar=0&tab=solution&solution=binary-search
tags:
  - striver180
---
---

## Question

A monkey is given n piles of bananas, where the 'ith' pile has nums[i] bananas. An integer h represents the total time in hours to eat all the bananas.
Each hour, the monkey chooses a non-empty pile of bananas and eats k bananas. If the pile contains fewer than k bananas, the monkey eats all the bananas in that pile and does not consume any more bananas in that hour.
Determine the minimum number of bananas the monkey must eat per hour to finish all the bananas within h hours.

### Example

Input: n = 4, nums = [7, 15, 6, 3], h = 8
Output: 5
Explanation: If Koko eats 5 bananas/hr, he will take 2, 3, 2, and 1 hour to eat the piles accordingly. So, he will take 8 hours to complete all the piles.

---

## Key Insight

1. The answer (eating rate) lies in a range `[1, max(piles)]` — higher rate always means fewer hours, so feasibility is monotonic → binary search on that range.
2. For each candidate rate `mid`, check if Koko can finish in `≤ h` hours. Hours for one pile = `ceil(pile / rate)`.
3. If valid, record `mid` as current best and try smaller (`high = mid - 1`). If invalid, force bigger (`low = mid + 1`).
4. Don't return `low` blindly — use an explicit `ans` variable updated every time `isValid(mid)` is true; it's clearer and harder to get wrong.

---

## Code

### Brute Force - Linear Search

```cpp
class Solution {
private:
    // Helper function to find the maximum element in the vector 
    int findMax(vector<int> &v) {
        int maxi = INT_MIN;
        int n = v.size();
        
        // Find the maximum element
        for (int i = 0; i < n; i++) {
            maxi = max(maxi, v[i]);
        }
        return maxi;
    }

    /* Helper function to calculate total hours
    required at given hourly rate */
    long long calculateTotalHours(vector<int> &v, int hourly) {
        long long totalH = 0;
        int n = v.size();
        
        // Calculate total hours required
        for (int i = 0; i < n; i++) {
            totalH += ceil((double)(v[i]) / (double)(hourly));
        }
        return totalH;
    }

public:
    // Function to find the minimum rate to eat bananas 
    int minimumRateToEatBananas(vector<int> nums, int h) {
        // Find the maximum number of bananas
        int maxi = findMax(nums);

        /* Find the minimum value of k
        that satisfies the condition*/
        for (int i = 1; i <= maxi; i++) {
            long long reqTime = calculateTotalHours(nums, i);
            if (reqTime <= (long long)h) {
                return i;
            }
        }

        /* Dummy return statement (should 
        not be reached in valid cases)*/
        return maxi;
    }
};
```

- TC: O(max * N)
- SC: O(1)

### Optimal 1 - Binary Search on Answer

```cpp
class Solution {
private:
    /* Helper function to find the
    maximum element in the vector */
    int findMax(vector<int>& nums) {
        int maxi = INT_MIN;
        int n = nums.size();
        
        // Find the maximum element
        for (int i = 0; i < n; i++) {
            maxi = max(maxi, nums[i]);
        }
        return maxi;
    }

    /* Helper function to calculate total 
    hours required at given hourly rate */
    long long calculateTotalHours(vector<int>& nums, int hourly) {
        long long totalH = 0;
        int n = nums.size();
        
        // Calculate total hours required
        for (int i = 0; i < n; i++) {
            totalH += ceil((double) nums[i] / (double) hourly);
        }
        return totalH;
    }

public:
    /* Function to find the 
    minimum rate to eat bananas */
    int minimumRateToEatBananas(vector<int>& nums, int h) {
        // Initialize binary search bounds
        int low = 1, high = findMax(nums);
        int ans = high; // worst case: eat the largest pile per hour
        // Apply binary search
        while (low <= high) {
            int mid = (low + high) / 2;
            long long totalH = calculateTotalHours(nums, mid);
            if (totalH <= h) {
                ans = mid;       // valid → record, try smaller
                high = mid - 1;
            } else {
                low = mid + 1;   // too slow → need bigger rate
            }
        }
        return ans;
    }
};
```

- TC: O(log (max) x n)
- SC: O(1)

---

## Look out

1. Hours per pile = `ceil(pile / rate)` — use `ceil((double)pile / rate)` or the integer trick `(pile + rate - 1) / rate` to avoid floating point.
2. Use `long long` for total hours — sum of ceilings can overflow `int` for large inputs.
3. Search range is `[1, max(piles)]` not `[1, sum(piles)]` — rate above the largest pile gives no benefit.

---

## Related Problems

1.
