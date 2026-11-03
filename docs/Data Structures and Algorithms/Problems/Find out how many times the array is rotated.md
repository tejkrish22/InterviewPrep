---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Find the Sorted Half]]"
streak: 0
last_reviewed:
next_review: 2026-11-10
trigger:
unique: false
link: https://takeuforward.org/plus/dsa/problems/find-out-how-many-times-the-array-is-rotated?subject=dsa&approach=binary-search
---
---

## Question

Given an integer array nums of size n, sorted in ascending order with distinct values. The array has been **right** **rotated** an unknown number of times, between 0 and n-1 (including). Determine the **number** of rotations performed on the array.

### Example

Input : nums = [4, 5, 6, 7, 0, 1, 2, 3]
Output: 4
Explanation: The original array should be [0, 1, 2, 3, 4, 5, 6, 7]. So, we can notice that the array has been rotated 4 times.

---

## Code

### Brute Force

```cpp
class Solution {
public:
    int findKRotation(vector<int> &arr)  {
        int n = arr.size();
        // Index of the minimum element is the rotation count
        int ind = 0;
        for (int i = 1; i < n; i++) {
            if (arr[i] < arr[ind]) {
                ind = i;
            }
        }
        return ind;
    }
};
```

- TC: O(n)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
public:
    int findKRotation(vector<int> &arr)  {
        int n = arr.size();

        int low = 0;
        int high = n-1;

        int ans = INT_MAX;
        int ind = -1;
        while (low<=high){
            int mid = (low+high)/2;
            // if left half is sorted
            if (arr[low]<=arr[mid]){
                if (arr[low]<ans){
                    ans = arr[low];
                    ind = low;
                }
                low = mid + 1;
            }
            // if right half is sorted
            else if (arr[mid]<=arr[high]){
                if (arr[mid]<ans){
                    ans = arr[mid];
                    ind = mid;
                }
                high = mid - 1;
            }
        }
        return ind;
    }
};
```

- TC: O(log n)
- SC: O(1)

---

## Look out

1. This question is similar to [[Find Minimum In Sorted Array]].
2. The index of the minimum element is the number of times the array is rotated.
