---
pattern: "[[Sliding Window]]"
SubPattern: "[[Fixed Window]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-25
next_review: 2026-11-26
trigger: "Pick k cards from either end to maximise sum → flip it: minimise the fixed window of n-k consecutive cards left behind"
unique: false
link: https://takeuforward.org/practice/dsa/maximum-points-you-can-obtain-from-cards-?category=sliding-window&source=strivers-180-master-dsa-patterns&sidebar=0
tags:
  - striver180
---
---

## Question

Given N cards arranged in a row, each card has an associated score denoted by the cardScore array.
Choose exactly k cards. In each step, a card can be chosen either from the beginning or the end of the row.
The score is the sum of the scores of the chosen cards.
Return the maximum score that can be obtained.

### Example

Input : cardScore = [1, 2, 3, 4, 5, 6] , k = 3
Output : 15
Explanation : Choosing the rightmost cards will maximize your total score. So optimal cards chosen are the rightmost three cards 4 , 5 , 6.
Th score is 4 + 5 + 6 => 15.

---

## Key Insight

1. Picking k cards from either end always leaves exactly `n-k` **consecutive** cards in the middle untouched. So maximising the picked sum = minimising the sum of this middle window.
2. Slide a fixed window of size `n-k` across the array; at each position `ans = totalSum - windowSum`. The position with the minimum window sum gives the answer.
3. The hand-picking approach is more direct: start by taking all k from the left, then iteratively swap one left card for one right card — trying all k+1 splits in O(k).

---

## Code

### Fixed Sliding Window

```cpp

class Solution {
public:
    int maxScore(vector<int>& arr, int k) {
        int n = arr.size();

        int ans = INT_MIN;

        // Instead of maximizing k picked cards,
        // minimize the sum of n-k consecutive cards left behind.
        int totalSum = accumulate(arr.begin(), arr.end(), 0);

        // If all cards are picked, return the total sum.
        if (k == n) return totalSum;

        // Initialize the first window of size n-k.
        int left = 0;
        int right = n - k - 1;

        int windowSum = 0;

        // Calculate the sum of the first window.
        for (int i = left; i <= right; i++) {
            windowSum += arr[i];
        }

        while (right < n) {

            // Score = Total sum - Sum of cards left behind.
            ans = max(ans, totalSum - windowSum);

            // Last valid window reached; avoid accessing arr[n].
            if (right == n - 1) break;

            // Slide window: remove leftmost element.
            windowSum -= arr[left];
            left++;

            // Include the next element on the right.
            right++;
            windowSum += arr[right];
        }

        return ans;
    }
};

```

- TC: O(n)
- SC: O(1)

---

### Hand Picking (Try all left-right splits)

```cpp
class Solution {
public:
    int maxScore(vector<int>& arr, int k) {
        int n = arr.size();

        // Start: take all k cards from the left
        int lSum = 0;
        for (int i = 0; i < k; i++) lSum += arr[i];

        int ans = lSum;
        int rSum = 0;

        // Swap one left card for one right card, k times
        for (int i = k - 1; i >= 0; i--) {
            lSum -= arr[i];               // drop rightmost left card
            rSum += arr[n - (k - i)];    // pick next card from right end
            ans = max(ans, lSum + rSum);
        }

        return ans;
    }
};
```

- TC: O(k)
- SC: O(1)

---

## Look out

1. `k == n` edge case — window size `n-k` is 0; return `totalSum` directly (the sliding window handles this with an early return, but easy to forget).
2. Window size is `n-k`, not `k` — the two are easy to swap mentally.
3. In the sliding window: the `right == n-1` break prevents `arr[right+1]` out-of-bounds on the last iteration.
4. In hand-picking: `arr[n - (k - i)]` is the index of the next right card when you've already taken `k-i` from the right — trace through a small example if this feels off.

---

## Related Problems

1.
