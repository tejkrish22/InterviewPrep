---
pattern: "[[Arrays]]"
SubPattern:
confidence: 5
unique: false
link: https://neetcode.io/practice/practice/neetcode150?topics=Arrays%20%26%20Hashing,Two%20Pointers,Sliding%20Window,Binary%20Search,Linked%20List,Stack,Trees,Heap%20%2F%20Priority%20Queue,Graphs,Advanced%20Graphs,Greedy,Backtracking
tags:
  - "#nc150"
---
---

## Question

Given an integer array `nums`, return `true` if any value appears **more than once** in the array, otherwise return `false`.

### Example

Input: nums = [1, 2, 3, 3]
Output: true

---

## Code

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

---

## Complexity

### Time Complexity

1. O(n)

### Space Complexity

1. O(n)

---

## Look out

1. ...
