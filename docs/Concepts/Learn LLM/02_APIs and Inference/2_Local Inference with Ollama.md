## What is Ollama?

**Ollama** is an open-source tool designed to download, package, and execute open-weight Large Language Models (such as Llama 3, Mistral, Qwen, and Phi) entirely locally on consumer hardware (macOS Apple Silicon, Linux, and Windows).

It abstracts away the complexities of GPU tensor allocation, quantization formats (GGUF), and system dependencies into a lightweight background service.

---

## Running Models Locally

To pull and run a model using the command-line interface:

```bash
# Pull and chat with a model in the terminal
ollama run llama3.2

# List all locally downloaded models
ollama list
```

Once running, Ollama hosts an HTTP server on port `11434` exposing OpenAI-compatible endpoints (`http://localhost:11434/v1`).

---

## Interfacing with Ollama via Python

Using the official `openai` Python SDK, applications connect to local Ollama instances by directing the client to the local daemon:

```python
from IPython.display import Markdown, display
from openai import OpenAI

# Connect to local Ollama service
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

system_prompt = "You are helping a 4th grade student learn algebra. Format with clear Markdown."
user_prompt = "Hey Llama! What is (a + b)^2 and how is it derived?"

messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": user_prompt}
]

response = client.chat.completions.create(
    model="llama3.2",
    messages=messages
)

display(Markdown(response.choices[0].message.content))
```

---

## Ollama vs Low-Level Python Libraries

When designing systems with open-source models, developers choose between pre-baked runtimes and low-level code libraries:

| Dimension | Ollama / vLLM Runtimes | Hugging Face (`transformers`, `accelerate`) |
| :--- | :--- | :--- |
| **Packaging** | Pre-quantized binary formats (e.g., GGUF) ready for execution. | Raw model checkpoints and tensors directly from the Hub. |
| **Ease of Use** | Extremely high; one CLI command to download and serve. | Moderate to advanced; requires Python scripting, PyTorch, and CUDA setup. |
| **Customizability** | Fixed inference pipeline; models cannot be fine-tuned or fundamentally altered. | Full control; access hidden states, customize attention masks, and execute fine-tuning (LoRA/QLoRA). |
| **Ideal Use Case** | Local apps, offline chatbots, developer sandboxes, private enterprise serving. | Research, model pre-training, fine-tuning, and bespoke neural network architectures. |
