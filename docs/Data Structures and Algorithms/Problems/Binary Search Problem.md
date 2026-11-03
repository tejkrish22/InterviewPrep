---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Core Algorithm]]"
streak: 1
last_reviewed:
next_review: 2026-11-15
trigger:
unique: true
link: https://takeuforward.org/plus/dsa/problems/search-x-in-sorted-array?subject=dsa&approach=optimal&sidebar=open
---
---

## Question

Given a sorted array of integers nums with 0-based indexing, find the **index** of a specified **target** integer. If the target is found in the array, return its index. If the target is not found, return -1.

### Example

Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: The target integer 9 exists in nums and its index is 4

---

## Code

### Brute Force

```cpp
class Solution {
public:
    int search(vector<int> &arr, int target) {
        int n = arr.size();
        // Linear scan
        for (int i = 0; i < n; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
};
```

- TC: O(n)
- SC: O(1)

### Optimal 1

```cpp
class Solution{
public:
    int search(vector<int> &arr, int target){
        int n = arr.size();
        
        // Step 1: Initialize the pointers
        int low = 0;
        int high = n-1;
		
		// Step 2: Iterate
        while (low<=high){
	        
	        // Step 2.1: Find Mid
            int mid = (low+high)/2;
            
            // Step 2.2: Adjust the pointers
            if (arr[mid]<target){
                low = mid+1;
            }
            else if (arr[mid]>target){
                high = mid-1;
            }
            else {
                return mid;
            }
        }
        // Step 3: If not found return -1
        return -1;
    }
};
```

- TC: O(log(N))
    - N is the size of the given array.
    - In each step, the search space is divided into two halves.
    - In the worst case, this process will continue until the search space can no longer be divided and the number of divisions required to reduce the array size to one is log(N), making the overall time complexity O(log(N)).
- SC: O(1)
    - Using only a couple of variables.

---

## Look out

1. `while (low<=high)`
