## The Currency of LLMs: Tokens

Neural networks cannot directly process raw English characters or strings. Instead, text is transformed into numerical vectors through a process called **Tokenization**.

---

## The Evolution of Text Representation

1. **Character-Level Representation**:
   - Neural networks were initially trained on individual characters (`c`, `a`, `t`).
   - Advantage: Small vocabulary size.
   - Disadvantage: Sequences become excessively long, making it difficult for the network to capture semantic relationships across long passages.
2. **Word-Level Representation**:
   - Every individual word gets its own entry.
   - Advantage: Captures semantic meaning directly.
   - Disadvantage: Out-of-vocabulary (OOV) words break the system; requires massive vocabulary dictionaries that explode parameter requirements.
3. **Sub-Word Tokenization (The Modern Standard)**:
   - Balances characters and whole words. Common words are single tokens, while rare, compound, or non-English words are split into sub-word chunks (e.g., Byte-Pair Encoding or WordPiece).
   - Typically, $1\text{ token} \approx 0.75\text{ words}$ (or roughly 4 characters in English).

---

## Token IDs and Vocabulary

A tokenizer maps between human-readable text and an array of integer token indices:

```python
import tiktoken

# Load tokenizer encoding for modern GPT models
encoding = tiktoken.encoding_for_model("gpt-4o-mini")

text = "Hi my name is Ed and I like banoffee pie"
tokens = encoding.encode(text)

print(f"Token IDs: {tokens}")
for token_id in tokens:
    token_text = encoding.decode([token_id])
    print(f"ID {token_id:>6} -> '{token_text}'")
```

- **Vocabulary Table**: A fixed dictionary mapping strings to integers.
- **Special Tokens**: Reserved tokens that delineate boundaries and metadata, such as `<|im_start|>`, `<|im_end|>`, `<|endoftext|>`, and role indicators (`system`, `user`, `assistant`).

---

## The Stateless Nature of LLM Calls

Every call to a modern LLM API (such as OpenAI, Anthropic, or Gemini) is completely **stateless**:

- The model maintains **zero persistent memory** of previous requests across independent HTTP requests.
- To maintain a conversation, the client application must resend the **entire conversation history** with each new user query.

```text
Turn 1:
User: "My name is Ed."
Sent to API: [User: "My name is Ed."]
Model Output: "Hello Ed! Nice to meet you."

Turn 2:
User: "What is my name?"
Sent to API: [
  User: "My name is Ed.",
  Assistant: "Hello Ed! Nice to meet you.",
  User: "What is my name?"
]
Model Output: "Your name is Ed!"
```

### The "Illusion of Memory" & Billing Implications

The apparent conversational memory of ChatGPT is an architectural illusion created by resending prior chat turns in the input prompt.

- **Cost Accumulation**: Because input tokens are billed on every request, long multi-turn conversations cost quadratically more tokens over time.
- **Compute Costs**: Providers charge for all input tokens processed during the forward pass of that request.

---

## Context Windows

The **Context Window** is the maximum sequence length (number of input plus output tokens) that the model's attention mechanism can process in a single request.

### Anatomy of the Context Window

1. **System Prompt**: Base instructions defining persona, constraints, and tool definitions.
2. **Few-Shot Examples**: Demonstration input-output pairs provided to guide formatting.
3. **Conversation History**: All previous turns in the session.
4. **Current Query**: The user's latest prompt.
5. **Generated Output**: The new tokens produced by the model.

### Context Window Evolution

| Era / Generation | Typical Context Window | Key Limitation / Capability |
| :--- | :--- | :--- |
| **GPT-3 / GPT-3.5** | 2,048 – 4,096 tokens | Easily exhausted by multi-turn chats or medium articles. |
| **GPT-4** | 8,192 – 32,768 tokens | Sufficient for small documents and conversational tools. |
| **Modern Frontier (GPT-4o, Claude 3.5, Gemini 1.5/2.0)** | 128,000 – 2,000,000 tokens | Ingests full codebases, hours of audio/video, or multiple books in a single prompt. |

### Why Context Windows Matter for Architecture

- **In-Context Learning**: Large context windows allow providing extensive multi-shot examples directly in the prompt without fine-tuning.
- **RAG vs Long Context**: While long context windows permit stuffing entire documents into prompts, cost, latency, and "lost-in-the-middle" attention degradation make targeted retrieval (RAG) highly efficient.
