---
pattern: "[[Binary Search]]"
SubPattern:
  - "[[Binary Search On Answer]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-22
next_review: 2026-11-23
trigger: choose a column, find max element in it and repeat until you get peak element
unique: false
link: https://takeuforward.org/practice/dsa/find-peak-element-ii?category=binary-search&source=strivers-180-master-dsa-patterns
tags:
  - striver180
---
---

## Question

Given a 0-indexed n x m matrix mat where no two adjacent cells are equal, find any **peak element** `mat[i][j]` and return the **array [i, j]**. A peak element in a 2D grid is an element that is strictly greater than all of its adjacent neighbours to the left, right, top, and bottom.

Assume that the entire matrix is surrounded by an outer perimeter with the value -1 in each cell.

**Note: As there can be many peak values, 1 is given as output if the returned index is a peak number, otherwise 0.**

### Example

Input: mat=`[[10, 20, 15], [21, 30, 14], [7, 16, 32]]`
Output: [1, 1]
Explanation: The value at index [1, 1] is 30, which is a peak element because all its neighbours are smaller or equal to it. Similarly, {2, 2} can also be picked as a peak.

---

## Key Insight

1. Choose a column as mid and find max element in that column.
2. This element is obviously larger than its neighbour rows.
3. Now check the neighbour columns and traverse to respective column based on peak element property

---

## Code

### Binary Search

```cpp
class Solution {
public:
    /* Helper function to find the index of the row
    with the maximum element in a given column*/
    int maxElement(vector<vector<int>>& arr, int col) {
        int n = arr.size();
        int max_val = INT_MIN;
        int index = -1;
        
        /* Iterate through each row to find the
        maximum element in the specified column*/
        for (int i = 0; i < n; i++) {
            if (arr[i][col] > max_val) {
                max_val = arr[i][col];
                index = i;
            }
        }
        // Return the index
        return index;
    }
    
    /* Function to find a peak element in 
     the 2D matrix using binary search */
    vector<int> findPeakGrid(vector<vector<int>>& arr) {
        int n = arr.size();     
        int m = arr[0].size();  
        
        /* Initialize the lower bound for 
        and upper bound for binary search */
        int low = 0;           
        int high = m - 1;      
        
        // Perform binary search on columns
        while (low <= high) {
            int mid = (low + high) / 2;  
            
            /* Find the index of the row with the 
            maximum element in the middle column*/
            int row = maxElement(arr, mid);
            
            /* Determine the elements to left and 
            right of middle element in the found row */
            int left = mid - 1 >= 0 ? arr[row][mid - 1] : INT_MIN;
            int right = mid + 1 < m ? arr[row][mid + 1] : INT_MIN;
            
            /* Check if the middle element 
             is greater than its neighbors */
            if (arr[row][mid] > left && arr[row][mid] > right) {
                return {row, mid};  
            } 
            else if (left > arr[row][mid]) {
                high = mid - 1;  
            } 
            else {
                low = mid + 1;
            }
        }
        
        // Return {-1, -1} if no peak element is found
        return {-1, -1};  
    }
};
```

- TC: O(n x log m)
- SC: O(1)

---

## Look out

1. ...

---

## Related Problems

1.
