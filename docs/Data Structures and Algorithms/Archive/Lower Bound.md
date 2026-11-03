---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Upper and Lower Limits]]"
streak: 0
times_reviewed: 0
last_reviewed:
next_review: 2026-11-12
trigger:
unique: false
link: https://takeuforward.org/plus/dsa/problems/lower-bound-?subject=dsa&approach=optimal
---
---

## Question

Given a sorted array of nums and an integer x, write a program to find the **lower bound** of **x**.
The lower bound algorithm finds the first and smallest index in a sorted array where the value at that index is greater than or equal to a given key i.e. x.
If no such index is found, return the size of the array.

### Example

**Input** : nums= [1,2,2,3], x = 2
**Output**:1
**Explanation**:
Index 1 is the smallest index such that arr[1] >= x.

---

## Code

### Brute Force

```cpp
class Solution{
public:
    int lowerBound(vector<int> &arr, int x){
        int n = arr.size();
        // First index with value >= x
        for (int i = 0; i < n; i++) {
            if (arr[i] >= x) {
                return i;
            }
        }
        return n;
    }
};
```

- TC: O(n)
- SC: O(1)

### Optimal 1

```cpp
class Solution{
public:
    int lowerBound(vector<int> &arr, int x){
        int n = arr.size();
        // Initialize the pointers
        int low = 0;
        int high = n-1;
        
        // variable to track answer
        int ans = n;

        // Iterate over the array
        while (low<=high){
            // find mid
            int mid = (low+high)/2;

            // Adjust the pointers
            if (arr[mid]<x) {
                // check right part
                low = mid+1;
            }
            else {
                // possible answer; so update the ans
                ans = mid;
                // check left part
                high = mid-1;
            }
        }
        return ans;
    }
};
```

- TC: O(log n)
    - Every iteration search space is becoming half
- SC: O(1)

---

## Look out

1. We need to find the equal or closest greater value
2. Track the ans in live instead of fetching it later.
