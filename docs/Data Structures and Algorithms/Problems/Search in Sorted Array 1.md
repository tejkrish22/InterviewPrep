---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern:
confidence: 1
unique: true
link: https://takeuforward.org/plus/dsa/problems/search-in-rotated-sorted-array-i?subject=dsa&approach=binary-search
---
---
## Question

Given an integer array nums, sorted in ascending order (with distinct values) and a target value k. The array is **rotated** at some pivot point that is unknown. Find the **index** at which k is present and if k is not present return -1.

### Example

Input : nums = [4, 5, 6, 7, 0, 1, 2], k = 0
Output: 4
Explanation: Here, the target is 0. We can see that 0 is present in the given rotated sorted array, nums. Thus, we get output as 4, which is the index at which 0 is present in the array.

---
## Code

```cpp
class Solution {
   public:
    int search(vector<int> &arr, int k) {
        int n = arr.size();

        int low = 0;
        int high = n - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == k) return mid;

            // Identify the sorted half, it is guaranteed that one half is
            // sorted

            // left half is sorted
            if (arr[low] <= arr[mid]) {
                // target is present in the sorted half
                if (arr[low] <= k and k < arr[mid]) {
                    high = mid - 1;
                }
                // target is present in the unsorted half
                else {
                    low = mid + 1;
                }
            }
            // right half is sorted
            else {
                // target is present in the sorted half
                if (arr[mid] < k and k <= arr[high]) {
                    low = mid + 1;
                }
                // target is present in the unsorted half
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

1.  O (1)

---
## Look out

1. The main crux of the question is ***one half is always sorted, find that half***.
2. After finding which half is sorted, find if the target is present in the sorted half else move to unsorted half and repeat the procedure.
3. while checking if the target is present in sorted half, note the comparing signs

   ```cpp
   // left half is sorted
            if (arr[low] <= arr[mid]) {
                // target is present in the sorted half
                if (arr[low] <= k and k < arr[mid]) {
                
	........
	........
	
	// right half is sorted
            else {
                // target is present in the sorted half
                if (arr[mid] < k and k <= arr[high]) {
   ```