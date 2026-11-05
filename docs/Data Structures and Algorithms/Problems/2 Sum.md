---
pattern: "[[Arrays]]"
SubPattern: "[[Hashing]]"
streak: 2
times_reviewed: 1
last_reviewed: 2026-11-05
next_review: 2026-11-26
trigger: Traverse the array while maintaining hashmap of visited
unique: false
link: https://takeuforward.org/practice/dsa/two-sum
tags:
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

### Brute Force

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& arr, int target) {
        int n = arr.size();
        // Try every pair
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (arr[i] + arr[j] == target) return {i, j};
            }
        }
        return {-1, -1};
    }
};
```

- TC: O(n^2)
- SC: O(1)

### Optimal 1

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

- TC: O(n)
- SC: O(n)

---

## Look out

1. Do it in one pass, update the map as you keep looking.
