---
pattern: "[[Arrays]]"
SubPattern: "[[Linear Scan]]"
confidence: 2
unique: true
link: https://takeuforward.org/practice/dsa/kadane's-algorithm?source=planly&planly_plan=dsa&planly_task_id=30201060&planly_day_id=3829451&planly_session_id=291659&subject=strivers-180-master-dsa-patterns&tab=problem&solution=follow-up&sidebar=1
tags:
  - striver180
---
---

## Question

Given an integer array nums, find the subarray with the largest sum and return the sum of the elements present in that subarray.
A subarray is a contiguous non-empty sequence of elements within an array.

### Example

Input: nums = [2, 3, 5, -2, 7, -4]
Output: 15
Explanation:
The subarray from index 0 to index 4 has the largest sum = 15

---

## Code

```cpp
class Solution {
public:
    // Function to find maximum sum of subarrays
    int maxSubArray(vector<int>& nums) {
        
        // maximum sum
        long long maxi = LLONG_MIN; 
        
        // current sum of subarray
        long long sum = 0; 
        
        // Iterate through the array
        for (int i = 0; i < nums.size(); i++) {
            
            // Add current element to the sum
            sum += nums[i]; 
            
            // Update maxi if current sum is greater
            if (sum > maxi) {
                maxi = sum; 
            }
            
            // Reset sum to 0 if it becomes negative
            if (sum < 0) {
                sum = 0; 
            }
        }
        
        // Return the maximum subarray sum found
        return maxi;
    }
};
```

---

## Complexity

### Time Complexity

1. O(n)

### Space Complexity

1. O(1)

---

## Look out

1. This is Kadane's Algorithm
2. Follow Up - Find the indexes
	1. The subarray starts when the sum = 0
	2. The subarray ends when the maximum sum updates.
