---
pattern: "[[Arrays]]"
SubPattern: "[[Two Pointers]]"
streak: 0
times_reviewed: 0
last_reviewed:
next_review: 2026-11-09
trigger:
unique: false
link: https://takeuforward.org/practice/dsa/3-sum?category=two-pointers&source=strivers-180-master-dsa-patterns
tags:
  - striver180
---
---

## Question

Given an integer array **nums**. Return all triplets such that:

- i != j, i != k, and j != k
- nums[i] + nums[j] + nums[k] == 0.
Notice that the solution set must not contain duplicate triplets. One element can be a part of multiple triplets. The output and the triplets can be returned in any order.

### Example

Input: nums = [2, -2, 0, 3, -3, 5]
Output: [[-2, 0, 2], [-3, -2, 5], [-3, 0, 3]]
Explanation:
nums[1] + nums[2] + nums[0] = 0
nums[4] + nums[1] + nums[5] = 0
nums[4] + nums[2] + nums[3] = 0

---

## Code

### Brute Force

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        set<vector<int>> tripletSet;
        int n = nums.size();

        // Try every triplet
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                for (int k = j + 1; k < n; k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        vector<int> temp = {nums[i], nums[j], nums[k]};
                        // Sort so duplicate triplets collapse in the set
                        sort(temp.begin(), temp.end());
                        tripletSet.insert(temp);
                    }
                }
            }
        }

        return vector<vector<int>>(tripletSet.begin(), tripletSet.end());
    }
};
```

- TC: O(n^3 x log(no. of unique triplets))
- SC: O(no. of unique triplets)

### Optimal 1

```cpp
class Solution {
public:
    // Function to find triplets having sum equals to target
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Set to store unique triplets
        set<vector<int>> tripletSet;

        int n = nums.size();

        // Check all possible triplets
        for (int i = 0; i < n; i++) {
            // Set to store elements seen so far in the loop
            set<int> hashset;

            for (int j = i + 1; j < n; j++) {
                // Calculate the 3rd element needed to reach target
                int third = - (nums[i] + nums[j]);

                /* Find if third element exists in
                hashset (complements seen so far)*/
                if (hashset.find(third) != hashset.end()) {
                    // Found a triplet that sums up to target
                    vector<int> temp = {nums[i], nums[j], third};
                    
                    /* Sort the triplet to ensure 
                    uniqueness when storing in set*/
                    sort(temp.begin(), temp.end());
                    tripletSet.insert(temp);
                }
                
                /* Insert the current element
                into hashset for future checks*/
                hashset.insert(nums[j]);
            }
        }

        // Convert set to vector (unique triplets)
        vector<vector<int>> ans(tripletSet.begin(), tripletSet.end());

        //Return the ans
        return ans;
    }
};
```

- TC: O(N^2 x log(no. of unique triplets))
- SC: O(2 x no. of the unique triplets) + O(N)

---

## Look out

1. There is other solution by sorting the array and using two pointers

---

## Related Problems

1. [[2 Sum]]
