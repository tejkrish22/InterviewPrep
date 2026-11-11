---
pattern: "[[Arrays]]"
SubPattern:
  - "[[Hashing]]"
  - "[[Two Pointers]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-11
next_review: 2026-11-12
trigger: Map running prefix sum to its earliest index; check if (sum - k) exists and never overwrite existing sums
unique: false
link: https://takeuforward.org/practice/dsa/longest-subarray-with-sum-k?category=hashing-prefix-sums&source=strivers-180-master-dsa-patterns&sidebar=0&tab=problem&solution=optimal-%28only-positives%29
tags:
  - striver180
---
---

## Question

Given an array nums of size n and an integer k, find the length of the **longest sub-array** that sums to k. If no such sub-array exists, return 0.

### Example

Input: nums = [10, 5, 2, 7, 1, 9],  k=15
Output: 4
Explanation:
The longest sub-array with a sum equal to 15 is [5, 2, 7, 1], which has a length of 4. This sub-array starts at index 1 and ends at index 4, and the sum of its elements (5 + 2 + 7 + 1) equals 15. Therefore, the length of this sub-array is 4.

---

## Key Insight

1. **Hashing (Prefix Sum + Hash Map) — Works for Positives, Negatives, and Zeros**:
   - **Equation**: If the running prefix sum up to index $i$ is $S$, and a previously seen prefix sum at index $j$ was $S - k$, then the subarray from index $j + 1$ to $i$ sums to $S - (S - k) = k$.
   - **Maximizing Length**: To maximize length $(i - j)$, $j$ must be as far left (earliest) as possible. Therefore, **never overwrite** a prefix sum already stored in the map when you encounter it again (critical when zeros or negative numbers make the sum repeat).

2. **Two Pointers (Sliding Window) — Optimal for Positives / Non-Negatives ($O(n)$ time, $O(1)$ space)**:
   - **Monotonicity Invariant**: Expanding `right` always increases or maintains the sum; shrinking `left` always decreases or maintains the sum. This predictable behavior allows us to grow to reach $k$ and shrink whenever sum $> k$ without ever backtracking.
   - **Why it fails with Negatives**: If negative numbers exist, adding an element can *decrease* the sum, and shrinking can *increase* it. The monotonic relationship breaks, so sliding window cannot guarantee finding the longest subarray. (Hashing must be used instead).

---

## Code

### Brute Force

- Nested Loops
- Works for anything

```cpp
class Solution
{
public:
    int longestSubarray(vector<int> &nums, int k)
    {
        int n = nums.size(); 
        int maxLength = 0;

        // starting index
        for (int i = 0; i < n; i++) { 
            // ending index
            int currentSum = 0;
            for (int j = i; j < n; j++) { 
                /* add all the elements of 
                   subarray = nums[startIndex...endIndex]  */
                currentSum += nums[j];
                
                if (currentSum == k)
                    maxLength = max(maxLength, j - i + 1);
            }
        }
        return maxLength;
    }
};
```

- TC: O(n^2)
    - Two nested loops to consider all possible subarrays: outer loop runs $n$ times, inner loop runs up to $n$ times with $O(1)$ operations inside.
- SC: O(1)
    - Only constant extra space for scalar variables (`currentSum`, `maxLength`).

### Optimal 1

- Use Hashing to find the target `prefSum - k`
- Works for both positive and negative numbers

```cpp
class Solution
{
public:
    int longestSubarray(vector<int> &nums, int k)
    {
        int n = nums.size(); 

        map<int, int> preSumMap;
        int sum = 0;
        int maxLen = 0;
        for (int i = 0; i < n; i++) {
            // calculate the prefix sum till index i
            sum += nums[i];

            // if the sum equals k, update maxLen
            if (sum == k) {
                maxLen = max(maxLen, i + 1);
            }

            // calculate the sum of remaining part i.e., sum - k
            int rem = sum - k;

            // calculate the length and update maxLen
            if (preSumMap.find(rem) != preSumMap.end()) {
                int len = i - preSumMap[rem];
                maxLen = max(maxLen, len);
            }

            // update the map if sum isnot already present
            if (preSumMap.find(sum) == preSumMap.end()) {
                preSumMap[sum] = i;
            }
        }

        return maxLen;
    }
};
```

- TC: O(n x log n)
- SC: O(n)

### Optimal 2

- Use two pointers to maintain a window of elements
- Works only for positive numbers

```cpp
class Solution {
public:
    int longestSubarray(vector<int> &arr, int k) {
        int n = arr.size();
        int left = 0;
        long long sum = 0;
        int maxLen = 0;

        for (int right = 0; right < n; right++) {
            sum += arr[right];

            // Shrink window from the left as long as sum exceeds k
            while (left <= right && sum > k) {
                sum -= arr[left];
                left++;
            }

            // Check if the current valid window equals k
            if (sum == k) {
                maxLen = max(maxLen, right - left + 1);
            }
        }

        return maxLen;
    }
};
```

- TC: O(n)
- SC: O(1)

---

## Look out

1. **Never overwrite existing sums in the map**: When `sum` is already present in `preSumMap`, do not update its index. Overwriting moves the start index to the right, shrinking future subarrays instead of maximizing their length (crucial when `0`s or negatives cause the sum to repeat).
2. **Handle subarray starting at index 0**: When `sum == k` directly, the subarray starts from index `0` with length `i + 1`. This must either be checked explicitly (`if (sum == k)`) or handled by initializing `preSumMap[0] = -1`.
3. **Two pointers only works for non-negatives ($\ge 0$)**: Sliding window requires monotonicity (expanding strictly increases/maintains sum, shrinking strictly decreases/maintains sum). If negative numbers are present, Hashing is mandatory.
4. **Integer overflow on sum**: If array elements or $k$ can sum beyond $2^{31} - 1$, use `long long` for `sum`.

---

## Related Problems

1.
