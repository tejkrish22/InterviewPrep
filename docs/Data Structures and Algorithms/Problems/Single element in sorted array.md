---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern:
streak: 0
times_reviewed: 0
last_reviewed:
next_review: 2026-11-10
trigger:
unique: true
link: https://takeuforward.org/plus/dsa/problems/single-element-in-sorted-array?subject=dsa&approach=optimal
---
---

## Question

Given an array nums sorted in non-decreasing order. Every number in the array except one appears twice. Find the **single** number in the array.

### Example

Input :nums = [1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]
Output:4
Explanation: Only the number 4 appears once in the array.

---

## Code

### Brute Force

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int> &arr) {
        int n = arr.size();
        // equal pairs cancel out, the single element remains
        int ans = 0;
        for (int i = 0; i < n; i++) {
            ans ^= arr[i];
        }
        return ans;
    }
};
```

- TC: O(n)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int> &arr) {
        int n = arr.size();

        // handle the ends first so arr[mid-1] and arr[mid+1] stay in bounds
        if (n == 1) return arr[0];
        if (arr[0] != arr[1]) return arr[0];
        if (arr[n-1] != arr[n-2]) return arr[n-1];

        int low = 1;
        int high = n-2;

        while (low<=high){
            int mid = (low+high)/2;

            // check if the current mid element is unique
            if (arr[mid-1]!=arr[mid] and arr[mid]!=arr[mid+1]){
                return arr[mid];
            }

            // if mid is odd
            if (mid%2!=0){
                // [even, odd] -> go right
                if (arr[mid]==arr[mid-1]){
                    low = mid + 1;
                }
                // [odd,even] -> go left
                else {
                    high = mid - 1;
                }
            }
            // if mid is even
            else {
                // [even,odd] -> go right
                if (arr[mid]==arr[mid+1]){
                    low = mid + 1;
                }
                // [odd,even] -> go left
                else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
};
```

- TC: O(log n)
- SC: O(1)

---

## Look out

1. Before the single frequency element is encountered each pair occurs in (even, odd) fashion, after the encounter it becomes (odd, even).
2. So by checking this pattern we navigate either left half or right half of the array.
3. Check the first and last element before the loop and search only `[1, n-2]`. Otherwise `arr[mid-1]` or `arr[mid+1]` goes out of bounds.
