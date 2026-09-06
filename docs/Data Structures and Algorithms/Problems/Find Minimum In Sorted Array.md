---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Find the Sorted Half]]"
confidence: 1
unique: true
link: https://takeuforward.org/plus/dsa/problems/find-minimum-in-rotated-sorted-array?subject=dsa&approach=binary-search&tab=editorial
---
---
## Question

Given an integer array nums of size N, sorted in ascending order with distinct values, and then **rotated** an unknown number of times (between 1 and N), find the **minimum** element in the array.
### Example

Input : nums = [4, 5, 6, 7, 0, 1, 2, 3]
Output: 0
Explanation: Here, the element 0 is the minimum element in the array.

---
## Code

```cpp
class Solution {
   public:
    int findMin(vector<int> &arr) {
        int n = arr.size();

        int low = 0;
        int high = n-1;
        
        int ans = INT_MAX;
        while (low<=high){
            int mid = (low+high)/2;
            
            // Find the sorted half
            // If left half is sorted
            if (arr[low]<=arr[mid]){
                // update current min
                if (ans>arr[low]) {
                    ans = arr[low];
                }
                // move to unsorted part
                low = mid + 1;
            }
            // if right half is sorted
            else if (arr[mid]<=arr[high]){
                // update current min
                if (ans>arr[mid]){
                    ans = arr[mid];
                }
	            // move to unsorted part
                high = mid - 1;
            }
        }
        return ans;
    }
};
```

----
## Complexity

### Time Complexity

1. O (log n)

### Space Complexity

1. O(1)

---
## Look out

1. Find the sorted half
2. Grab the minimum if required in sorted half
3. Move to unsorted half