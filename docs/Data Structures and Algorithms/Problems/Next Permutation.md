---
pattern: "[[Arrays]]"
SubPattern: "[[Two Pointers]]"
streak: 0
times_reviewed: 1
last_reviewed: 2026-11-11
next_review: 2026-11-14
trigger: Find the dip from back, if dip not found return the reversed array, swap the dip with the immediate large element from back, reverse the suffix
unique: false
link: https://takeuforward.org/practice/dsa/next-permutation?source=planly&plan=dsa&task=34311090&subject=strivers-180-master-dsa-patterns&tab=solution&solution=optimal
tags:
  - striver180
---
---

## Question

A permutation of an array of integers is an arrangement of its members into a sequence or linear order.
For example, for arr = [1,2,3], the following are all the permutations of arr:
[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1].

The next permutation of an array of integers is the next lexicographically greater permutation of its integers.
More formally, if all the permutations of the array are sorted in lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted order.

If such arrangement is not possible (i.e., the array is the last permutation), then rearrange it to the lowest possible order (i.e., sorted in ascending order).

You must rearrange the numbers in-place and use only constant extra memory.

### Example

Input: nums = [1,2,3]
Output: [1,3,2]
Explanation:
The next permutation of [1,2,3] is [1,3,2].

---

## Code

### Brute Force

```cpp
class Solution {
public:
    // Generate every permutation (as index choices)
    void generate(vector<int>& nums, vector<int>& cur, vector<bool>& used, vector<vector<int>>& all) {
        int n = nums.size();
        if ((int)cur.size() == n) {
            all.push_back(cur);
            return;
        }
        for (int i = 0; i < n; i++) {
            if (used[i]) continue;
            used[i] = true;
            cur.push_back(nums[i]);
            generate(nums, cur, used, all);
            cur.pop_back();
            used[i] = false;
        }
    }

    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> all;
        vector<int> cur;
        vector<bool> used(n, false);
        generate(nums, cur, used, all);
        sort(all.begin(), all.end());

        // first permutation strictly greater than nums
        for (auto& p : all) {
            if (p > nums) {
                nums = p;
                return;
            }
        }
        // nums was the last permutation, wrap to the smallest
        nums = all[0];
    }
};
```

- TC: O(n! x n x n log n)
    - Generating all n! permutations costs O(n! x n); sorting them takes O(n! log(n!)) = O(n! x n log n) comparisons, each O(n).
- SC: O(n! x n)
    - All permutations are stored.

### Optimal 1

```cpp
class Solution {
public:
    // Function to get the next permutation of given array
    void nextPermutation(vector<int>& nums) {
        int n = nums.size(); // Size of the given array
        
        // To store the index of the first smaller element from right
        int ind = -1; 
        
        // Find the first index from the end where nums[i] < nums[i+1]
        for(int i = n-2; i >= 0; i--) {
            if(nums[i] < nums[i+1]) {
                ind = i;
                break;
            }
        }
        
        /* If no such index exists, array is in descending order
         So, reverse it to get the smallest permutation */
        if(ind == -1) {
            reverse(nums.begin(), nums.end());
            return;
        }
        
        // Find the element just greater than nums[ind] from the end
        for(int i = n-1; i > ind; i--) {
            if(nums[i] > nums[ind]) {
                swap(nums[i], nums[ind]); // Swap with nums[ind]
                break;
            }
        }
        
        // Reverse the right half to get the next smallest permutation
        reverse(nums.begin() + ind + 1, nums.end());
        return;
    }
};
```

- TC: O(n)
- SC: O(1)

---

## Look out

1. The steps are
	1. Find pivot index
	2. Find number which is greater and close to pivot
	3. Swap them
	4. Reverse {pivot+1, n-1}
2. **Why reverse after swapping?**:
   - The prefix just increased; to get the *immediate* next permutation, the suffix must be as small as possible (ascending order).
   - The suffix is guaranteed to remain in descending order after the swap, so `reverse` sorts it into ascending order in $O(n)$ time without needing a sort.

---

## Related Problems

1.
