## What is an AI Agent?

An **AI Agent** is an autonomous system where a Large Language Model controls its own execution loop, making decisions, executing tools, and evaluating intermediate results iteratively to achieve an objective.

Unlike standard single-turn LLM completions ("prompt in $\to$ text out"), an agent operates in a continuous control loop:

```text
               +---------------------------------------+
               |              Goal Prompt              |
               +---------------------------------------+
                                  |
                                  v
                       +----------------------+
                       |     Reason & Plan    | <------+
                       +----------------------+        |
                                  |                    |
                                  v                    |
                       +----------------------+        |
                       |     Select Tool      |        |
                       +----------------------+        |
                                  |                    |
                                  v                    |
                       +----------------------+        | (Loop until complete)
                       |     Execute Tool     |        |
                       +----------------------+        |
                                  |                    |
                                  v                    |
                       +----------------------+        |
                       |  Observe / Evaluate  | -------+
                       +----------------------+
                                  |
                                  v (Goal Achieved)
                       +----------------------+
                       |     Final Answer     |
                       +----------------------+
```

---

## The 5 Core Pillars of Agentic AI

Modern autonomous agents are characterized by five fundamental capabilities:

1. **Memory & Persistence**:
   - Short-term working memory: Current conversation history, scratchpad notes, and active context window.
   - Long-term persistent memory: Vector databases, file storage, or external logs retaining state across multiple sessions.
2. **Planning Capabilities**:
   - The ability to decompose complex goals into discrete, sequential sub-tasks (e.g., plan-and-solve, ReAct framework).
   - Dynamic reflection and self-correction when tool outputs indicate errors or unexpected results.
3. **Autonomy**:
   - Independent decision-making: Evaluating whether additional actions are required without prompting the human user for each intermediate step.
4. **LLM Orchestration**:
   - Routing and delegating sub-problems to specialized model instances or secondary subagents (e.g., an orchestrator model delegating code generation to a coding-specific model).
5. **Tool Functionality**:
   - Access to external environments (browsers, shell execution, database query engines, calculator APIs, file systems).

---

## Architectural Distinctions: Chatbot vs Agent

| Characteristic | Standard Chatbot | Autonomous Agent |
| :--- | :--- | :--- |
| **Control Flow** | Reactive; 1 user prompt yields 1 response. | Proactive; 1 user goal triggers multi-step loops. |
| **Execution Horizon** | Immediate single step. | Extended multi-step horizon until success criteria met. |
| **Tool Usage** | Occasional, single-turn information lookup. | Iterative chaining of tools (search $\to$ fetch $\to$ analyze $\to$ write). |
| **Error Recovery** | Asks user for clarification when failing. | Inspects tool errors and automatically attempts alternative approaches. |
