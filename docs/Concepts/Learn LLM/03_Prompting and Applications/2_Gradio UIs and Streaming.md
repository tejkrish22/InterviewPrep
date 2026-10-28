## Building Web UIs for LLMs with Gradio

Static LLMs suffer from **training cutoffs**—they cannot answer questions regarding events, data, or dates that occurred after their training cutoff date. To make models genuinely useful to users, engineers construct interactive web applications that accept live inputs and deliver responsive interfaces.

**Gradio** (developed by Hugging Face) is a Python library that allows developers to create and share interactive machine learning web applications in just a few lines of code.

---

## Core Gradio Capabilities

- **Rapid Prototyping**: Build complete interfaces without writing HTML, CSS, or JavaScript.
- **Built-in Sharing**: Launching with `share=True` generates a temporary public `gradio.live` tunnel link.
- **Authentication**: Add lightweight username/password authentication via a single parameter (`auth=("admin", "pass")`).
- **Theming & Layout**: Out-of-the-box light/dark mode support and customizable components (Textboxes, Markdown displays, Sliders, Dropdowns).

---

## Real-Time Token Streaming with Python Generators

Waiting for a 500-word model response to finish generating before showing anything creates high perceived latency (often 5 to 10 seconds).

By combining the Chat Completions API parameter `stream=True` with Python **generator functions** (`yield`), the UI updates incrementally token-by-token:

```python
import gradio as gr
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
MODEL = "llama3.2"

system_message = "You are a concise AI engineering tutor."


def stream_llm(prompt):
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": prompt}
    ]

    stream = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        stream=True
    )

    accumulated_text = ""
    for chunk in stream:
        delta = chunk.choices[0].delta.content or ""
        accumulated_text += delta
        yield accumulated_text


# Configure Gradio Interface
message_input = gr.Textbox(
    label="Your Question:",
    placeholder="Ask something about transformers...",
    lines=4
)
message_output = gr.Markdown(label="Response:")

demo = gr.Interface(
    fn=stream_llm,
    title="Local LLM Explorer",
    inputs=[message_input],
    outputs=[message_output],
    examples=[
        ["Explain the Self-Attention mechanism in simple terms."],
        ["What is the difference between float32 and int8 quantization?"]
    ],
    flagging_mode="never"
)

if __name__ == "__main__":
    demo.launch()
```

### How the Generator Works

1. `client.chat.completions.create(..., stream=True)` returns a chunked iterator.
2. The loop iterates over each token chunk as soon as the inference server emits it.
3. The `yield accumulated_text` statement pushes the updated string to the Gradio frontend in real time over Server-Sent Events (SSE) or WebSockets.
