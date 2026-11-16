---
pattern: "[[Arrays]]"
SubPattern:
  - "[[Hashing]]"
  - "[[Prefix Sum]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-16
next_review: 2026-11-17
trigger: Keep calculating prefix sum, while maintaining hash map with count of prefix xor occurrence
unique: false
link: https://takeuforward.org/practice/dsa/count-subarrays-with-given-xor-k?category=hashing-prefix-sums&source=strivers-180-master-dsa-patterns&tab=problem&solution=optimal
tags:
  - striver180
---
---

## Question

Given an array of integers nums and an integer k, return the total **number of** **subarrays** whose xor equals to k.

### Example

Input : nums = [4, 2, 2, 6, 4], k = 6
Output : 4
Explanation : The subarrays having XOR of their elements as 6 are [4, 2],  [4, 2, 2, 6, 4], [2, 2, 6], and [6]

---

## Key Insight

1. Maintaining the count of seen prefix xors in a hash map.

---

## Code

### Nested Loop to create subarrays

```cpp
class Solution {
public:
    // Function to count the number of subarrays with XOR k
    int subarraysWithXorK(vector<int>& nums, int k) {
        int n = nums.size(); 
        int cnt = 0;

        // Step 1: Generate subarrays
        for (int i = 0; i < n; i++) {
            int xorr = 0;
            for (int j = i; j < n; j++) {
                /* Step 2: Calculate XOR of
                   all elements in the subarray */
                xorr = xorr ^ nums[j];

                // Step 3: Check XOR and count
                if (xorr == k) cnt++;
            }
        }
        return cnt;
    }
};
```

- TC: O(n^2)
- SC: O(1)

### Prefix sum with Hash map

```cpp
class Solution
{
public:
    int subarraysWithXorK(vector<int>& nums, int k)
    {
        int n = nums.size(); 
        int xr = 0;
        map<int, int> mpp; 
        // setting the value of 0.
        mpp[xr]++; 
        int cnt = 0;

        for (int i = 0; i < n; i++) {
            // prefix XOR till index i:
            xr = xr ^ nums[i];

            // By formula: x = xr^k:
            int x = xr ^ k;

            // add the occurrence of xr^k to the count:
            cnt += mpp[x];

            // Insert the prefix xor till index i into the map:
            mpp[xr]++;
        }
        return cnt;
    }
};
```

- TC: O(n)
- SC: O(n)

---

## Look out

1. Edge case if prefix xor equals k, that is the reason why 0 is inserted into hash map at the beginning.

---

## Related Problems

1. [[Longest subarray with sum K]]
2. [[Count subarrays with given sum k]]
