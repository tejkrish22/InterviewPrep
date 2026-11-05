---
pattern: "[[Arrays]]"
SubPattern: "[[Divide and Conquer]]"
streak: 0
times_reviewed: 1
last_reviewed: 2026-11-05
next_review: 2026-11-06
trigger: Leverage merge sort technique, count the pairs before merging
unique: false
link: https://takeuforward.org/practice/dsa/reverse-pairs?category=divide-and-conquer&source=strivers-180-master-dsa-patterns
tags:
  - striver180
---
---

## Question

Given an integer array nums. Return the number of reverse pairs in the array.
An index pair (i, j) is called a reverse pair if:
- 0 <= i < j < nums.length
- nums[i] > 2 * nums[j]

### Example

Input: nums = [6, 4, 1, 2, 7]
Output: 3
Explanation:
The reverse pairs are:
(0, 2) : nums[0] = 6, nums[2] = 1, 6 > 2 * 1
(0, 3) : nums[0] = 6, nums[3] = 2, 6 > 2 * 2
(1, 2) : nums[1] = 4, nums[2] = 1, 4 > 2 * 1

---

## Key Insight

1. Same split as [[Count Inversions]]: every pair is inside the left half, inside the right half, or across. The recursive calls count the first two; `countPairs` counts the cross pairs.
2. Both halves are sorted, so for each left element the right elements with `arr[left] > 2 * x` form a **prefix** of the right half. The count is `right - (mid + 1)`, where `right` is the first element that fails.
3. The left half is sorted too, so the next left element beats at least the same prefix. `right` never moves back, which makes `countPairs` O(n) per merge.
4. What I missed: the pair condition (`> 2x`) is not the merge comparison (`> x`), so it can't be counted inside the merge. Count in a separate pass **before** merging.

---

## Code

### Nested Traversal

```cpp
int countPairs(vector<int>& nums, int n) {
        // Initialize count of reverse pairs
        int cnt = 0;
    
        /* Nested loops to check each
        pair (i, j) where i < j*/
        for (int i = 0; i < n; i++) {
            
            for (int j = i + 1; j < n; j++) {
                
                /* Check if the condition 
                a[i] > 2 * a[j] holds*/
                if ((long long)nums[i] > (long long)2 * nums[j]) {
                    
                    /* Increment count if
                    condition is satisfied*/
                    cnt++; 
                    
                }
            }
        }
        // Return the total count of reverse pairs
        return cnt; 
    }
```

- TC: O(n^2)
- SC: O(1)

### Merge Sort

```cpp
class Solution {
public:
    int reversePairs(vector<int>& nums) {
        return mergeSort(nums, 0, nums.size() - 1);
    }

private:
    // Function to count reverse pairs across two sorted halves
    int countPairs(vector<int>& nums, int low, int mid, int high) {
        int right = mid + 1;
        int cnt = 0;
        for (int i = low; i <= mid; i++) {
            while (right <= high && (long long)nums[i] > 2LL * nums[right]) {
                right++;
            }
            cnt += (right - (mid + 1));
        }
        return cnt;
    }

    // Standard merge function to merge two sorted halves
    void merge(vector<int>& nums, int low, int mid, int high) {
        vector<int> temp;
        int left = low;
        int right = mid + 1;

        while (left <= mid && right <= high) {
            if (nums[left] <= nums[right]) {
                temp.push_back(nums[left++]);
            } else {
                temp.push_back(nums[right++]);
            }
        }

        while (left <= mid) temp.push_back(nums[left++]);
        while (right <= high) temp.push_back(nums[right++]);

        for (int i = low; i <= high; ++i) {
            nums[i] = temp[i - low];
        }
    }

    // Merge Sort + Counting Reverse Pairs
    int mergeSort(vector<int>& nums, int low, int high) {
        if (low >= high) return 0;

        int mid = low + (high - low) / 2;
        int cnt = 0;

        cnt += mergeSort(nums, low, mid);
        cnt += mergeSort(nums, mid + 1, high);
        cnt += countPairs(nums, low, mid, high);
        merge(nums, low, mid, high);

        return cnt;
    }
};

```

- TC: O(n * log n)
- SC: O(n)

---

## Look out

1. Counting inside the merge (like Count Inversions) undercounts. When `arr[left] > arr[right]` but not `> 2 * arr[right]`, the merge still moves past `arr[right]`, so larger left elements never get paired with it. Example: `[3, 7] | [2]` misses (7, 2).
2. Count before `merge`. After merging, the halves are mixed and you can't tell which side an element came from.
3. Don't reset `right` for each left element. It is still correct, but it brings back O(n²).
4. Use `2LL * arr[right]`. `2 * arr[right]` overflows `int` for values near 2³¹.
5. Check `right <= high` before reading `arr[right]` in the `while` condition.

---

## Related Problems

1. [[Count Inversions]]
