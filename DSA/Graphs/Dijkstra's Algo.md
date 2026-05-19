---
topic: Graphs
difficulty: Hard
pattern:
  - BFS
link: https://takeuforward.org/plus/dsa/problems/dijkstra's-algorithm?subject=dsa&approach=using-set&sidebar=open
unique: true
---
---

Tags:  #graphs 

---
# Problem
Given a weighted, undirected graph of V vertices, numbered from 0 to V-1, and an 2D vector/array which represents the edges:
Each entry in **edges[i] i**s of the form **[u, v, weight]**, where:
- **u, v** → represents the vertex having undirected edge between them
- **weight →** the weight of the edge between u and v
Given a source node S. Find the shortest distance of all the vertex from the source vertex S. Return a list of integers denoting **shortest distance** between each node and source vertex S. If a vertex is not reachable from source then its distance will be 109.

---
# Using MinHeap or Priority Queue

1. Use a `priority queue` to process nodes by their shortest known distance

```
// Min heap -> {distance, node}
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
```
2. Initialise an array to store shortest distances, with the source node set to 0 and all others to infinity.
3. Add the source node to the priority queue with a distance of 0.
4. Extract the node with the smallest distance from the queue and perform edge relaxation (update the distances to its neighbours if a shorter path is found). Add the updated neighbours back to the queue.
5. The distance array contains the shortest distances from the source to all node.

**TC:** O((E)xlog V)
**SC:** O(V)

---
# Using Set

1. Use a `set` to process nodes by their shortest know distance.
2. Initialise an array to store shortest distances, with the source node set to 0 and all others to infinity.
3. Add the source node to the set with a distance of 0.
4. Extract the node with smallest distance from the set and perform edge relaxation (update the distances to its neighbours if a shorter path is found and erase the element in set with distance other than infinity for the same node). Add the updated neighbours back to the set. 
5. The distance array contains the shortest distances from the source to all node.

**TC:** O((E)xlog V)
**SC:** O(V)

---
# Mistakes I Made

# Similar Problems
