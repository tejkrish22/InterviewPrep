---
pattern: "[[Arrays]]"
SubPattern:
streak: 1
last_reviewed:
next_review: 2026-11-15
trigger:
unique: false
link: https://neetcode.io/problems/is-anagram/question
tags:
  - nc150
---
---

## Question

Given two strings `s` and `t`, return `true` if the two strings are anagrams of each other, otherwise return `false`.

Two strings are **anagrams** if they contain the same characters, with each character appearing the same number of times, regardless of order.

### Example

Input: s = "racecar", t = "carrace"
Output: true

---

## Code

### Brute Force

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        // anagrams are identical once sorted
        sort(s.begin(), s.end());
        sort(t.begin(), t.end());
        return s == t;
    }
};
```

- TC: O(m log m + n log n)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        map<char,int> sMap;
        map<char,int> tMap;

        for (int i=0; i<s.size(); i++){
            sMap[s[i]]++;
        }

        for (int i=0; i<t.size(); i++){
            tMap[t[i]]++;
        }

        return sMap == tMap;
    }
};

```

- TC: O(m+n)
- SC: O(1)

---

## Look out

1. ...
