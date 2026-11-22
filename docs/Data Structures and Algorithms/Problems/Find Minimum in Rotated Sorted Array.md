---
pattern: "[[Binary Search]]"
SubPattern: "[[Find the Sorted Half]]"
streak: 1
times_reviewed: 1
last_reviewed: 2026-11-20
next_review: 2026-11-27
trigger: Rotated sorted array → two sorted halves → minimum sits at the junction of the two halves
unique: false
link: https://takeuforward.org/practice/dsa/find-minimum-in-rotated-sorted-array?category=binary-search&source=strivers-180-master-dsa-patterns&sidebar=0&tab=solution&solution=binary-search
tags:
  - striver180
---
---

## Question

Given an integer array nums of size N, sorted in ascending order with distinct values, and then **rotated** an unknown number of times (between 1 and N), find the **minimum** element in the array.

### Example

Input : nums = [4, 5, 6, 7, 0, 1, 2, 3]
Output: 0
Explanation: Here, the element 0 is the minimum element in the array.

---

## Key Insight

1. A rotated sorted array always splits into two sorted halves; the minimum sits at the start of the second (smaller) half.
2. `arr[low] <= arr[mid]` → mid is in the left (larger) half → its minimum is `arr[low]`, record it and discard the left half (`low = mid + 1`).
3. `arr[low] > arr[mid]` → mid is in the right (smaller) half → `arr[mid]` is a candidate minimum, record it and discard the right half (`high = mid - 1`).
4. Keep updating `ans` across both cases; the smallest recorded value is the answer.

---

## Code

### Linear Search

```cpp
class Solution {
public:
    // Function to find minimum element in a vector
    int findMin(vector<int>& arr) {
        int n = arr.size();  
        
         // Initialize mini to maximum integer value
        int mini = INT_MAX;   
        for (int i = 0; i < n; i++) {
            
            /* Update mini with the 
            smaller of mini and arr[i]*/
            mini = min(mini, arr[i]);   
        }
        // Return the minimum element found
        return mini;  
    }
};
```

- TC: O(n)
- SC: O(1)

### Binary Search

```cpp
class Solution {
public:
    /* Function to find minimum element
    in a rotated sorted array */
    int findMin(vector<int>& arr) {
        
        // Initialize low and high indices
        int low = 0, high = arr.size() - 1; 
        
        // Initialize ans to maximum integer value
        int ans = INT_MAX;  
        while (low <= high) { 
            int mid = (low + high) / 2; 

            // Check if left part is sorted
            if (arr[low] <= arr[mid]) {
                
                /* Update ans with minimum 
                of ans and arr[low] */
                ans = min(ans, arr[low]);  
                
                // Move to the right part
                low = mid + 1;  
            } 
            else {  
                /* Update ans with minimum 
                of ans and arr[mid] */
                ans = min(ans, arr[mid]);  
                
                // Move to the left part
                high = mid - 1;  
            }
        }
        // Return the minimum element found
        return ans; 
    }
};
```

- TC: O(log n)
- SC: O(1)

---

## Look out

1. The core crux of navigating is at the essence of how rotated sorted array is structured.

---

## Related Problems

1.
