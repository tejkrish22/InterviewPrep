---
pattern: "[[Arrays]]"
SubPattern: "[[Linear Scan]]"
streak: 1
times_reviewed: 0
last_reviewed:
next_review: 2026-11-16
trigger: moore's voting algorithm, choose candidate and verify candidate
unique: true
link: https://takeuforward.org/practice/dsa/majority-element-i?category=linear-scan&source=strivers-180-master-dsa-patterns
tags:
  - striver180
---
---

## Question

Given an integer array nums of size n, return the majority element of the array.

The majority element of an array is an element that appears more than n/2 times in the array. The array is guaranteed to have a majority element.

### Example

Input: nums = [7, 0, 0, 1, 7, 7, 2, 7, 7]
Output: 7
Explanation:
The number 7 appears 5 times in the 9 sized array

---

## Code

### Brute Force

```cpp
class Solution {
public:
    int majorityElement(vector<int>& arr) {
        int n = arr.size();
        // Count occurrences of every element
        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = 0; j < n; j++) {
                if (arr[j] == arr[i]) {
                    cnt++;
                }
            }
            if (cnt > n / 2) {
                return arr[i];
            }
        }
        return -1;
    }
};
```

- TC: O(n^2)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
public:
    int majorityElement(vector<int>& arr) {
        int n = arr.size();

        int cnt = 1;
        int cand = arr[0];

        for (int i=1; i<n; i++){
            if (arr[i]==cand){
                cnt++;
            }
            else {
                cnt--;
                if (cnt==0){
                    cand = arr[i];
                    cnt = 1;
                }
            }
        }

        int verify_cnt = 0;
        for (int i=0; i<n; i++){
            if (arr[i]==cand){
                verify_cnt++;
            }
        }
        
        if (verify_cnt>(n/2)){
            return cand;
        }
        return -1;
    }
};
```

- TC: O(n)
- SC: O(1)

---

## Look out

1. This is Moore's Voting Algorithm.
