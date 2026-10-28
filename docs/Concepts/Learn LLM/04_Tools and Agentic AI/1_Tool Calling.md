## Function Calling & Tool Use

By default, an LLM is a text-in, text-out predictor isolated from live computing environments. It cannot query real-time databases, check current weather, or interact with external services directly.

**Tool Calling** (also termed *Function Calling*) bridges this divide by allowing models to communicate with external APIs and custom software functions.

---

## Core Purposes of Tool Calling

1. **Knowledge Expansion**: Dynamically fetching live data (stock prices, calendar events, search results, database records) to augment the model's response without retraining.
2. **Action Execution**: Performing actions within software applications on behalf of the user (e.g., booking an appointment, triggering a GitHub workflow, or writing a file to disk).

---

## Tool Calling in Theory vs Practice

A common misconception is that the LLM itself executes code or directly opens network sockets to external APIs. In reality, the LLM acts purely as a structured decision engine:

### In Theory (Conceptual Perspective)

![[image 1.png]]

Conceptually, a user makes a request to the LLM, and the LLM appears to directly reach out and call external tools to fetch answers.

### In Practice (Actual Execution Flow)

![[image 2.png]]

In real production systems, execution follows a deterministic client-mediated loop:

1. **Tool Advertising**: The client application presents the LLM with a list of available tool schemas (JSON specifications describing the function name, description, and required parameters).
2. **Decision & Argument Formulation**: The LLM evaluates the user prompt against the tool schemas. If a tool is needed, the model emits a structured response containing a `tool_calls` payload with extracted arguments instead of answering directly.
3. **Client Execution**: The host application catches the `tool_calls` request, executes the actual code (e.g., running an SQL query or calling a REST API), and captures the output.
4. **Context Injection**: The tool's output is injected back into the conversation as a message with `role: "tool"`.
5. **Final Synthesis**: The LLM consumes the original conversation plus the newly injected tool result to generate the final human-readable response.

---

## Tools as Natural-Language Conditional Logic

Fundamentally, tool calling allows developers to construct **if-else conditional logic written in natural language**:

- Instead of hardcoding regex or rigid rule engines to parse user commands, the LLM dynamically evaluates user intent and decides which tool to trigger.
- The model extracts untyped natural language input into validated, typed arguments (e.g., parsing `"Check the weather for Tokyo next Tuesday"` into `{"location": "Tokyo", "date": "2026-11-03"}`).

---

## The Bridge to Agentic AI

Tool calling provides the two foundational building blocks required for autonomous AI agents:

1. **Tool Invocation of Another LLM**: A tool can be configured to prompt a secondary, specialized LLM (e.g., an analyst agent invoking a coder agent).
2. **Goal & State Tracking**: A tool can manipulate state—such as updating a task list, checking off completed items, or logging progress toward an objective.
