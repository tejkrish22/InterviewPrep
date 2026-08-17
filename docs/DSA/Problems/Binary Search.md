---
pattern: "[[Binary Search]]"
SubPattern: "[[Core Algorithm]]"
confidence: "5"
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
## Algo

1. Initialise the pointers `low` and `high`.
2. Iterate
	1. Find `mid`
	2. Adjust `low` and `high`
	3. Return `mid`, if found.
3. Return `-1`, if not found.
---
## Code

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

----
## Complexity

### Time Complexity

1. **O(log(N))** (where N is the size of the given array)  
2. In each step, the search space is divided into two halves. 
3. In the worst case, this process will continue until the search space can no longer be divided and the number of divisions required to reduce the array size to one is log(N), making the overall time complexity O(log(N)).

### Space Complexity

1. **O(1)**  
2. Using only a couple of variables.

---
## Look out

1. `while (low<=high)`