---
pattern: "[[Binary Search]]"
SubPattern:
  - "[[Core Algorithm]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-20
next_review: 2026-11-21
trigger: When duplicates are try to trim down the search space
unique: false
link: https://takeuforward.org/practice/dsa/search-in-rotated-sorted-array-2?category=binary-search&source=strivers-180-master-dsa-patterns&sidebar=0&tab=solution&solution=optimal
tags:
  - striver180
---
---

## Question

Given an integer array nums, sorted in ascending order (may contain duplicate values) and a target value **k**. Now the array is **rotated** at some pivot point unknown to you. Return True if k is present and otherwise, return False.

### Example

Input : nums = [7, 8, 1, 2, 3, 3, 3, 4, 5, 6], k = 3
Output: True
Explanation: The element 3 is present in the array. So, the answer is True.

---

## Key Insight

1. The edge occurs when `arr[low] == arr[mid] == arr[high]`.
2. Then reduce the search space by `low++ and high--`and continue the search
3. Rest everything is same as how you do for unique elements

---

## Code

### Linear Search

```cpp
class Solution {
public:
    // Function to search for the k element in a rotated sorted array
    bool searchInARotatedSortedArrayII(vector<int>& nums, int  k) {
        int n = nums.size(); 
        
        // Traverse the array to find the k element
        for (int i = 0; i < n; i++) {
        
            // If the current element matches the k, return true
            if (nums[i] == k) return true;
        }

        // If the k is not found, return false
        return false;
    }
};
```

- TC: O(n)
- SC: O(1)

### Binary Search

```cpp
class Solution {
public:
    /*  Function to search for the k element 
        in a rotated sorted array with duplicates   */
    bool searchInARotatedSortedArrayII(vector<int>& nums, int k) {
        int n = nums.size();
        int low = 0, high = n - 1;
        
        // Applying binary search algorithm 
        while (low <= high) {
            int mid = (low + high) / 2;

            // Check if mid points to the k
            if (nums[mid] == k) return true;

            // Handle duplicates: if nums[low], nums[mid], and nums[high] are equal
            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low = low + 1;
                high = high - 1;
                continue;
            }

            // Check if the left part is sorted
            if (nums[low] <= nums[mid]) {
                /*  Eliminate the right part if k
                    exists in the left sorted part */
                if (nums[low] <= k && k <= nums[mid]) {
                    high = mid - 1;
                } 
                // Otherwise eliminate the left part
                else {
                    low = mid + 1;
                }
            } else {
                /*  If the right part is sorted and
                    k exists in the right sorted
                    part, eliminate the left part   */
                if (nums[mid] <= k && k <= nums[high]) {
                    low = mid + 1;
                } 
                // Otherwise eliminate the right part
                else {
                    high = mid - 1;
                }
            }
        }
        // If k is not found
        return false;
    }
};
```

- TC: O(log n); in worst case O(n)
- SC: O(1)

---

## Look out

1. ...

---

## Related Problems

1.
