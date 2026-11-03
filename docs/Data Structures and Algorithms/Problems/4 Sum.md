---
pattern: "[[Arrays]]"
SubPattern: "[[Two Pointers]]"
streak: 0
times_reviewed: 0
last_reviewed:
next_review: 2026-11-08
trigger:
unique: false
link: https://takeuforward.org/practice/dsa/4-sum?category=two-pointers&source=strivers-180-master-dsa-patterns
tags:
  - striver180
---
---

## Question

Given an integer array nums and an integer target. Return all quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

a, b, c, d are all distinct valid indices of nums.
nums[a] + nums[b] + nums[c] + nums[d] == target.
Notice that the solution set must not contain duplicate quadruplets. One element can be a part of multiple quadruplets. The output and the quadruplets can be returned in any order.

### Example

Input: nums = [1, -2, 3, 5, 7, 9], target = 7
Output: `[[-2, 1, 3, 5]]`
Explanation:

nums[1] + nums[0] + nums[2] + nums[3] = 7

---

## Code

### Brute Force

```cpp
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        set<vector<int>> quadSet;
        int n = nums.size();

        // Try every quadruplet
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                for (int k = j + 1; k < n; k++) {
                    for (int l = k + 1; l < n; l++) {
                        long long sum = (long long)nums[i] + nums[j] + nums[k] + nums[l];
                        if (sum == target) {
                            vector<int> temp = {nums[i], nums[j], nums[k], nums[l]};
                            // Sort so duplicate quadruplets collapse in the set
                            sort(temp.begin(), temp.end());
                            quadSet.insert(temp);
                        }
                    }
                }
            }
        }

        return vector<vector<int>>(quadSet.begin(), quadSet.end());
    }
};
```

- TC: O(n^4 x log(no. of unique quadruplets))
- SC: O(no. of unique quadruplets)

### Optimal 1

```cpp
class Solution {
public:
    //function to find quadruplets having sum equals to target
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        // Vector to store the quadruplets that sum up to target
        vector<vector<int>> ans;
        
        int n = nums.size();
        
        // Sort the input array nums
        sort(nums.begin(), nums.end());
        
        // Iterate through the array to find quadruplets
        for (int i = 0; i < n; i++) {
            // Skip duplicates for i
            if (i > 0 && nums[i] == nums[i - 1])
                continue;
            
            for (int j = i + 1; j < n; j++) {
                // Skip duplicates for j
                if (j > i + 1 && nums[j] == nums[j - 1])
                    continue;
                
                // Two pointers approach
                int k = j + 1;
                int l = n - 1;
                
                while (k < l) {
                    long long sum = nums[i] + nums[j] + nums[k] + nums[l];
                    
                    if (sum == target) {
                        // Found a quadruplet that sums up to target
                        vector<int> temp = {nums[i], nums[j], nums[k], nums[l]};
                        ans.push_back(temp);
                        
                        // Skip duplicates for k and l
                        k++;
                        l--;
                        while (k < l && nums[k] == nums[k - 1]) k++;
                        while (k < l && nums[l] == nums[l + 1]) l--;
                    } else if (sum < target) {
                        k++;
                    } else {
                        l--;
                    }
                }
            }
        }
        
        return ans;
    }
};
```

- TC: O(n^3)
- SC: O(1)

---

## Look out

1. Checking Duplicates

---

## Related Problems

1. [[2 Sum]]
2. [[3 Sum]]
