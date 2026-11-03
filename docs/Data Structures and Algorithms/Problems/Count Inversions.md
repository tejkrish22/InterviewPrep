---
pattern: "[[Arrays]]"
SubPattern: "[[Divide and Conquer]]"
confidence: 1
unique: false
link: https://takeuforward.org/practice/dsa/count-inversions?category=divide-and-conquer&source=strivers-180-master-dsa-patterns
tags:
  - striver180
---
---

## Question

Given an integer array nums. Return the number of inversions in the array.

Two elements a[i] and a[j] form an inversion if a[i] > a[j] and i < j.

- It indicates how close an array is to being sorted.
- A sorted array has an inversion count of 0.
- An array sorted in descending order has maximum inversion.

### Example

Input: nums = [2, 3, 7, 1, 3, 5]
Output: 5

---

## Code

### Manual Count

```cpp
class Solution {
public:
    // Function to find number of inversions in an array
    long long int numberOfInversions(vector<int>& nums) {
    
    // size of the array 
    int n = nums.size();
    
    // Count the number of pairs:
    long long int cnt = 0;
    
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            
            /* if nums[i] is greater than 
            nums[j], increase count by 1. */
            if (nums[i] > nums[j]) cnt++;
            
        }
    }
    
    // return the count of inversions
    return cnt;

    }
};
```

### Using Merge Sort

```cpp
class Solution {
private:
    /* Merge function to count 
    inversions and merge sorted halves*/
    long long int merge(vector<int>& arr, int low, int mid, int high) {
        
        // Temporary array for merging
        vector<int> temp;
        
        // Starting indices of left and right halves
        int left = low;
        int right = mid + 1;

        // Count variable to count the pairs
        long long int cnt = 0;

        // Merge sorted halves into temp array
        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) {
                
                temp.push_back(arr[left]);
                left++;
                
            } 
            else {
                temp.push_back(arr[right]);
                
                // Count inversions
                cnt += (mid - left + 1);
                
                right++;
            }
        }

        // Copy remaining elements of left half
        while (left <= mid) {
            temp.push_back(arr[left]);
            left++;
        }

        // Copy remaining elements of right half
        while (right <= high) {
            temp.push_back(arr[right]);
            right++;
        }

        /* Copy elements from temp 
        array back to original array*/
        for (int i = low; i <= high; i++) {
            arr[i] = temp[i - low];
        }
        
        //return the count of inversions
        return cnt;
    }
    
    // Merge sort function to recursively sort and count inversions
    long long int mergeSort(vector<int>& arr, int low, int high) {
        long long int cnt = 0;
        if (low < high) {
            int mid = low + (high - low) / 2;
            
            // Sort left half
            cnt += mergeSort(arr, low, mid);  
            
            // Sort right half
            cnt += mergeSort(arr, mid + 1, high); 
            
            // Merge and count inversions
            cnt += merge(arr, low, mid, high);  
        }
        return cnt;
    }
    
public:
    // Function to find number of inversions in an array
    long long int numberOfInversions(vector<int>& nums) {
        
        // Size of the array
        int n = nums.size();

        // Count the number of pairs
        return mergeSort(nums, 0, n - 1);
    }
};
```
---

## Complexity

### Time Complexity

1. O(n x log(n))

### Space Complexity

1. O(n)

---

## Look out

1. Every inversion falls into exactly one group: both in the left half, both in the right half, or one in each. The two recursive calls count the first two; `merge` counts the cross pairs. This is why `mergeSort` adds up three `cnt +=`.
2. In `merge`, both halves are already sorted. If `arr[left] > arr[right]`, then every element from `left` to `mid` is also greater than `arr[right]`, so add `mid - left + 1` at once.
3. Use `<=` when comparing `arr[left]` and `arr[right]`. Equal elements are not an inversion (needs strict `>`).
4. Use `long long` for the count. The maximum is about n²/2.
5. Brute force is O(n²). Merge sort keeps O(n log n) because the counting happens inside the merge work.

---

## Related Problems

1.
