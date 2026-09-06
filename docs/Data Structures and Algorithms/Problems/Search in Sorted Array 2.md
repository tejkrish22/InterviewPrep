---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Find the Sorted Half]]"
confidence: 1
unique: true
link: https://takeuforward.org/plus/dsa/problems/search-in-rotated-sorted-array-2?subject=dsa&approach=optimal&sidebar=open
---
---
## Question

Given an integer array nums, sorted in ascending order (may contain duplicate values) and a target value **k**. Now the array is **rotated** at some pivot point unknown to you. Return True if k is present and otherwise, return False.

### Example

Input : nums = [7, 8, 1, 2, 3, 3, 3, 4, 5, 6], k = 3
Output: True
Explanation: The element 3 is present in the array. So, the answer is True.

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
            
            // Edge Case: If all the three pointer have same element
			// then the sorted part can't be figured out
			// Just trim the search space

			if (arr[low]==arr[mid] and arr[mid]==arr[high]){
				low = low + 1;
				high = high - 1;
			}
            
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
3. Handling duplicates — the key difference from [[Search in Sorted Array 1]] :
	1. When `arr[low] == arr[mid] == arr[high]`, we **cannot determine** which half is sorted. Example: `[3, 3, 1, 2, 3, 3, 3]` — both halves look identical from the endpoints.
	2. The fix is to **shrink both ends**: `low++`, `high--`. This is safe because `arr[mid] != k` was already checked.
4. **When `arr[low] == arr[mid]` but `arr[mid] != arr[high]`:** No special handling needed. The code enters the "left half is sorted" branch (`arr[low] <= arr[mid]`). Since all elements from `low` to `mid` are the same value and `arr[mid] != k`, the target can't be in the left half. The inner condition `arr[low] <= k and k < arr[mid]` fails, and we correctly move `low = mid + 1`.
5. **Comparison signs in the sorted-half check — be precise:**

   ```cpp
   // left half is sorted
   if (arr[low] <= arr[mid]) {
       // target in left half?
       if (arr[low] <= k and k < arr[mid]) {
       //    ^^                  ^ strict: mid already checked
   
   // right half is sorted
   else {
       // target in right half?
       if (arr[mid] < k and k <= arr[high]) {
       //    ^ strict: mid already checked  ^^
   ```

   - `arr[mid]` side uses **strict** (`<`) because `arr[mid] == k` is already handled at the top.
   - The boundary end (`arr[low]` or `arr[high]`) uses **`<=`** because the target could equal the boundary element.