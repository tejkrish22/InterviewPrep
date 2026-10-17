---
pattern: "[[Arrays]]"
SubPattern: "[[Two Pointers]]"
confidence: 3
unique: false
link: https://takeuforward.org/practice/dsa/sort-an-array-of-0's-1's-and-2's?category=two-pointers&source=strivers-180-master-dsa-patterns
tags:
  - striver180
---
---

## Question

Given an array **nums** consisting of only 0, 1, or 2. Sort the array in non-decreasing order.
The sorting must be done in-place, without making a copy of the original array.

### Example

**Input**: nums = [1, 0, 2, 1, 0]
**Output**: [0, 0, 1, 1, 2]
**Explanation**:
The nums array in sorted order has 2 zeroes, 2 ones and 1 two

---

## Code

```cpp
class Solution {
public:
    // Function to sort the array containing only 0s, 1s, and 2s
    void sortZeroOneTwo(vector<int>& nums) {
        
        // 3 pointers: low, mid, high
        int low = 0, mid = 0, high = nums.size() - 1; 
        while (mid <= high) {
            if (nums[mid] == 0) {
                
                /* Swap nums[low] and nums[mid], then 
                 move both low and mid pointers forward*/
                swap(nums[low], nums[mid]);
                low++;
                mid++;
                
            }
            else if (nums[mid] == 1) {
                // Move mid pointer forward
                mid++;
            }
            else {
                /* Swap nums[mid] and nums[high], 
                then move high pointer backward*/
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};
```

---

## Complexity

### Time Complexity

1. O(n)

### Space Complexity

1. O(1)

---

## Look out

1. Division goes like this

| 0   | 0     | 1   | 1   | 1     | 0   | 2   | 1    | 2      | 2   |
| --- | ----- | --- | --- | ----- | --- | --- | ---- | ------ | --- |
| 0   | low-1 | low |     | mid-1 | mid |     | high | high+1 | n-1 |
