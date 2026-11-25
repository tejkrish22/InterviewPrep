---
pattern: "[[Sliding Window]]"
SubPattern:
  - "[[Dynamic Window]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-25
next_review: 2026-11-26
trigger:
unique: false
link: https://takeuforward.org/practice/dsa/longest-substring-without-repeating-characters?category=sliding-window&source=strivers-180-master-dsa-patterns&tab=problem&solution=optimal
tags:
  - striver180
---
---

## Question

Given a string, S. Find the **length** of the longest substring without repeating characters.

### Example

Input : S = "abcddabac"
Output : 4
Explanation : The answer is "abcd" , with a length of 4.

---

## Key Insight

1. The inner `while` loop looks O(n²) but is amortized O(n) — `left` only ever moves forward, so total left-shifts across all iterations ≤ n. Both pointers traverse the string at most once each → O(2n) = O(n).
2. `set` has O(log k) insert/erase; prefer `unordered_set` or a `int[256]` array for O(1) operations — especially important for large inputs.
3. Shrink first, then insert and update `ans` — if you insert before shrinking, the duplicate is already in the set and the window size is wrong.The window `[left, right]` is always a valid unique-character substring. Expand `right` freely; the moment `s[right]` already exists in the window, shrink `left` until it's gone, then proceed.
2. The set tracks exactly which characters are currently inside the window — `hash.count(s[right]) > 0` means the incoming character is already there, so the window is no longer valid.
3. Update `ans` after every successful right expansion — `right - left + 1` at that point is the length of the current valid window.

---

## Code

### Generate all Substrings and verify

```cpp
class Solution {
public:
    int longestNonRepeatingSubstring(string &s) {
        
        // Length of the input string
        int n = s.size(); 
        
        //Variable to store max length
        int maxLen = 0;    
        
        /* Iterate through all possible 
        starting points of the substring*/
        for (int i = 0; i < n; i++) {
            
            /* Hash to track characters in 
            the current substring window*/
            // Assuming extended ASCII characters
            vector<int> hash(256, 0);  
            
            for (int j = i; j < n; j++) {
                
                /* If s[j] is already in the
                current substring window*/
                if (hash[s[j]] == 1) break;  
                
                /* Update the hash to mark s[j]
                as present in the current window*/
                hash[s[j]] = 1;
                
                /* Calculate the length of
                the current substring*/
                int len = j - i + 1;
                
                /* Update maxLen if the current
                substring length is greater*/
                maxLen = max(maxLen, len);
            }
        }
        
        // Return the maximum length
        return maxLen; 
    }
};
```

- TC: O(n^2)
- SC: O(256)

### Sliding Window

```cpp

class Solution {
public:
    int longestNonRepeatingSubstring(string& s) {
        int n = s.size();

        int ans = 0;
        int left = 0;
        int right = 0;

        set<char> hash;

        while (right < n) {

            // Shrink the window until duplicate is removed
            while (hash.count(s[right]) > 0) {
                hash.erase(s[left]);
                left++;
            }

            // Include current character
            hash.insert(s[right]);

            ans = max(ans, right - left + 1);

            right++;
        }

        return ans;
    }
};

```

- TC: O(n)
- SC: O(256)

---

## Look out

1. The inner `while` loop looks O(n²) but is amortized O(n) — `left` only ever moves forward, so total left-shifts across all iterations ≤ n. Both pointers traverse the string at most once each → O(2n) = O(n).
2. `set` has O(log k) insert/erase; prefer `unordered_set` or a `int[256]` array for O(1) operations — especially important for large inputs.
3. Shrink first, then insert and update `ans` — if you insert before shrinking, the duplicate is already in the set and the window size is wrong.

---

## Related Problems

1.
