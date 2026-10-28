## Learn LLM Topic-Wise Reorganization Design

## Context & Objectives

The `docs/Concepts/Learn LLM` section currently consists of 14 separate daily notes (`Week 1 Day 1` through `Week 3 Day 4`) and a brief `RAG/Intro.md`. While this structure tracks chronologically as a learning journal, it makes conceptual lookup and revision difficult for technical interview preparation.

The objective of this project is to reorganize the entire knowledge base into structured, topic-driven modules mirroring the rest of the vault (such as `docs/Concepts/Computer Networks/` and `docs/Concepts/Operating Systems/`), while archiving the original daily logs for historical reference and preserving full Quartz & Markdownlint validation.

---

## Architecture & Directory Structure

```text
docs/Concepts/Learn LLM/
├── Learn LLM.md                                            # Master index and syllabus
├── Images/                                                 # Centralized image assets
│   ├── image.png
│   ├── image 1.png
│   └── image 2.png
├── Archive/                                                # Preserved daily course notes
│   ├── Week 1 Day 1 - Intro to Ollama.md
│   ├── Week 1 Day 2 - Intro to LLMs.md
│   ├── Week 1 Day 3 - Deeper Understanding of LLMs.md
│   ├── Week 1 Day 4 - Stuff under LLM.md
│   ├── Week 1 Day 5 - Generating a Sales Brochure.md
│   ├── Week 2 Day 1 - Frontier Model APIs.md
│   ├── Week 2 Day 2 - Gradio UI.md
│   ├── Week 2 Day 3 - Personal Assistant Chatbot.md
│   ├── Week 2 Day 4 - Tools.md
│   ├── Week 2 Day 5 - Intro to Agentic AI.md
│   ├── Week 3 Day 1 - Intro to Hugging Face and running stuff in Google Colab.md
│   ├── Week 3 Day 2 - Hugging Face Pipelines.md
│   ├── Week 3 Day 3 - Tokenizers.md
│   └── Week 3 Day 4 - Deep dive into Transformers Quantization and Neural Networks.md
├── 01_Foundations and Architecture/
│   ├── 1_Intro to LLMs.md
│   ├── 2_Transformer Architecture.md
│   └── 3_Tokens and Context Windows.md
├── 02_APIs and Inference/
│   ├── 1_Chat Completions and OpenAI Compatibility.md
│   ├── 2_Local Inference with Ollama.md
│   └── 3_Frontier APIs and Optimization.md
├── 03_Prompting and Applications/
│   ├── 1_Prompt Engineering.md
│   ├── 2_Gradio UIs and Streaming.md
│   └── 3_Conversational Chatbots.md
├── 04_Tools and Agentic AI/
│   ├── 1_Tool Calling.md
│   └── 2_Intro to Agents.md
├── 05_Hugging Face Ecosystem/
│   ├── 1_Hugging Face Overview.md
│   ├── 2_Pipelines.md
│   ├── 3_Tokenizers Deep Dive.md
│   └── 4_Model Quantization.md
└── 06_RAG/
    └── 1_Intro to RAG.md
```

---

## Detailed Note Content Specification

### 1. Module 01: Foundations and Architecture

- **`1_Intro to LLMs.md`**:
  - 3 Dimensions of LLM Engineering (Models, Tools, Techniques).
  - Frontier closed-source vs open-source models (OpenAI, Anthropic, Google, Meta Llama, Mistral, Qwen, DeepSeek).
  - Model Distillation concepts.
  - Three model flavors: Base models, Chat/Instruct models, Reasoning/Thinking models (reasoning budget and budget forcing).
  - Strengths and inherent blind spots of frontier LLMs (synthesis, coding vs hallucination, domain depth).
- **`2_Transformer Architecture.md`**:
  - The seminal paper: "Attention is All You Need" (Google 2017).
  - Neural network evolution: RNN/LSTM vs Transformers.
  - The Self-Attention mechanism and parallel training benefits.
  - Parameters (trainable weights and biases), scaling laws, inference-time vs training-time scaling.
- **`3_Tokens and Context Windows.md`**:
  - Evolution of input parsing: characters $\to$ words $\to$ sub-word tokens.
  - Token IDs and vocabularies; token inspection with `tiktoken`.
  - The stateless nature of LLM calls ("illusion of memory") and cumulative context costs.
  - Context Window definition, practical constraints, and pricing dynamics.

### 2. Module 02: APIs and Inference

- **`1_Chat Completions and OpenAI Compatibility.md`**:
  - Origin and mechanics of the Chat Completions standard.
  - Direct HTTP calls via `requests` vs the official `openai` SDK wrapper.
  - The OpenAI-compatible endpoints paradigm enabling seamless provider swapping.
  - Multi-turn message structure (`system`, `user`, `assistant`).
- **`2_Local Inference with Ollama.md`**:
  - Ollama overview: packaged model binaries with local execution runtime.
  - Interfacing with local models using the OpenAI Python client (`http://localhost:11434/v1`).
  - Trade-offs: Ollama pre-packaged runtimes vs low-level Python model libraries.
- **`3_Frontier APIs and Optimization.md`**:
  - Reasoning depth vs model capacity trade-offs.
  - Specialized low-latency inference providers (Groq LPU hardware).
  - Unified routing layers (OpenRouter).
  - Framework abstractions (`LiteLLM`, `LangChain`) for token and expense tracking.
  - Cloud Prompt Caching mechanisms (OpenAI prefix caching, Anthropic explicit breakpoint caching, Gemini explicit/implicit caching).

### 3. Module 03: Prompting and Applications

- **`1_Prompt Engineering.md`**:
  - Crafting effective system and user prompts.
  - Single-shot vs Multi-shot prompting paradigms.
  - Structured output extraction using Markdown and JSON schemas.
  - Concept of the "GPT Wrapper" commercial application.
- **`2_Gradio UIs and Streaming.md`**:
  - Overcoming training cutoff limitations through dynamic inputs.
  - Hugging Face Gradio UI framework: text inputs, markdown rendering, components.
  - Real-time token streaming using Python generator functions (`yield`) and `stream=True`.
- **`3_Conversational Chatbots.md`**:
  - State management using Gradio's `ChatInterface`.
  - Multi-turn conversation retention across user interactions.
  - Dynamic system prompt alteration based on message keywords (lightweight context injection).

### 4. Module 04: Tools and Agentic AI

- **`1_Tool Calling.md`**:
  - Purpose of external tool invocation: knowledge expansion and active execution.
  - Theory vs practice: how models emit structured tool requests rather than executing code directly.
  - Embedded diagrams (`![[image 1.png]]`, `![[image 2.png]]`).
  - Tool calling as natural-language conditional routing.
- **`2_Intro to Agents.md`**:
  - Core definition of an AI Agent (an LLM controlling an execution loop).
  - Foundational capabilities: Memory/Persistence, Planning, Autonomy, Multi-LLM Orchestration, Tool utilization.

### 5. Module 05: Hugging Face Ecosystem

- **`1_Hugging Face Overview.md`**:
  - The Hugging Face platform triad: Model Hub, Datasets, and Spaces.
  - Core Python libraries: `huggingface_hub`, `datasets`, `transformers`, `peft` (LoRA/QLoRA), `trl`, and `accelerate`.
  - Direct library manipulation vs fixed runtime engines.
- **`2_Pipelines.md`**:
  - Two distinct HF API levels: High-level Pipelines vs Low-level Models/Tokenizers.
  - Practical pipeline tasks: Sentiment analysis, NER, Text classification, Summarization, QA, Translation.
  - Implementation code using Hugging Face `pipeline`.
- **`3_Tokenizers Deep Dive.md`**:
  - Tokenizer role as the interface between human text and numerical tensors.
  - Vocabulary lookup dictionaries and token index assignment.
  - Special tokens (BOS, EOS, system identifiers).
- **`4_Model Quantization.md`**:
  - Definition and motivation: shrinking model memory footprints and accelerating inference.
  - Precision conversion: high-precision (float32) to lower-precision (int8, int4).
  - Accuracy trade-offs, resource efficiency, and Quantization-Aware Training (QAT).

### 6. Module 06: RAG (Retrieval-Augmented Generation)

- **`1_Intro to RAG.md`**:
  - Definition and core motivation: solving knowledge cutoff limitations and reducing hallucinations.
  - The basic RAG pipeline: Query $\to$ Retrieval of relevant context $\to$ Augmented prompt generation $\to$ Synthesized response.

### 7. Master Hub (`Learn LLM.md`)

- Preserves the hero image banner: `![[image.png]]`.
- Features an organized, visual syllabus linking to every topic note via Obsidian `[[wikilinks]]`.
- Contains a dedicated archive callout pointing to the `Archive/` notes.

---

## Vault Guidelines & Quality Assurance

1. **Heading Hierarchy**: In accordance with Quartz site conventions, **no note will use H1 (`#`) headings**. All notes begin at `##` so that Quartz renders the note title from the filename.
2. **Markdown Style**: Consistent blank lines before and after headings, fenced code blocks with explicit language tags (`python`, `text`, `bash`).
3. **Wikilink Integrity**: All wikilinks will be validated via `npm run lint` and `npm run test:links` to guarantee zero broken links.
4. **Git Versioning**: Clean commit containing the design document, followed by systematic execution steps.
