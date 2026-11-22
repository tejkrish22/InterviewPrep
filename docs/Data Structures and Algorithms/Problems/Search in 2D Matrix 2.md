---
pattern: "[[Binary Search]]"
SubPattern: "[[Core Algorithm]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-22
next_review: 2026-11-23
trigger: "{0,n-1} is the vantage point"
unique: true
link: https://takeuforward.org/practice/dsa/search-in-2d-matrix-ii?category=binary-search&source=strivers-180-master-dsa-patterns
tags:
  - striver180
---
---

## Question

Given a 2D array matrix where each row is sorted in ascending order from left to right and each column is sorted in ascending order from top to bottom, write an efficient algorithm to search for a specific integer **target** in the matrix.

### Example

Input: matrix = [ [1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30] ], target = 5
Output: True
Explanation: The target 5 exists in the matrix in the index (1,1)

---

## Key Insight

1. The vantage point {0,n-1} helps in eliminating part of the matrix.

---

## Code

### Linear Search combined with Binary Search

```cpp
class Solution {
private:
    //Helper function to perform binary search
    bool binarySearch(vector<int>& nums, int target) {
        int n = nums.size(); 
        int low = 0, high = n - 1;

        // Perform the steps:
        while (low <= high) {
            int mid = (low + high) / 2;
            
            //Return true if target is found
            if (nums[mid] == target) return true;
            else if (target > nums[mid]) low = mid + 1;
            else high = mid - 1;
        }
        //Return false if target not found
        return false;
    }
public:
    //Function to search for a given target in matrix
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = matrix.size();
        int m = matrix[0].size();
        
        //Traverse through each row
        for (int i = 0; i < n; i++) {
            
            /*Check if target is 
            present in the current row*/
            bool flag =  binarySearch(matrix[i], target);
            
            if (flag) return true;
        }
        // Return false if target is not found
        return false; 
    }
};
```

- TC: O(n x log m)
- SC: O(1)

### Pure Binary Search by traversing through vantage points

```cpp
class Solution {
public:
    //Function to search for a given target in matrix
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = matrix.size();
        int m = matrix[0].size();
        
        //Intialize the row and col
        int row = 0, col = m - 1;

        //Traverse the matrix from (0, m-1):
        while (row < n && col >= 0) {
            
            //Return true of target is found
            if (matrix[row][col] == target) return true;
            else if (matrix[row][col] < target) row++;
            else col--;
        }
        //Return false if target not found
        return false;
    }
};
```

- TC: O(n + m)
- SC: O(1)

---

## Look out

1. ...

---

## Related Problems

1.
