---
title: "Home"
---

Welcome to the **Software Engineering Interview Preparation** notes: pattern-based DSA practice and core computer science concepts for software engineering interviews.

---

## Overview

The notes are organized into two parts:

1. **Data Structures & Algorithms (DSA)**: pattern cheat sheets and solved problems with C++ code and complexity analysis.
2. **Core CS & AI Concepts**: Computer Networks, Operating Systems, OOP, C++, Cloud Computing, System Design, and Large Language Models (LLMs).

---

## Data Structures & Algorithms

- **[Pattern Cheat Sheets](./Data%20Structures%20and%20Algorithms/Patterns/)**: 17 core patterns with recognition cues and common pitfalls:
  - [[Arrays]] | [[Two Pointers]] | [[Sliding Window]] | [[Data Structures and Algorithms/Patterns/Binary Search|Binary Search]]
  - [[Stack]] | [[Queue]] | [[Heap]]
  - [[Trees]] | [[BST]] | [[Trie]]
  - [[Graphs]] | [[DFS]] | [[BFS]] | [[Union Find]]
  - [[Greedy]] | [[Backtracking]] | [[Dynamic Programming]]
- **[Problem Solutions](./Data%20Structures%20and%20Algorithms/Problems/)**: solved problems (Binary Search so far), each tagged with its pattern, sub-pattern, and a confidence rating.
- **[Problems Table](./Data%20Structures%20and%20Algorithms/Problems.base)**: a table of all solved problems with their pattern and confidence.

---

## Core Computer Science & AI Concepts

- **[Computer Networks](./Concepts/Computer%20Networks/)**: OSI and TCP/IP models, physical and data link layers, topologies and VLANs, IP addressing and subnetting, routing (RIP, OSPF, EIGRP, BGP), TCP/UDP, and HTTP.
- **[Operating Systems](./Concepts/Operating%20Systems/)**: Processes and the PCB, CPU scheduling (FCFS to multilevel feedback queues and multicore), kernels and OS structures, load balancing, and threads.
- **[Object-Oriented Programming](./Concepts/Object%20Oriented%20Programming/)**: The four pillars (encapsulation, inheritance, polymorphism, abstraction), SOLID design principles, and association, aggregation, and composition.
- **[C++](./Concepts/C++%20Notes/)**: Smart pointers (`std::unique_ptr`, `std::shared_ptr`), exception handling, file handling, and templates.
- **[Cloud Computing](./Concepts/Cloud%20Computing/)**: Cloud computing basics and service models, AWS fundamentals, IAM, and EC2.
- **[High-Level System Design](./Concepts/High%20Level%20Design/)**: An overview of system design building blocks through a pizza-shop analogy: scaling, microservices, load balancing, caching, queues, rate limiting, and consistency.
- **[Learn LLM & AI](./Concepts/Learn%20LLM/)**: A 3-week course log covering Ollama, frontier model APIs, Gradio, tools, agentic AI, Hugging Face, tokenizers, transformers, and quantization.

---

## Problem Note Format

Every DSA problem follows the same structure (see the DSA Template):

```markdown
---
pattern: "[[Pattern]]"         # e.g. Binary Search
SubPattern: "[[Sub-pattern]]"  # optional, e.g. Binary Search On Answer
confidence: 3                  # 1 (shaky) to 5 (solid)
unique: false
link: https://...              # problem statement
---

## Question       # problem statement, with an ### Example
## Code           # C++ solution
## Complexity     # ### Time Complexity and ### Space Complexity
## Look out       # edge cases and pitfalls
```
