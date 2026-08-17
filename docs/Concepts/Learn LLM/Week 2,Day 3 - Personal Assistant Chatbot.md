---
notion-id: 323d9a38-fc71-8033-aaf9-f1903a7446f7
---
1. Today using Gradio’s  chat interface, we can create a personal chatbot assistant.

```python
from openai import OpenAI
import gradio as gr

ollama = OpenAI(
    api_key="ollama",
    base_url="http://localhost:11434/v1"
)

MODEL = "llama3.2"

system_message = """
You are a helpful assistant in a clothes store.
Encourage customers to try items that are on sale.

Hats are 60% off.
Most other items are 50% off.

If customers are unsure what to buy, recommend hats.
"""


def chat(message, history):
    history = [{"role":h["role"], "content":h["content"]} for h in history]
    relevant_system_message = system_message
    if 'belt' in message.lower():
        relevant_system_message += " The store does not sell belts; if you are asked for belts, be sure to point out other items on sale."
    
    messages = [{"role": "system", "content": relevant_system_message}] + history + [{"role": "user", "content": message}]

    stream = openai.chat.completions.create(model=MODEL, messages=messages, stream=True)

    response = ""
    for chunk in stream:
        response += chunk.choices[0].delta.content or ''
        yield response


gr.ChatInterface(fn=chat, type="messages").launch()
```
2. We can modify system prompt dynamically based on the user’s input, this is very light RAG stuff.
