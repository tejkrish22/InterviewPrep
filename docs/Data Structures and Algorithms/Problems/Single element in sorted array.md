---
pattern: "[[Binary Search]]"
SubPattern:
  - "[[Core Algorithm]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-20
next_review: 2026-11-21
trigger: |-
  0 1 2 3 4 5 6 7 8 9 10
  e o e o e o e o e o e
  1 1 2 2 3 3 4 5 5 6 6
unique: false
link: https://takeuforward.org/practice/dsa/single-element-in-sorted-array?category=binary-search&source=strivers-180-master-dsa-patterns&sidebar=0
tags:
  - striver180
---
---

## Question

Given an array nums sorted in non-decreasing order. Every number in the array except one appears twice. Find the **single** number in the array.

### Example

Input :nums = [1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]
Output:4
Explanation: Only the number 4 appears once in the array.

---

## Key Insight

1. The pattern in which the number repeats changes from `{e,o}` to `{o,e}`
2. We take this as decision and navigate through the array

---

## Code

### Brute Force

```cpp
class Solution {
public:
    /* Function to find the single non
    duplicate element in a sorted array  */
    int singleNonDuplicate(vector<int>& nums) {
        int n = nums.size(); // Size of the array.
        
        /* If array has only one element
         return it immediately.*/
        if (n == 1) return nums[0];

        /* Traverse through the array to find 
        the single non-duplicate element.*/
        for (int i = 0; i < n; i++) {
            // Check for the first index.
            if (i == 0) {
                if (nums[i] != nums[i + 1])
                    return nums[i];
            }
            // Check for the last index.
            else if (i == n - 1) {
                if (nums[i] != nums[i - 1])
                    return nums[i];
            }
            // Check for any other index.
            else {
                if (nums[i] != nums[i - 1] && nums[i] != nums[i + 1])
                    return nums[i];
            }
        }

        /* Dummy return statement,
        should never reach here.*/
        return -1;
    }
};
```

- TC: O(n)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int> &arr) {
        int n = arr.size();

        // 0 1 2 3 4 5 6 7 8
        // e o e o e o e o e

        //{e o} -> {o e}

        int low = 0;
        int high = n-1;

        while (low<=high){
            int mid = (low+high)/2;

            if (arr[mid-1]!=arr[mid] and arr[mid]!=arr[mid+1]){
                return arr[mid];
            }
            if (mid%2==0){
                if (arr[mid]==arr[mid+1])
                    low = mid + 1;
                else {
                    high = mid - 1;
                }
            }
            else {
                if (arr[mid-1]==arr[mid]){
                    low = mid + 1;
                }
                else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
};
```

- TC: O(log n)
- SC: O(1)

---

## Look out

1. ...

---

## Related Problems

1.
