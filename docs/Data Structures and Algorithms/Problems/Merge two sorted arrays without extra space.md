---
pattern: "[[Arrays]]"
SubPattern: "[[Two Pointers]]"
streak: 1
times_reviewed: 1
last_reviewed: 2026-11-13
next_review: 2026-11-20
trigger: merge similar way from backwards
unique: true
link: https://takeuforward.org/practice/dsa/merge-two-sorted-arrays-without-extra-space?source=planly&plan=dsa&task=34311091&subject=strivers-180-master-dsa-patterns&tab=problem&solution=optimal-iii
tags:
  - striver180
---
---

## Question

Given two integer arrays nums1 and nums2. Both arrays are sorted in non-decreasing order. Merge both the arrays into a single array sorted in non-decreasing order.

- The final sorted array should be stored inside the array nums1 and it should be done in-place.
- nums1 has a length of m + n, where the first m elements denote the elements of nums1 and rest are 0s.
- nums2 has a length of n.

### Example

Input: nums1 = [-5, -2, 4, 5, 0, 0, 0], nums2 = [-3, 1, 8]
Output: [-5, -3, -2, 1, 4, 5, 8]
Explanation:
The merged array is: [-5, -3, -2, 1, 4, 5, 8], where [-5, -2, 4, 5] are from nums1 and [-3, 1, 8] are from nums2

---

## Code

### Brute Force

```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        // Extra array to hold the merged result
        vector<int> temp;
        int i = 0, j = 0;
        while (i < m && j < n) {
            if (nums1[i] <= nums2[j]) {
                temp.push_back(nums1[i++]);
            } else {
                temp.push_back(nums2[j++]);
            }
        }
        while (i < m) temp.push_back(nums1[i++]);
        while (j < n) temp.push_back(nums2[j++]);

        for (int k = 0; k < m + n; k++) {
            nums1[k] = temp[k];
        }
    }
};
```

- TC: O(m+n)
- SC: O(m+n)

### Optimal 1

```cpp
class Solution {
public:
    // Function to merge two sorted arrays nums1 and nums2
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int i = m-1, j = n-1;
        int ind = n + m - 1;

        // Until all the elements from nums2 are placed
        while(j >= 0) {
            // If nums1[i] >= nums2[j]
            if(i >= 0 && nums1[i] >= nums2[j]) {
                // Place the element
                nums1[ind] = nums1[i];
                
                // Move both indices back by one place
                ind--, i--;
            }
            // Otherwise
            else {
                // Place the element
                nums1[ind] = nums2[j];
                
                // Move both indices back by one place
                ind--, j--;
            }
        }

        return;
    }
};

```

- TC: O(n+m)
- SC: O(1)

---

## Look out

1. Also solved with gap method with shell sort

---

## Related Problems

1.
