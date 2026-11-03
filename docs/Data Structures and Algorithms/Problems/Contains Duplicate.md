---
pattern: "[[Arrays]]"
SubPattern:
streak: 1
last_reviewed:
next_review: 2026-11-15
trigger:
unique: false
link: https://neetcode.io/practice/practice/neetcode150?topics=Arrays%20%26%20Hashing,Two%20Pointers,Sliding%20Window,Binary%20Search,Linked%20List,Stack,Trees,Heap%20%2F%20Priority%20Queue,Graphs,Advanced%20Graphs,Greedy,Backtracking
tags:
  - nc150
---
---

## Question

Given an integer array `nums`, return `true` if any value appears **more than once** in the array, otherwise return `false`.

### Example

Input: nums = [1, 2, 3, 3]
Output: true

---

## Code

### Brute Force

```cpp
class Solution {
public:
    bool hasDuplicate(vector<int>& nums) {
        int n = nums.size();
        // Compare every pair
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] == nums[j]) return true;
            }
        }
        return false;
    }
};
```

- TC: O(n^2)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
public:
    bool hasDuplicate(vector<int>& nums) {
        int n = nums.size();
        unordered_map<int,int> mpp;

        for (int i=0; i<n; i++){
            mpp[nums[i]]++;
            if (mpp[nums[i]]==2) return true;
        }
        return false;
    }
};
```

- TC: O(n)
- SC: O(n)

---

## Look out

1. ...
