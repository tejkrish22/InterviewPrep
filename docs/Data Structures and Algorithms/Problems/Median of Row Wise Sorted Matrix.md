---
pattern: "[[Binary Search]]"
SubPattern:
  - "[[Binary Search On Answer]]"
streak: 1
times_reviewed: 1
last_reviewed: 2026-11-25
next_review: 2026-12-02
trigger: median is the smallest value x for which more than half of the elements are ≤ x
unique: true
link: https://takeuforward.org/practice/dsa/matrix-median?category=search-on-answer&source=strivers-180-master-dsa-patterns&tab=problem&solution=optimal
tags:
  - striver180
---
---

## Question

Given a 2D array **matrix** that is row-wise sorted. The task is to find the median of the given matrix.

### Example

Input: matrix=[ [1, 4, 9], [2, 5, 6], [3, 7, 8] ]
Output: 5
Explanation: If we find the linear sorted array, the array becomes 1 2 3 4 5 6 7 8 9. So, median = 5

---

## Key Insight

1. Median Definition: The median is the middle element when all elements are arranged in sorted order. For an odd number of elements \(N\), it is the \((N/2)+1\)th smallest element (using integer division).
2. Median & Element Count: The median is the smallest value x for which more than half of the elements are ≤ x. In other words, count(x) > N/2.
3. Binary Search on Answer: Search between the minimum and maximum matrix elements. For each mid, count how many elements are <= mid using Upper Bound on each sorted row.
4. Search Direction: If count(mid) <= N/2, move right (low = mid + 1); otherwise, mid is a potential answer, so move left (high = mid - 1) to find the smallest valid value.

---

## Code

### Flatten the matrix, sort and find median

```cpp
class Solution {
public:
    // Function to find the median of a row-wise sorted matrix
    int findMedian(vector<vector<int>>& matrix) {
        // Step 1: Flatten the matrix into a single list
        vector<int> flattened;
        for (auto& row : matrix) {
            for (int val : row) {
                flattened.push_back(val);
            }
        }

        // Step 2: Sort the flattened list
        sort(flattened.begin(), flattened.end());

        // Step 3: Return the middle element
        int n = flattened.size();
        return flattened[n / 2];
    }
};
```

- TC: O(mn x log (mn))
- SC: O(mn)

### Using Binary Search

```cpp
class Solution {
private:
    // Function to find the upper bound of an element in a sorted row
    int upperBound(vector<int>& arr, int x, int m) {
        int low = 0, high = m - 1;
        int ans = m; // Default answer is beyond the array size

        // Apply binary search
        while (low <= high) {
            int mid = (low + high) / 2;

            // If arr[mid] > x, it can be a possible upper bound
            if (arr[mid] > x) {
                ans = mid;
                // Look for smaller upper bound on the left
                high = mid - 1;
            } else {
                low = mid + 1; 
            }
        }
        return ans; // Return the upper bound
    }

    // Function to count how many elements in the matrix are less than or equal to x
    int countSmallEqual(vector<vector<int>>& matrix, int n, int m, int x) {
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            cnt += upperBound(matrix[i], x, m); // Count the elements in each row
        }
        return cnt; // Return total count
    }

public:
    // Function to find the median element in a sorted matrix
    int findMedian(vector<vector<int>>& matrix) {
        int n = matrix.size(); // Number of rows
        int m = matrix[0].size(); // Number of columns
        
        int low = INT_MAX, high = INT_MIN;

        // Initialize low and high to the first and last elements of the matrix
        for (int i = 0; i < n; i++) {
            low = min(low, matrix[i][0]);
            high = max(high, matrix[i][m - 1]);
        }

        // We need the element at the (n*m)/2th position
        int req = (n * m) / 2;

        // Perform binary search to find the median
        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Count how many elements are less than or equal to mid
            int smallEqual = countSmallEqual(matrix, n, m, mid);

            // Adjust search bounds based on the count
            if (smallEqual <= req) low = mid + 1;
            else high = mid - 1;
        }

        return low; // The answer is the low value after the binary search
    }
};


```

- TC: O(m x log(n) x log(v)); v = max - min
- SC: O(1)

---

## Look out

1. ...

---

## Related Problems

1.
