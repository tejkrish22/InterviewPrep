---
pattern: "[[Arrays]]"
SubPattern: "[[Hashing]]"
streak: 0
times_reviewed: 1
last_reviewed: 2026-11-06
next_review: 2026-11-14
trigger: use set to find the consecutive elements  for each new possible sequence
unique: false
link: https://takeuforward.org/practice/dsa/longest-consecutive-sequence-in-an-array?source=planly&plan=dsa&task=34311096&subject=strivers-180-master-dsa-patterns&tab=solution&solution=optimal
tags:
  - striver180
---
---

## Question

Given an array nums of n integers.

Return the length of the longest sequence of consecutive integers. The integers in this sequence can appear in any order.

### Example

Input: nums = [100, 4, 200, 1, 3, 2]
Output: 4
Explanation:
The longest sequence of consecutive elements in the array is [1, 2, 3, 4], which has a length of 4. This sequence can be formed regardless of the initial order of the elements in the array.

---

## Key Insight

1. The one idea that makes the optimal solution work.
2. What I did not see the first time.

---

## Code

### Brute Force

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        int n = nums.size();

        // Return 0 if array is empty
        if (n == 0) return 0; 

        sort(nums.begin(), nums.end()); 

        // Track last smaller element
        int lastSmaller = INT_MIN; 
        // Count current sequence length
        int cnt = 0; 
        // Track longest sequence length
        int longest = 1; 

        for (int i = 0; i < n; i++) {
            // If consecutive number exists
            if (nums[i] - 1 == lastSmaller) {
                // Increment sequence count
                cnt += 1; 
                // Update last smaller element
                lastSmaller = nums[i]; 
            } 
            // If consecutive number doesn't exits
            else if (nums[i] != lastSmaller) {
                // Reset count for new sequence
                cnt = 1; 
                // Update last smaller element
                lastSmaller = nums[i]; 
            }
            // Update longest if needed
            longest = max(longest, cnt); 
        }
        return longest;
    }
};
```

- TC: O(n x logn)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        int n = nums.size();
        // If the array is empty
        if (n == 0) return 0; 
    
        // Initialize the longest sequence length
        int longest = 1; 
        unordered_set<int> st;
    
        // Put all the array elements into the set
        for (int i = 0; i < n; i++) {
            st.insert(nums[i]);
        }
    
        /* Traverse the set to 
           find the longest sequence  */
        for (auto it : st) {
            // Check if 'it' is a starting number of a sequence
            if (st.find(it - 1) == st.end()) {
                // Initialize the count of the current sequence
                int cnt = 1; 
                // Starting element of the sequence
                int x = it; 
    
                // Find consecutive numbers in the set
                while (st.find(x + 1) != st.end()) {
                    // Move to the next element in the sequence
                    x = x + 1; 
                    // Increment the count of the sequence
                    cnt = cnt + 1; 
                }
                // Update the longest sequence length
                longest = max(longest, cnt);
            }
        }
        return longest;
    }
};
```

- TC: O(n)
- SC: O(n)

---

## Look out

1.

---

## Related Problems

1.
