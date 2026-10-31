![[image.png]]

---

## Curriculum Overview

This module covers the core concepts, runtime architectures, developer tooling, and techniques in modern **Large Language Model (LLM) Engineering** and **Generative AI**. The material is organized into six topic-driven modules:

---

## 1. Foundations & Architecture

Core theoretical and systemic foundations behind generative language models:

- **[[1_Intro to LLMs]]**: The 3 dimensions of LLM engineering, open vs closed models, model distillation, and model flavors (Base, Chat/Instruct, Reasoning with budget forcing).
- **[[2_Transformer Architecture]]**: History from Google's "Attention Is All You Need", Transformers vs LSTMs, Self-Attention mechanism, model parameters, and scaling frontiers.
- **[[3_Tokens and Context Windows]]**: Evolution from characters to sub-word tokens, token IDs, vocabulary, `tiktoken`, statelessness of API calls, and context window economics.

---

## 2. APIs & Inference

Interfacing with models in cloud environments and on local hardware:

- **[[1_Chat Completions and OpenAI Compatibility]]**: The Chat Completions standard, raw HTTP `requests` vs strongly typed SDKs, and OpenAI-compatible endpoints.
- **[[2_Local Inference with Ollama]]**: Architecture of Ollama, downloading and serving local models, and comparing packaged runtimes with code libraries.
- **[[3_Frontier APIs and Optimization]]**: Sizing vs reasoning trade-offs, ultra-fast inference (Groq LPUs), API routers (OpenRouter), abstraction frameworks (`LiteLLM`), and prompt caching mechanics.

---

## 3. Prompting & Applications

Building applications, structured extraction, and interactive web UIs:

- **[[1_Prompt Engineering]]**: System vs user prompts, Zero-shot, Single-shot, and Multi-shot prompting, structured output (JSON/Markdown), and the "GPT Wrapper" pattern.
- **[[2_Gradio UIs and Streaming]]**: Overcoming training cutoffs, the Gradio web UI framework, and token streaming via Python generators (`yield`) with `stream=True`.
- **[[3_Conversational Chatbots]]**: Multi-turn dialogue state with `gr.ChatInterface`, conversation arrays, and dynamic system prompt context injection.

---

## 4. Tools & Agentic AI

Connecting LLMs to external systems and autonomous workflows:

- **[[1_Tool Calling]]**: Expanding model knowledge and executing actions; theory vs practice; embedded execution flow diagrams; tools as natural-language conditional routing.
- **[[2_Intro to Agents]]**: Defining AI agents; the iterative perception-action loop; 5 core pillars (Memory, Planning, Autonomy, Orchestration, Tool use).

---

## 5. Hugging Face Ecosystem

Open-source tooling, libraries, and model compression:

- **[[1_Hugging Face Overview]]**: The platform triad (Hub, Datasets, Spaces) and core libraries (`transformers`, `peft`, `trl`, `accelerate`).
- **[[2_Pipelines]]**: High-level vs low-level APIs; out-of-the-box NLP tasks (Sentiment Analysis, NER, QA, Summarization, Translation).
- **[[3_Tokenizers Deep Dive]]**: Tokenizer mechanics, text-to-tensor mapping, vocabulary tables, special tokens, and model-specific differences.
- **[[4_Model Quantization]]**: Compressing parameters from FP32/FP16 down to INT8 and INT4; efficiency vs accuracy trade-offs; PTQ vs Quantization-Aware Training (QAT).

---

## 6. Retrieval-Augmented Generation (RAG)

Grounding LLMs with dynamic external knowledge:

- **[[1_Intro to RAG]]**: Solving static cutoff dates and hallucinations; the 3-phase pipeline: Retrieval $\to$ Prompt Augmentation $\to$ Grounded Generation.
- **[[2_Vector Embeddings and Semantic Search]]**: Auto-encoding vs auto-regressive models, token vs vector representations, latent space geometry, and distance metrics.
- **[[3_Chunking and Vector Databases]]**: Document text splitters, chunk size and overlap trade-offs, ChromaDB, and visualizing embeddings with t-SNE.
- **[[4_RAG Pipelines and Context Management]]**: LangChain `Retriever` vs `LLM` abstractions, model temperature mechanics, Gradio UI, and conversational query rewriting.
- **[[5_RAG Evaluation and Metrics]]**: Golden datasets, retrieval metrics (MRR, nDCG, Keyword Coverage), and LLM-as-a-judge with Pydantic structured scoring.
- **[[6_Advanced RAG Techniques]]**: 10 production optimization techniques and building a pure-Python RAG pipeline without LangChain.
- **[[Rag week summary]]**: Master weekly curriculum summary covering Day 1 through Day 5 video and notebook walkthroughs.

---

## Historical Daily Course Log Archive

The original chronological day-by-day course notes are preserved in the `Archive/` folder:

- **Week 1**:
  - [[Week 1 Day 1 - Intro to Ollama]]
  - [[Week 1 Day 2 - Intro to LLMs]]
  - [[Week 1 Day 3 - Deeper Understanding of LLMs]]
  - [[Week 1 Day 4 - Stuff under LLM]]
  - [[Week 1 Day 5 - Generating a Sales Brochure]]
- **Week 2**:
  - [[Week 2 Day 1 - Frontier Model APIs]]
  - [[Week 2 Day 2 - Gradio UI]]
  - [[Week 2 Day 3 - Personal Assistant Chatbot]]
  - [[Week 2 Day 4 - Tools]]
  - [[Week 2 Day 5 - Intro to Agentic AI]]
- **Week 3**:
  - [[Week 3 Day 1 - Intro to Hugging Face and running stuff in Google Colab]]
  - [[Week 3 Day 2 - Hugging Face Pipelines]]
  - [[Week 3 Day 3 - Tokenizers]]
  - [[Week 3 Day 4 - Deep dive into Transformers Quantization and Neural Networks]]
