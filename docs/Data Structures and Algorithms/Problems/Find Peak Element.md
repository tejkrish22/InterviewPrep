---
pattern: "[[Binary Search]]"
SubPattern:
  - "[[Core Algorithm]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-17
next_review: 2026-11-18
trigger: apply binary search to find the peak based on increasing or decreasing side
unique: false
link: https://takeuforward.org/practice/dsa/find-peak-element?category=binary-search&source=strivers-180-master-dsa-patterns&sidebar=0&tab=problem&solution=binary-search
tags:
  - striver180
---
---

## Question

Given an array arr of integers. A peak element is defined as an element greater than both of its neighbors.
Formally, if arr[i] is the peak element, arr[i - 1] < arr[i] and arr[i + 1] < arr[i].
Find the index(0-based) of a peak element in the array. If there are multiple peak numbers, return the index of any peak number.

Note:

- As there can be many peak values, "true" is given as output if the returned index is a peak number, otherwise the returned value of index.
- The first and last elements of the array can also be considered peak elements. For boundary elements, assume the missing neighbour is smaller than any possible element in the array.

### Example

**Input** : arr = [1, 2, 3, 4, 5, 6, 7, 8, 5, 1]
**Output**: 7
**Explanation**: In this example, there is only 1 peak that is at index 7.

---

## Key Insight

1. Make use of monotonic increase or decrease with binary search and navigate through the array.

---

## Code

### Linear Search

```cpp
class Solution {
public:
    // Function to find the peak element in the array
    int findPeakElement(vector<int> &arr) {
        // Size of array
        int n = arr.size();
        
        /* Iterate through the array
        to find the peak element */
        for (int i = 0; i < n; i++) {
            
            // Check if arr[i] is a peak
            if ((i == 0 || arr[i - 1] < arr[i]) && (i == n - 1 || arr[i] > arr[i + 1])) {
                
                //Return the index of peak element
                return i; 
            }
        }
        /* Return -1 if no peak element
        found (dummy return) */
        return -1; 
    }
};
```

- TC: O(n)
- SC: O(1)

### Binary Search

```cpp
class Solution {
public:
    // Function to find the peak element in the array
    int findPeakElement(vector<int> &arr) {
        // Size of array
        int n = arr.size();
        
        // Edge cases:
        if (n == 1) return 0;
        if (arr[0] > arr[1]) return 0;
        if (arr[n - 1] > arr[n - 2]) return n - 1;

        int low = 1, high = n - 2;
        while (low <= high) {
            int mid = (low + high) / 2;

            //If arr[mid] is the peak
            if (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1])
                return mid;

            // If we are in the left
            if (arr[mid-1] < arr[mid]) low = mid + 1;

            /* If we are in the right
            Or, arr[mid] is a common point*/
            else high = mid - 1;
        }
        /* Return -1 if no peak element
        found (dummy return) */
        return -1; 
    }
};
```

- TC: O(log n)
- SC: O(1)

---

## Look out

1. `low` and `high` are initialised to 1 and `n-2` respectively to make sure `mid-1` and `mid+1` are accessible
2. Anyway we are checking boundaries explicitly.

---

## Related Problems

1.
