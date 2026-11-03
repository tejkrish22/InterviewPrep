---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Upper and Lower Limits]]"
streak: 0
times_reviewed: 0
last_reviewed:
next_review: 2026-11-13
trigger:
unique: false
link: https://takeuforward.org/plus/dsa/problems/upper-bound?subject=dsa&approach=optimal
---
---

## Question

Given a sorted array of nums and an integer x, write a program to find the **upper bound** of **x**.
The **upper bound** of **x** is defined as the **smallest index** i such that **nums[i] > x**.
If no such index is found, return the size of the array.

### Example

**Input** : n= 4, nums = [1,2,2,3], x = 2
**Output**:3
**Explanation**:
Index 3 is the smallest index such that arr[3] > x.

---

## Code

### Brute Force

```cpp
class Solution{
public:
    int upperBound(vector<int> &arr, int x){
        int n = arr.size();
        // first index whose value is > x
        for (int i = 0; i < n; i++){
            if (arr[i] > x) return i;
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
    int upperBound(vector<int> &arr, int x){
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
            if (arr[mid]<=x) {
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
- SC: O(1)

---

## Look out

1. The difference between [[Lower Bound]] and [[Upper Bound]] is that ; in [[Upper Bound]]we update answer only if current element is strictly greater.
2. Whereas in [[Lower Bound]], we update even if its equal.
