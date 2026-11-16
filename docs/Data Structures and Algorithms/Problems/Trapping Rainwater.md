---
pattern: "[[Arrays]]"
SubPattern: "[[Two Pointers]]"
streak: 0
times_reviewed: 1
last_reviewed: 2026-11-15
next_review: 2026-11-16
trigger: "Water between walls: process the shorter side, its running max is the water level"
unique: false
link: https://takeuforward.org/practice/dsa/trapping-rainwater?category=two-pointers&source=strivers-180-master-dsa-patterns
tags:
  - striver180
---
---

## Question

Given an array of non-negative integers, **height** representing the elevation of ground. Calculate the **amount** of water that can be trapped after rain.

### Example

Input: height= [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6
Explanation: As seen from the diagram 1+1+2+1+1=6 unit of water can be trapped

---

## Code

### Brute Force

```cpp
class Solution {
public:
    int trap(vector<int> &height) {
        int n = height.size();
        int total = 0;
        for (int i = 0; i < n; i++) {
            // tallest wall on each side of i (including i)
            int leftMax = 0, rightMax = 0;
            for (int j = 0; j <= i; j++) leftMax = max(leftMax, height[j]);
            for (int j = i; j < n; j++) rightMax = max(rightMax, height[j]);
            total += min(leftMax, rightMax) - height[i];
        }
        return total;
    }
};
```

- TC: O(n^2)
- SC: O(1)

### Optimal 1

```cpp
class Solution {
private:

    // Function to find the prefix maximum array
    vector<int> findPrefixMax(vector<int> &arr, int &n) {
        // To store the prefix maximum
        vector<int> prefixMax(n);
        
        // Initial configuration
        prefixMax[0] = arr[0];
        
        // Traverse the array
        for(int i=1; i < n; i++) {
            
            // Store the maximum till ith index
            prefixMax[i] = 
                max(prefixMax[i-1], arr[i]);
        }
        
        // Return the prefix maximum array
        return prefixMax;
    }
    
    // Function to find the suffix maximum array
    vector<int> findSuffixMax(vector<int> &arr, int &n) {
        // To store the suffix maximum
        vector<int> suffixMax(n);
        
        // Initial configuration
        suffixMax[n-1] = arr[n-1];
        
        // Traverse the array
        for(int i=n-2; i >= 0; i--) {
            
            // Store the maximum till ith index
            suffixMax[i] = 
                max(suffixMax[i+1], arr[i]);
        }
        
        // Return the suffix maximum array
        return suffixMax;
    }
    
public:
    // Function to get the trapped water
    int trap(vector<int> &height){
        
        int n = height.size(); // Size of array
    
        // To store the total trapped rainwater
        int total = 0;
        
        // Calculate prefix maximum array
        vector<int> leftMax = 
            findPrefixMax(height, n);
        
        // Calculate suffix maximum array
        vector<int> rightMax = 
            findSuffixMax(height, n);
        
        // Traverse the array
        for(int i=0; i < n; i++) {
            
            /* If there are higher grounds 
            on both side to hold water */
            if(height[i] < leftMax[i] &&
               height[i] < rightMax[i]) {
                
                // Add up the water on top of current height
                total += ( min(leftMax[i], rightMax[i]) - 
                           height[i] );
            }
        }
        
        // Return the result
        return total;
    }
};
```

- TC: O(n)
- SC: O(n)

### Optimal 2

```cpp

class Solution {
public:
    int trap(vector<int>& arr) {
        int n = arr.size();
        if (n == 0) return 0;

        int total = 0;

        int leftMax = 0;
        int rightMax = arr[n-1];

        int left = 0;
        int right = n-1;

        while (left <= right) {
            if (leftMax < rightMax) {
                leftMax = max(leftMax, arr[left]);
                total += leftMax - arr[left];
                left++;
            }
            else {
                rightMax = max(rightMax, arr[right]);
                total += rightMax - arr[right];
                right--;
            }
        }

        return total;
    }
};

```

- TC: O(n)
- SC: O(1)

---

## Look out

1. Water above a bar = `min(left wall, right wall) - bar height`. A bucket fills only up to its shorter wall.
2. Two pointers intuition
	1. Compare `height[left]` and `height[right]` and work on the **shorter** side. That side is the limiting wall.
	2. A taller wall hiding elsewhere on the other side cannot raise the water level, so its exact height is not needed.
	3. Water on the shorter side = its running max - current bar (0 if the current bar is the new max).
	4. Move the pointer on the shorter side inward and repeat.
3. Prefix sum needs both `leftMax` and `rightMax` arrays (O(n) space). Two pointers only needs to know which side is smaller, so it uses O(1) space.

---

## Related Problems

1.
