---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Binary Search On Answer]]"
streak: 0
last_reviewed:
next_review: 2026-11-11
trigger:
unique: false
link: https://takeuforward.org/plus/dsa/problems/koko-eating-bananas?subject=dsa&approach=binary-search&tab=submissions
---
---

## Question

A monkey is given n piles of bananas, where the 'ith' pile has nums[i] bananas. An integer h represents the total time in hours to eat all the bananas.
Each hour, the monkey chooses a non-empty pile of bananas and eats k bananas. If the pile contains fewer than k bananas, the monkey eats all the bananas in that pile and does not consume any more bananas in that hour.
Determine the **minimum** number of bananas the monkey must eat per hour to finish all the bananas within h hours.

### Example

Input: n = 4, nums = [7, 15, 6, 3], h = 8
Output: 5
Explanation: If Koko eats 5 bananas/hr, he will take 2, 3, 2, and 1 hour to eat the piles accordingly. So, he will take 8 hours to complete all the piles.

---

## Code

### Brute Force

```cpp
class Solution {
   public:
    int minimumRateToEatBananas(vector<int> arr, int limit) {
        int n = arr.size();
        int maxi = *max_element(arr.begin(), arr.end());

        // Try every rate from 1 to max(arr)
        for (int k = 1; k <= maxi; k++) {
            long long hrs = 0;
            for (int i = 0; i < n; i++) {
                hrs += ceil((double)arr[i] / k);
            }
            if (hrs <= limit) {
                return k;
            }
        }
        return -1;
    }
};
```

- TC: O(n x max(arr))
- SC: O(1)

### Optimal 1

```cpp
class Solution {
   public:
    long long func(vector<int>& arr, int hrs) {
        // use long long to avoid overflow
        long long ans = 0;
        int n = arr.size();

        for (int i = 0; i < n; i++) {
            ans += ceil((double)arr[i] / hrs);
        }
        return ans;
    }
    int minimumRateToEatBananas(vector<int> arr, int limit) {
        int n = arr.size();

        int low = 1;
        int high = *max_element(arr.begin(), arr.end());

        int ans = -1;

        while (low <= high) {
            int mid = low + (high-low) / 2;

            long long hrs = func(arr, mid);

            if (hrs <= limit) {
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

- TC: O(n x log(max))
- SC: O(1)

---

## Look out

1. Always look out for declaring `long long`, `double` to avoid overflow or precision loss issues
