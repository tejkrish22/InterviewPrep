## Foundations of Prompt Engineering

**Prompt Engineering** is the practice of structuring, refining, and designing input prompts to reliably steer an LLM's output toward desired formats, reasoning paths, and behavioral constraints.

---

## System Prompts vs User Prompts

In role-based conversational architectures, prompts are partitioned into two distinct tiers:

1. **System Prompt**:
   - Establishes the operational persona, tone, safety guardrails, output schemas, and domain instructions.
   - Remains relatively static across multiple user requests in an application session.
   - Example: `"You are an experienced technical interviewer evaluating candidate code. Format all feedback as concise markdown bullet points and never provide the full solution immediately."`
2. **User Prompt**:
   - Contains the dynamic task, question, or payload provided by the human end-user or upstream system.
   - Example: `"Here is my binary search implementation in C++. Can you evaluate its edge cases?"`

---

## Prompting Paradigms: Zero, Single, and Multi-Shot

The number of demonstrations provided in the prompt directly impacts the model's consistency:

### 1. Zero-Shot Prompting

Providing an instruction without any demonstration examples:

```text
Classify the sentiment of the following customer review as Positive, Neutral, or Negative.

Review: "The package arrived two days late and the zipper was stuck."
Sentiment:
```

### 2. Single-Shot Prompting

Providing exactly one demonstration of an expected input-output pair before presenting the target query:

```text
Extract company names and their founded years:

Input: "Apple was created in 1976 by Steve Jobs and Steve Wozniak."
Output: {"company": "Apple", "founded": 1976}

Input: "Stripe was launched in 2010 by Patrick and John Collison."
Output:
```

### 3. Multi-Shot (Few-Shot) Prompting

Supplying multiple demonstration examples covering various edge cases, output patterns, or styling subtleties:

```text
Convert informal colloquial bug reports into formal Jira tickets:

Input: "button is broken on checkout"
Output: [BUG] Checkout button unresponsive on mobile viewport during payment step.

Input: "auth crashed when i typed weird emoji in password"
Output: [BUG] Unhandled Unicode parsing exception in authentication password field.

Input: "dark mode looks weird on profile page"
Output:
```

Multi-shot prompting significantly improves reliability on complex tasks without requiring model fine-tuning.

---

## Structured Outputs (JSON & Markdown)

For downstream software integration, raw prose is difficult to parse. Modern prompting strategies mandate structured output:

- **Markdown Formatting**: Using markdown headers, tables, code fences, and lists makes output human-readable and ready for rendering in web dashboards.
- **JSON Schemas**: Requesting raw JSON (or utilizing OpenAI Structured Outputs / JSON mode) ensures the response can be directly deserialized into application data models:

```python
system_prompt = """
You are a sales brochure generator. Return ONLY valid JSON matching this schema:
{
  "company_name": "string",
  "tagline": "string",
  "key_features": ["string"],
  "target_audience": "string"
}
"""
```

---

## The "GPT Wrapper" Product Pattern

A common commercial AI product pattern is the **GPT Wrapper**:

1. A specialized web application collects user input through an intuitive form.
2. The backend constructs a carefully engineered system prompt (often enriched with single-shot or multi-shot templates).
3. The prompt is sent to a frontier LLM API (such as OpenAI or Anthropic).
4. The output is streamed back, parsed, and displayed in a polished UI (PDF export, dashboard, or email).

While sometimes critiqued for relying on external APIs, successful "wrappers" provide substantial value through domain-specific workflows, proprietary context injection, intuitive UX, and output validation.
