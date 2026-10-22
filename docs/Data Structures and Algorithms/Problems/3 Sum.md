---
pattern: "[[Arrays]]"
SubPattern: "[[Two Pointers]]"
confidence: 3
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

---

## Complexity

### Time Complexity

1. O(N^2 x log(no. of unique triplets))

### Space Complexity

1. O(2 x no. of the unique triplets) + O(N)

---

## Look out

1. There is other solution by sorting the array and using two pointers

---

## Related Problems

1. [[2 Sum]]
