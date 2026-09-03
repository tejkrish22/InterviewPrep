---
pattern: "[[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]"
SubPattern:
confidence: 4
unique: false
link:
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
            # If eligible candidate we need to find next candidate who is 
            # greater than the current
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
            # If eligible candidate we need to find next candidate who is 
            # smaller than the current
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

----
## Complexity

### Time Complexity

1. O (log n)
2. Standard Binary Search

### Space Complexity

1. O (1)

---
## Look out

1. 