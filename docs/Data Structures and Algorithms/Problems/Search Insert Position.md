---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Upper and Lower Limits]]"
streak: 1
times_reviewed: 0
last_reviewed:
next_review: 2026-11-13
trigger:
unique: false
link: https://takeuforward.org/plus/dsa/problems/search-insert-position?subject=dsa&approach=optimal
---
---

## Question

Given a sorted array of nums consisting of distinct integers and a target value, return the **index**
if the **target** is found. If not, return the index where it would be if it were inserted in order.

### Example

Input: nums = [1, 3, 5, 6], target = 5
Output: 2
Explanation: The target value 5 is found at index 2 in the sorted array. Hence, the function returns 2.

---

## Code

### Brute Force

```cpp
class Solution {
   public:
    int searchInsert(vector<int> &arr, int target) {
        int n = arr.size();
        // first index whose value is >= target
        for (int i = 0; i < n; i++) {
            if (arr[i] >= target) return i;
        }
        return n;
    }
};
```

- TC: O(n)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
   public:
    int searchInsert(vector<int> &arr, int target) {
        int n = arr.size();

        // Initialize pointers
        int low = 0;
        int high = n - 1;

        // Variable to track answer
        int ans = -1;
        // Iterate over the array
        while (low <= high) {
            // Find mid
            int mid = (low + high) / 2;
            // Adjust the pointers
            if (arr[mid]<target){
                low = mid+1;
            }
            else if (arr[mid]==target){
                return mid;
            }
            else {
                ans = mid;
                high = mid-1;
            }
        }
        // [!Edge case] if target > arr[n-1] 
        if (ans==-1) return n;
        return ans;
    }
};

```

- TC: O(log n)
- SC: O(1)

---

## Look out

1. Similar to [[Upper Bound]]
2. *Edge Case: If `target>arr[n-1]`, then return n*
