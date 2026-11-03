---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Upper and Lower Limits]]"
streak: 1
last_reviewed:
next_review: 2026-11-16
trigger:
unique: false
link: https://takeuforward.org/plus/dsa/problems/first-and-last-occurrence?subject=dsa&approach=optimal
---
---

## Question

Given an array of integers nums sorted in non-decreasing order, find the **starting** and **ending** position of a given target value. If the target is not found in the array, return [-1, -1].

### Example

Input: nums = [5, 7, 7, 8, 8, 10], target = 8
Output: [3, 4]
Explanation:The target is 8, and it appears in the array at indices 3 and 4, so the output is [3,4]

---

## Code

### Brute Force

```cpp
class Solution{
public:
    vector<int> searchRange(vector<int> &arr, int target) {
        int n = arr.size();
        int first = -1, last = -1;
        for (int i = 0; i < n; i++) {
            if (arr[i] == target) {
                if (first == -1) first = i;
                last = i;
            }
        }
        return {first, last};
    }
};
```

- TC: O(n)
- SC: O(1)

### Optimal 1

```cpp
class Solution{
public:
    int firstOccurance (vector<int> &arr, int target){
        int n = arr.size();

        int low = 0;
        int high = n-1;
        
        int ans = -1;
        while (low<=high){
            int mid = (low+high)/2;

            if (arr[mid]<target){
                low = mid+1;
            }
            else if (arr[mid]==target){
                ans = mid;
                high = mid-1;
            }
            else {
                high = mid-1;
            }
        }
        return ans;
    }

    int lastOccurance (vector<int> &arr, int target){
        int n = arr.size();

        int low = 0;
        int high = n-1;
        
        int ans = -1;
        while (low<=high){
            int mid = (low+high)/2;

            if (arr[mid]<target){
                low = mid+1;
            }
            else if (arr[mid]==target){
                ans = mid;
                low = mid+1;
            }
            else {
                high = mid-1;
            }
        }
        return ans;
    }

    vector<int> searchRange(vector<int> &arr, int target) {
        return {firstOccurance(arr,target),lastOccurance(arr,target)};
    }
};
```

- TC: O(log n)
- SC: O(1)

---

## Look out

1.
