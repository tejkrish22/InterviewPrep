---
pattern: "[[Binary Search]]"
SubPattern: "[[Binary Search on Partition]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-22
next_review: 2026-11-23
trigger: Two sorted arrays, find median without merging → binary search on how many elements to take from the smaller array
unique: true
link: https://takeuforward.org/data-structure/median-of-two-sorted-arrays/
tags:
  - striver180
---
---

## Question

Given two sorted arrays arr1 and arr2 of size m and n respectively, return the **median** of the two sorted arrays.
The median is defined as the middle value of a sorted list of numbers. In case the length of the list is even, the median is the average of the two middle elements.

### Example

Input: arr1 = [2, 4, 6], arr2 = [1, 3, 5]
Output: 3.5
Explanation: The array after merging arr1 and arr2 will be [ 1, 2, 3, 4, 5, 6 ]. As the length of the merged list is even, the median is the average of the two middle elements. Here two medians are 3 and 4. So the median will be the average of 3 and 4, which is 3.5.

---

## Key Insight

1. The median splits the combined array into two equal halves. You don't need to merge — just find a partition in arr1 (taking `mid1` elements) and arr2 (taking `mid2 = left - mid1` elements) such that every element on the left ≤ every element on the right.
2. The partition is valid when `l1 ≤ r2 AND l2 ≤ r1`. Binary search on `mid1` over `[0, n1]` to find this partition.
3. If `l1 > r2` → took too many from arr1 → `high = mid1 - 1`. If `l2 > r1` → took too few from arr1 → `low = mid1 + 1`.
4. Once valid: odd total → `max(l1, l2)` is the median; even total → `(max(l1, l2) + min(r1, r2)) / 2`.

---

## Code

### Flatten the array and find the median

```cpp
class Solution {
public:
    //Function to find the median of two sorted arrays.
    double median(vector<int>& arr1, vector<int>& arr2) {
        // Size of two given arrays
        int n1 = arr1.size(), n2 = arr2.size();
        int n = n1 + n2; // Total size

        // Required indices for median calculation
        int ind2 = n / 2;
        int ind1 = ind2 - 1;
        int cnt = 0;
        int ind1el = -1, ind2el = -1;

        // Apply the merge step
        int i = 0, j = 0;
        while (i < n1 && j < n2) {
            if (arr1[i] < arr2[j]) {
                if (cnt == ind1) ind1el = arr1[i];
                if (cnt == ind2) ind2el = arr1[i];
                cnt++;
                i++;
            } else {
                if (cnt == ind1) ind1el = arr2[j];
                if (cnt == ind2) ind2el = arr2[j];
                cnt++;
                j++;
            }
        }

        // Copy the remaining elements
        while (i < n1) {
            if (cnt == ind1) ind1el = arr1[i];
            if (cnt == ind2) ind2el = arr1[i];
            cnt++;
            i++;
        }
        while (j < n2) {
            if (cnt == ind1) ind1el = arr2[j];
            if (cnt == ind2) ind2el = arr2[j];
            cnt++;
            j++;
        }

        // Find the median
        if (n % 2 == 1) {
            return (double) ind2el;
        }

        return (double) ((double) (ind1el + ind2el)) / 2.0;
    }
};
```

- TC: O(m+n)
- SC: O(m+n)

### Binary Search

```cpp
class Solution {
public:
    //Function to find the median of two sorted arrays.
    double median(vector<int>& arr1, vector<int>& arr2) {
        // Size of two given arrays
        int n1 = arr1.size(), n2 = arr2.size();

        /* Ensure arr1 is not larger than 
        arr2 to simplify implementation*/
        if (n1 > n2) return median(arr2, arr1);

        int n = n1 + n2;
        
        // Length of left half
        int left = (n1 + n2 + 1) / 2; 

        // Apply binary search
        int low = 0, high = n1;
        while (low <= high) {
            
            // Calculate mid index for arr1
            int mid1 = (low + high) >> 1; 
            
            // Calculate mid index for arr2
            int mid2 = left - mid1; 

            // Calculate l1, l2, r1, and r2
            int l1 = (mid1 > 0) ? arr1[mid1 - 1] : INT_MIN;
            int r1 = (mid1 < n1) ? arr1[mid1] : INT_MAX;
            int l2 = (mid2 > 0) ? arr2[mid2 - 1] : INT_MIN;
            int r2 = (mid2 < n2) ? arr2[mid2] : INT_MAX;

            if (l1 <= r2 && l2 <= r1) {
                // If condition for finding median
                if (n % 2 == 1) return max(l1, l2);
                else return (max(l1, l2) + min(r1, r2)) / 2.0;
            } 
            else if (l1 > r2) {
                // Eliminate the right half of arr1
                high = mid1 - 1;
            } else {
                // Eliminate the left half of arr1
                low = mid1 + 1;
            }
        }
        // Dummy statement
        return 0; 
    }
};
```

- TC: O(log(min(m,n)))
- SC: O(1)

---

## Look out

1. Always binary search on the **smaller** array — swap if `n1 > n2` so `mid2` never goes negative (`mid2 = left - mid1` must be ≥ 0).
2. `left = (n1 + n2 + 1) / 2` — the `+1` ensures the extra element goes to the left half in odd-length cases; using `/2` without `+1` breaks the odd case.
3. Use `INT_MIN`/`INT_MAX` as sentinels when `mid1 = 0` or `mid1 = n1` — avoids out-of-bounds access on l1/r1.
4. `max(l1, l2)` is the last element of the left half; `min(r1, r2)` is the first element of the right half — the median formula follows directly..

---

## Related Problems

1.
