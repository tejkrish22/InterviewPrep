## What is a Tokenizer?

A **Tokenizer** is the translation layer between human language strings and the multi-dimensional integer tensors ingested by neural networks.

Every Large Language Model is trained on a specific tokenizer. Because neural network weights are indexed by token IDs, a model can only operate with the exact tokenizer paired with it during pre-training.

---

## The Tokenization Lifecycle

The tokenization workflow consists of two symmetrical phases:

```text
Text: "Hello world"
      |
      v  [Tokenization / Encoding]
Token Chunks: ["Hello", " world"]
      |
      v  [Vocabulary Lookup]
Token IDs: [9906, 1917]
      |
      v  [Model Generation / Next-Token Predictions]
Output Token IDs: [9906, 1917, 0]
      |
      v  [Decoding / Detokenization]
Output Text: "Hello world!"
```

1. **Splitting / Normalization**: The raw string is normalized (handling Unicode, accents, whitespace) and partitioned into sub-word units using algorithms like Byte-Pair Encoding (BPE) or WordPiece.
2. **Vocabulary Lookup**: Each sub-word unit is mapped to a unique integer index in the tokenizer's fixed vocabulary table.
3. **Tensor Creation**: The token indices are assembled into an input tensor along with an `attention_mask` indicating real tokens versus padding tokens.
4. **Detokenization**: During model output, generated token IDs are looked up in reverse to assemble the final output string.

---

## Special Tokens

Tokenizers incorporate reserved **special tokens** that signal syntactic boundaries and metadata to the LLM:

- **BOS (Beginning of Sequence)**: Tells the model that a new independent document or generation context begins here (e.g., `<s>` or `<|im_start|>`).
- **EOS (End of Sequence)**: Signals that the model has completed its generation and should stop emitting tokens (e.g., `</s>` or `<|im_end|>`).
- **PAD (Padding)**: Used in batched inference to align sequences of unequal length to the same tensor dimension.
- **Role Markers**: Delimits conversational turns (e.g., `<|im_start|>system\n...<|im_end|>\n<|im_start|>user\n...`).

---

## Why Tokenizers Differ Across Models

Different LLM families utilize distinct tokenizers:

- **Llama 3 Tokenizer**: Utilizes a 128,000-token vocabulary (Tiktoken-based BPE), enabling significantly higher compression efficiency on code and multilingual text compared to Llama 2's 32,000-token vocabulary.
- **GPT-4o Tokenizer (`o200k_base`)**: Expands vocabulary to ~200,000 tokens, reducing the token count required to represent non-English languages and code.
- **Why Token Count Does Not Equal Word Count**: A text passage that consumes 100 tokens on Llama 3 might consume 130 tokens on Llama 2 or 85 tokens on GPT-4o. The absolute token count is a function of the tokenizer's vocabulary compression, whereas the model's output quality depends on its neural network weights.
