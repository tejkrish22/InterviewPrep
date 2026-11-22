---
pattern: "[[Binary Search]]"
SubPattern:
  - "[[Binary Search On Answer]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-22
next_review: 2026-11-23
trigger: Do binary search on [0, (max(arr)-min(arr)], to find possibility manually place the cows one by one
unique: false
link: https://takeuforward.org/practice/dsa/aggressive-cows?category=search-on-answer&source=strivers-180-master-dsa-patterns&tab=problem&solution=linear-search&sidebar=0
tags:
  - striver180
---
---

## Question

Given an array nums of size n, which denotes the positions of stalls, and an integer k, which denotes the number of aggressive cows, assign stalls to k cows such that the minimum distance between any two cows is the maximum possible. Find the maximum possible minimum distance.

### Example

Input: n = 6, k = 4, nums = [0, 3, 4, 7, 10, 9]
Output: 3
Explanation:
The maximum possible minimum distance between any two cows will be 3 when 4 cows are placed at positions [0, 3, 7, 10]. Here the distances between cows are 3, 4, and 3 respectively.
In no manner can we increase the minimum distance beyond 3.

---

## Key Insight

1. The least possible distance between two cows is 0, when duplicate stalls are there
2. The max possible distance between two cows is `max(arr) - min(arr)`
3. Do a binary search in this space and find the possibility to place the cows.

---

## Code

### Brute Force

```cpp
class Solution {
private:
    /* Function to check if we can place 'cows' cows
    with at least 'dist' distance apart in 'stalls' */
    bool canWePlace(vector<int> &nums, int dist, int cows) {
        
        // Size of array
        int n = nums.size(); 
        
        // Number of cows placed
        int cntCows = 1; 
        
        // Position of last placed cow
        int last = nums[0]; 
        
        for (int i = 1; i < n; i++) {
            if (nums[i] - last >= dist) {
                
                // Place next cow
                cntCows++; 
                
                // Update the last location
                last = nums[i]; 
            }
            if (cntCows >= cows) return true;
        }
        return false;
    }

public:
    /* Function to find the maximum possible minimum
    distance 'k' cows can have between them in 'stalls' */
    int aggressiveCows(vector<int> &nums, int k) {
        
        // Size of array
        int n = nums.size(); 
        // Sort the nums
        sort(nums.begin(), nums.end());

        int limit = nums[n - 1] - nums[0];
        for (int i = 1; i <= limit; i++) {
            if (canWePlace(nums, i, k) == false) {
                return (i - 1);
            }
        }
        // Return the answer
        return limit;
    }
};
```

- TC: O(n.logn + n.(max-min))
- SC: O(1)

### Optimal 1

```cpp
class Solution {
private:
    /* Function to check if we can place 'cows' cows
    with at least 'dist' distance apart in 'stalls' */
    bool canWePlace(vector<int> &nums, int dist, int cows) {
        
        // Size of array
        int n = nums.size(); 
        
        // Number of cows placed
        int cntCows = 1; 
        
        // Position of last placed cow
        int last = nums[0]; 
        
        for (int i = 1; i < n; i++) {
            if (nums[i] - last >= dist) {
                
                // Place next cow
                cntCows++; 
                
                // Update the last location
                last = nums[i]; 
            }
            if (cntCows >= cows) return true;
        }
        return false;
    }

public:
    /* Function to find the maximum possible minimum
    distance 'k' cows can have between them in 'stalls' */
    int aggressiveCows(vector<int> &nums, int k) {
        
        // Size of array
        int n = nums.size(); 
        // Sort the nums
        sort(nums.begin(), nums.end());
        
        int low = 0, high = nums[n - 1] - nums[0];
		
		int ans = 0;
        //Apply binary search:
        while (low <= high) {
            int mid = (low + high) / 2;
            if (canWePlace(nums, mid, k) == true) {
                low = mid + 1;
                ans = mid;
            }
            else high = mid - 1;
        }
        return high;
    }
};
```

- TC: O(n.logn + log(max-min))
- SC: O(1)

---

## Look out

1. ...

---

## Related Problems

1.
