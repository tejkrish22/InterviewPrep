---
pattern: "[[Arrays]]"
SubPattern:
confidence: 4
unique: false
link: https://neetcode.io/problems/two-integer-sum/question
tags:
  - nc150
---
---

## Question

Given an array of integers `nums` and an integer `target`, return the indices `i` and `j` such that `nums[i] + nums[j] == target` and `i != j`.
You may assume that *every* input has exactly one pair of indices `i` and `j` that satisfy the condition.
Return the answer with the smaller index first.

### Example

Input: nums = [3,4,5,6], target = 7
Output: [0,1]

---

## Code

```cpp
class Solution {
   public:
    vector<int> twoSum(vector<int>& arr, int target) {
        int n = arr.size();

        unordered_map<int, int> mpp;

        for (int i = 0; i < n; i++) {
            int other = target - arr[i];
            auto it = mpp.find(other);
            if (it != mpp.end()) {
                return {mpp[other],i};
            }
            mpp.insert({arr[i], i});
        }
        return {-1, -1};
    }
};

```

---

## Complexity

### Time Complexity

1. O(n)

### Space Complexity

1. O(n)

---

## Look out

1. Do it in one pass, update the map as you keep looking.
