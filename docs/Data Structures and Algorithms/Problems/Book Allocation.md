---
pattern: "[[Binary Search]]"
SubPattern:
  - "[[Binary Search On Answer]]"
streak: 0
times_reviewed: 0
last_reviewed: 2026-11-22
next_review: 2026-11-23
trigger: Do binary search on [max, sum] and simulate book allocation for chosen page count
unique: false
link: https://takeuforward.org/practice/dsa/book-allocation-problem?category=search-on-answer&source=strivers-180-master-dsa-patterns&sidebar=0&tab=solution&solution=binary-search
tags:
  - striver180
---
---

## Question

Given an array nums of n integers, where nums[i] represents the number of pages in the i-th book, and an integer m representing the number of students, allocate all the books to the students so that each student gets at least one book, each book is allocated to only one student, and the allocation is contiguous.

Allocate the books to m students in such a way that the maximum number of pages assigned to a student is minimized. If the allocation of books is not possible, return -1.

### Example

Input: nums = [12, 34, 67, 90], m=2
Output: 113
Explanation: The allocation of books will be 12, 34, 67 | 90. One student will get the first 3 books and the other will get the last one.

---

## Key Insight

1. The minimum possible answer could be maximum of all books, as that book has to be allocated to somebody and we cant leave a book
2. The maximum possible answer could be sum of all books, as if 1 only student is there, he has to read all books
3. Do binary search between this space and simulate the assignment of books normally

---

## Code

### Brute Force

```cpp
class Solution {
private:
    /* Function to count the number of 
    students required given the maximum 
    pages each student can read */
    int countStudents(vector<int>& nums, int pages) {
        // Size of array
        int n = nums.size();
        
        int students = 1;
        int pagesStudent = 0;
        
        for (int i = 0; i < n; i++) {
            if (pagesStudent + nums[i] <= pages) {
                // Add pages to current student
                pagesStudent += nums[i];
            } else {
                // Add pages to next student
                students++;
                pagesStudent = nums[i];
            }
        }
        return students;
    }
public:
    /*Function to allocate the book to ‘m’ 
    students such that the maximum number 
    of pages assigned to a student is minimum */
    int findPages(vector<int>& nums, int m) {
        int n = nums.size();
        
        // Book allocation impossible
        if (m > n) return -1;

        // Calculate the range for binary search
        int low = *max_element(nums.begin(), nums.end());
        int high = accumulate(nums.begin(), nums.end(), 0);

        // Linear search for minimum maximum pages
        for (int pages = low; pages <= high; pages++) {
            if (countStudents(nums, pages) <= m) {
                return pages;
            }
        }
        return low;
    }
};
```

- TC: O(n x (sum-max))
- SC: O(1)

### Optimal 1

```cpp
class Solution {
private:
    /* Function to count the number of 
    students required given the maximum 
    pages each student can read */
    int countStudents(vector<int>& nums, int pages) {
        // Size of array
        int n = nums.size();
        
        int students = 1;
        int pagesStudent = 0;
        
        for (int i = 0; i < n; i++) {
            if (pagesStudent + nums[i] <= pages) {
                // Add pages to current student
                pagesStudent += nums[i];
            } else {
                // Add pages to next student
                students++;
                pagesStudent = nums[i];
            }
        }
        return students;
    }
public:
    /*Function to allocate the book to ‘m’ 
    students such that the maximum number 
    of pages assigned to a student is minimum */
    int findPages(vector<int>& nums, int m) {
        int n = nums.size();
        
        // Book allocation impossible
        if (m > n) return -1;

        // Calculate the range for binary search
        int low = *max_element(nums.begin(), nums.end());
        int high = accumulate(nums.begin(), nums.end(), 0);
		
        // Binary search for minimum maximum pages
        while (low <= high) {
            int mid = (low + high) / 2;
            int students = countStudents(nums, mid);
            if (students > m) {
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        return low;
    }
};
```

- TC: O(n x log (sum-max))
- SC: O(1)

---

## Look out

1. ...

---

## Related Problems

1.
