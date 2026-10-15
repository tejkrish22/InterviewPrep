---
pattern: "[[Arrays]]"
SubPattern:
confidence: 5
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

---

## Complexity

### Time Complexity

1. O(m+n)

### Space Complexity

1. O(1)

---

## Look out

1. ...
