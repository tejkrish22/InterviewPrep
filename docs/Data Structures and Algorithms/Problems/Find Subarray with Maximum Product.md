---
pattern: "[[Arrays]]"
SubPattern: "[[Linear Scan]]"
streak: 0
last_reviewed:
next_review: 2026-11-06
trigger:
unique: false
link: https://takeuforward.org/practice/dsa/maximum-product-subarray-in-an-array?source=planly&planly_plan=dsa&planly_task_id=30201062&planly_day_id=3829451&planly_session_id=291759&subject=strivers-180-master-dsa-patterns&tab=solution&solution=optimal
tags:
  - striver180
---
---

## Question

Given an integer array **nums**. Find the **subarray** with the **largest product**, and return the **product** of the elements present in that **subarray**.

A **subarray** is a **contiguous** non-empty **sequence** of elements within an array.

### Example

Input: nums = [4, 5, 3, 7, 1, 2]
Output: 840
Explanation:
The largest product is given by the whole array itself

---

## Code

### Brute Force

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size();
        int ans = INT_MIN;
        // Try every subarray
        for (int i = 0; i < n; i++) {
            int prod = 1;
            for (int j = i; j < n; j++) {
                prod *= nums[j];
                ans = max(ans, prod);
            }
        }
        return ans;
    }
};
```

- TC: O(n^2)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
public:
    /* Function to find the product of
    elements in maximum product subarray */
	int maxProduct(vector<int>& nums) {
	    int n = nums.size();
	    
	    int ans = INT_MIN; // to store the answer
	    
	    // Indices to store the prefix and suffix multiplication
        int prefix = 1, suffix = 1;
        
        // Iterate on the elements of the given array
        for(int i=0; i < n; i++) {
            
            /* Resetting the prefix and suffix
            multiplication if they turn out to be zero */
            if(prefix == 0) prefix = 1;
            if(suffix == 0) suffix = 1;
            
            // update the prefix and suffix multiplication
            prefix *= nums[i];
            suffix *= nums[n-i-1];
            
            // store the maximum as the answer
            ans = max(ans, max(prefix, suffix));
        }
        
        // return the result
        return ans;
	}
};
```

- TC: O(n)
- SC: O(1)

---

## Look out

1.
