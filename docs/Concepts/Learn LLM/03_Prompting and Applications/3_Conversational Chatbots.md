## Conversational Assistants with Gradio ChatInterface

While `gr.Interface` is designed for single-turn input/output tasks, multi-turn conversational agents require maintaining dialogue history across multiple rounds of interaction.

Gradio's **`gr.ChatInterface`** provides a dedicated component managing chat histories, avatars, message bubbles, retry buttons, and streaming responses out of the box.

---

## State Management and History Passing

Because LLM API endpoints are stateless, the chat function receives two arguments from Gradio:

1. `message`: The current input string entered by the user.
2. `history`: A list of prior dialogue turns structured as dictionaries with `role` and `content`.

The client function normalizes this history, prepends the system prompt, and resends the entire sequence to the model:

```python
import gradio as gr
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
MODEL = "llama3.2"

base_system_message = """
You are a helpful customer assistant in a clothing boutique.
Encourage customers to explore items currently on sale.
Current Promotions:
- Hats are 60% off.
- Most other outerwear items are 50% off.
If customers are unsure what to buy, enthusiastically recommend hats.
"""


def chat_response(message, history):
    # Normalize prior conversation history
    normalized_history = [
        {"role": turn["role"], "content": turn["content"]}
        for turn in history
    ]

    # Context injection: dynamically alter system prompt based on query content
    active_system_message = base_system_message
    if "belt" in message.lower():
        active_system_message += " Note: The boutique does not stock belts; recommend hats or scarves on sale instead."

    messages = (
        [{"role": "system", "content": active_system_message}]
        + normalized_history
        + [{"role": "user", "content": message}]
    )

    stream = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        stream=True
    )

    partial_reply = ""
    for chunk in stream:
        token = chunk.choices[0].delta.content or ""
        partial_reply += token
        yield partial_reply


demo = gr.ChatInterface(
    fn=chat_response,
    type="messages",
    title="Boutique Assistant"
)

if __name__ == "__main__":
    demo.launch()
```

---

## Dynamic System Prompt Modification (Early Context Injection)

In the snippet above, notice how the system prompt is adjusted on the fly:

```python
if "belt" in message.lower():
    active_system_message += " Note: The boutique does not stock belts; recommend hats or scarves on sale instead."
```

This represents the earliest precursor to **Retrieval-Augmented Generation (RAG)**:

- Rather than trying to hardcode every conceivable store inventory rule or scenario into a massive static system prompt, the application inspects the user's intent.
- It dynamically injects only the relevant facts or rules into the active prompt window before calling the LLM.
- This conserves token budget, reduces context window pollution, and keeps model responses sharply focused.
