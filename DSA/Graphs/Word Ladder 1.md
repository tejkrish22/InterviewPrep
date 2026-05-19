---
topic: Graphs
difficulty: Hard
pattern:
  - BFS
link: https://takeuforward.org/plus/dsa/problems/word-ladder-i?subject=dsa&approach=word-ladder-part-2
unique: true
---
---

Tags:  #graphs #explicit_hard #no_intuition

---
# Problem
Given are the two distinct words startWord and targetWord, and a list of size N, denoting wordList of **unique words** of equal size M. Find the length of the shortest transformation sequence from startWord to targetWord.

Keep the following conditions in mind:
- A word can only consist of lowercase characters.
- Only one letter can be changed in each transformation.
- Each transformed word must exist in the wordList including the targetWord.
- startWord may or may not be part of the wordList

**Note:** If there’s no possible way to transform the sequence from startWord to targetWord return 0.

---
# Brute Idea

1. Use a queue to store pairs of words and their corresponding transformation steps. Start with the initial word and step count of 1.
2. Convert the word list into a hash set for efficient word existence checks and removal operations.
3. While the queue is not empty:
    - Extract the current word and its step count.
    - If the current word matches the target word, return the step count.
4. For each character in the current word, change it to every letter from 'a' to 'z'. For each transformation:
    - Check if the new word is in the hash set.
    - If found, remove it from the set, marking it as visited, and add it to the queue with an incremented step count.
5. If the queue is exhausted without finding the target word, return 0.

**TC:** O(nxmx26)
**SC:** O(N)

---
# Mistakes I Made

# Similar Problems
