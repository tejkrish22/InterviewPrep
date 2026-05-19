---
topic: Graphs
difficulty: Hard
pattern:
  - BFS
link: https://takeuforward.org/plus/dsa/problems/word-ladder-ii?subject=dsa&approach=word-ladder-part-2
unique: true
---
---

Tags:  #graphs #explicit_hard #no_intuition
 
---
# Problem
Given two distinct words startWord and targetWord, and a list denoting wordList of unique words of equal lengths. Find all **shortest transformation sequence(s)** from startWord to targetWord. You can return them in any order possible.

In this problem statement, we need to keep the following conditions in mind:

A word can only consist of lowercase characters.
Only one letter can be changed in each transformation.
Each transformed word must exist in the wordList including the targetWord.
startWord may or may not be part of the wordList.
Return an empty list if there is no such transformation sequence.

**Input:** startWord = "der", targetWord = "dfs", wordList = ["des", "der", "dfr", "dgt", "dfs"]
**Output:** [ [ “der”, “dfr”, “dfs” ], [ “der”, “des”, “dfs”] ]
**Explanation:** The length of the smallest transformation sequence here is 3.
Following are the only two shortest ways to get to the targetWord from the startWord :
"der" -> ( replace ‘r’ by ‘s’ ) -> "des" -> ( replace ‘e’ by ‘f’ ) -> "dfs".
"der" -> ( replace ‘e’ by ‘f’ ) -> "dfr" -> ( replace ‘r’ by ‘s’ ) -> "dfs".

---
# Brute Idea

1. Use a queue for breadth-first search (BFS) to handle sequences of word transformations. Add all words from the word list to a set for quick lookup. Start with the initial word and add it to the queue.
2. Perform BFS level by level. For each word in the current level:
    - Check if it matches the target word and add the sequence to the results. Generate all possible single-letter transformations.
    - If a transformed word exists in the set, add it to the current sequence and push the sequence into the queue for further exploration.
    - Mark words to be removed after the current level to prevent revisiting.
3. After adding a transformed word to the sequence, immediately remove it to restore the sequence for the next transformation.
4. Remove words marked during the level traversal from the set to prevent revisiting. Exit early if any sequences reaching the target word are found.
5. Return the list of resulting sequences.

**TC:** O(nxmx26)
**SC:** O(N)

---
# Mistakes I Made

# Similar Problems
[[Word Ladder 1]]