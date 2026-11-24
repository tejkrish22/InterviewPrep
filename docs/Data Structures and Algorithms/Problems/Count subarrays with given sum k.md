---
pattern: "[[Arrays]]"
SubPattern:
  - "[[Hashing]]"
  - "[[Prefix Sum]]"
streak: 2
times_reviewed: 2
last_reviewed: 2026-11-24
next_review: 2026-12-15
trigger: Keep calculating prefix sum, while maintaining hash map with count of prefix sum occurrence
unique: false
link: https://takeuforward.org/practice/dsa/count-subarrays-with-given-sum?category=hashing-prefix-sums&source=strivers-180-master-dsa-patterns&tab=problem&solution=optimal
tags:
  - striver180
---
---

## Question

Given an array of integers nums and an integer k, return the total **number of** **subarrays** whose sum equals to k.

### Example

Input: nums = [1, 1, 1], k = 2
Output: 2
Explanation: In the given array [1, 1, 1], there are two subarrays that sum up to 2: [1, 1] and [1, 1]. Hence, the output is 2.

---

## Key Insight

1. Maintaining the count of seen prefix sums in a hash map.

---

## Code

### Nested Loop to create subarrays

```cpp
class Solution
{
public:
    int subarraySum(vector<int> &nums, int k)
    {
        int n = nums.size(); 
        // Number of subarrays
        int count = 0;

        // starting index
        for (int startIndex = 0; startIndex < n; startIndex++) { 
            int currentSum = 0;
            // ending index
            for (int endIndex = startIndex; endIndex < n; endIndex++) { 
                // calculate the sum of subarray [startIndex...endIndex]
                // sum of [startIndex..endIndex-1] + nums[endIndex]
                currentSum += nums[endIndex];

                // Increase the count if currentSum == k:
                if (currentSum == k)
                    count++;
            }
        }
        return count;
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
    int subarraySum(vector<int> &nums, int k)
    {
        int n = nums.size(); 
        unordered_map<int, int> prefixSumMap;
        int currentPrefixSum = 0, subarrayCount = 0;

        // Setting 0 in the map.
        prefixSumMap[0] = 1; 
        for (int i = 0; i < n; i++) {
            // Add current element to the prefix sum:
            currentPrefixSum += nums[i];

            /*Calculate the value to 
            remove (currentPrefixSum - k)*/
            int sumToRemove = currentPrefixSum - k;

            /* Add the number of subarrays
             with the sum to be removed*/
            subarrayCount += prefixSumMap[sumToRemove];

            /* Update the count of current
            prefix sum in the map*/
            prefixSumMap[currentPrefixSum] += 1;
        }
        return subarrayCount;
    }
};
```

- TC: O(n)
- SC: O(n)

---

## Look out

1. Edge case if prefix sum equals k, that is the reason why 0 is inserted into hash map at the beginning.

---

## Related Problems

1. [[Longest subarray with sum K]]
