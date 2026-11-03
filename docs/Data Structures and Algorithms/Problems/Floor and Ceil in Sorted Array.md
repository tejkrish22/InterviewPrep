---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern: "[[Upper and Lower Limits]]"
streak: 1
last_reviewed:
next_review: 2026-11-14
trigger:
unique: false
link: https://takeuforward.org/plus/dsa/problems/floor-and-ceil-in-sorted-array?subject=dsa&approach=optimal
---
---

## Question

Given a sorted array nums and an integer x. Find the floor and ceil of x in nums. The floor of x is the largest element in the array which is smaller than or equal to x. The ceiling of x is the smallest element in the array greater than or equal to x. If no floor or ceil exists, output -1.

### Example

Input : nums =[3, 4, 4, 7, 8, 10], x= 5
Output: 4 7
Explanation: The floor of 5 in the array is 4, and the ceiling of 5 in the array is 7.

---

## Code

### Brute Force

```cpp
class Solution {
public:
    vector<int> getFloorAndCeil(vector<int> nums, int x) {
        int n = nums.size();
        int fl = -1, ce = -1;
        for (int i = 0; i < n; i++) {
            // Largest element <= x
            if (nums[i] <= x) {
                fl = nums[i];
            }
            // Smallest element >= x
            if (nums[i] >= x && ce == -1) {
                ce = nums[i];
            }
        }
        return {fl, ce};
    }
};
```

- TC: O(n)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
public:
    int getFloor (vector<int> arr, int x){
        int n = arr.size();

        int low = 0;
        int high = n-1;

        int ans = -1;

        while (low<=high){
            int mid = (low+high)/2;
            // If eligible candidate we need to find next candidate who is 
            // greater than the current
            if (arr[mid]<=x) {
                ans = arr[mid];
                low = mid+1;
            }
            else {
                high = mid-1;
            }
        }
        return ans;
    }

    int getCeil (vector<int> arr, int x){
        int n = arr.size();

        int low = 0;
        int high = n-1;

        int ans = -1;

        while (low<=high){
            int mid = (low+high)/2;
            // If eligible candidate we need to find next candidate who is 
            // smaller than the current
            if (arr[mid]>=x) {
                ans = arr[mid];
                high = mid-1;
            }
            else {
                low = mid+1;
            }
        }
        return ans;
    }

    vector<int> getFloorAndCeil(vector<int> nums, int x) {
        return {getFloor(nums,x),getCeil(nums,x)};
    }
};
```

- TC: O(log n)
    - Standard Binary Search
- SC: O(1)

---

## Look out

1.
