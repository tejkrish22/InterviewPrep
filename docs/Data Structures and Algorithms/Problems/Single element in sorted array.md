---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern:
confidence: 3
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

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int> &arr) {
        int n = arr.size();

        int low = 0;
        int high = n-1;

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

----
## Complexity

### Time Complexity

1. O (log n)

### Space Complexity

1. O (1)

---
## Look out

1. Before the single frequency element is encountered each pair occurs in (even, odd) fashion, after the encounter it becomes (odd, even).
2. So by checking this pattern we navigate either left half or right half of the array.