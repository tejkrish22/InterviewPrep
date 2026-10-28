## Learn LLM Topic-Wise Reorganization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize `docs/Concepts/Learn LLM/` from a chronological daily log into a clean, 6-module topic-wise knowledge base while archiving original notes and maintaining full Quartz & linting compliance.

**Architecture:** Create 6 modular topic folders (`01_Foundations and Architecture`, `02_APIs and Inference`, `03_Prompting and Applications`, `04_Tools and Agentic AI`, `05_Hugging Face Ecosystem`, `06_RAG`), centralize images into `Images/`, move original week notes to `Archive/`, and build an updated master index `Learn LLM.md`.

**Tech Stack:** Obsidian Markdown, Quartz static site engine, Node.js validation scripts (`validate-notes.mjs`, `check-links.mjs`, `markdownlint-cli2`).

---

### Task 1: Directory Setup, Asset Centralization & Daily Log Archiving

**Files:**

- Create: `docs/Concepts/Learn LLM/Images/`
- Create: `docs/Concepts/Learn LLM/Archive/`
- Move: `image.png`, `image 1.png`, `image 2.png` $\to$ `docs/Concepts/Learn LLM/Images/`
- Move: All 14 `Week X Day Y - ...` files $\to$ `docs/Concepts/Learn LLM/Archive/`

- [ ] **Step 1: Create directories and move files**

Run commands to create the folders and move images and original week notes into `Images/` and `Archive/`:

```bash
mkdir -p "docs/Concepts/Learn LLM/Images"
mkdir -p "docs/Concepts/Learn LLM/Archive"
mkdir -p "docs/Concepts/Learn LLM/01_Foundations and Architecture"
mkdir -p "docs/Concepts/Learn LLM/02_APIs and Inference"
mkdir -p "docs/Concepts/Learn LLM/03_Prompting and Applications"
mkdir -p "docs/Concepts/Learn LLM/04_Tools and Agentic AI"
mkdir -p "docs/Concepts/Learn LLM/05_Hugging Face Ecosystem"
mkdir -p "docs/Concepts/Learn LLM/06_RAG"

mv "docs/Concepts/Learn LLM"/image*.png "docs/Concepts/Learn LLM/Images/"
mv "docs/Concepts/Learn LLM"/Week*.md "docs/Concepts/Learn LLM/Archive/"
```

- [ ] **Step 2: Verify git status and check structure**

Run: `git status`
Expected: Renames tracked cleanly from root to `Images/` and `Archive/`.

- [ ] **Step 3: Commit initial organization**

```bash
git add "docs/Concepts/Learn LLM"
git commit -m "refactor(llm): archive daily week logs and relocate image assets"
```

---

### Task 2: Module 01 - Foundations and Architecture

**Files:**

- Create: `docs/Concepts/Learn LLM/01_Foundations and Architecture/1_Intro to LLMs.md`
- Create: `docs/Concepts/Learn LLM/01_Foundations and Architecture/2_Transformer Architecture.md`
- Create: `docs/Concepts/Learn LLM/01_Foundations and Architecture/3_Tokens and Context Windows.md`

- [ ] **Step 1: Create `1_Intro to LLMs.md`**

Write content synthesizing `Week 1 Day 2` & `Week 1 Day 3`:

- 3 Dimensions of LLM Engineering (Models, Tools, Techniques).
- Closed-Source Frontier Models vs Open-Source Models.
- Distillation mechanics (smaller models trained on synthetic data from larger models).
- 3 Flavors of Models: Base Models, Chat/Instruct Models, Reasoning/Thinking Models (budget forcing).
- Core advantages & disadvantages/blind spots of frontier LLMs.
Ensure headings start at `##`.

- [ ] **Step 2: Create `2_Transformer Architecture.md`**

Write content synthesizing `Week 1 Day 4`:

- Background: "Attention is All You Need" (Google 2017) and OpenAI GPT-1 (2018).
- LSTMs vs Transformers (parallelized training over sequences).
- Self-Attention Mechanism.
- Parameters (trainable weights and biases) and Scaling laws (inference-time vs training-time scaling).
Ensure headings start at `##`.

- [ ] **Step 3: Create `3_Tokens and Context Windows.md`**

Write content synthesizing `Week 1 Day 4` & `Week 3 Day 3`:

- Evolution: character $\to$ word $\to$ token.
- Token IDs, vocabulary mapping, and `tiktoken` code snippet.
- Statelessness of API calls: passing full conversation history, illusion of memory, electricity/token costs.
- Context Windows: definition, token boundaries, and API cost implications.
Ensure headings start at `##`.

- [ ] **Step 4: Lint check**

Run: `npm run lint`
Expected: 0 markdownlint issues and notes validation pass.

- [ ] **Step 5: Commit Module 01**

```bash
git add "docs/Concepts/Learn LLM/01_Foundations and Architecture"
git commit -m "feat(llm): add module 01 foundations and architecture notes"
```

---

### Task 3: Module 02 - APIs and Inference

**Files:**

- Create: `docs/Concepts/Learn LLM/02_APIs and Inference/1_Chat Completions and OpenAI Compatibility.md`
- Create: `docs/Concepts/Learn LLM/02_APIs and Inference/2_Local Inference with Ollama.md`
- Create: `docs/Concepts/Learn LLM/02_APIs and Inference/3_Frontier APIs and Optimization.md`

- [ ] **Step 1: Create `1_Chat Completions and OpenAI Compatibility.md`**

Write content synthesizing `Week 1 Day 2` & `Week 2 Day 1`:

- History & purpose of the Chat Completions API.
- Calling endpoints via raw HTTP (`requests` with headers, auth, and JSON payload).
- Official `openai` Python SDK wrapper.
- OpenAI-compatible endpoints standard adopted across vendors.
- Message structures: role definitions (`system`, `user`, `assistant`).
Ensure headings start at `##`.

- [ ] **Step 2: Create `2_Local Inference with Ollama.md`**

Write content synthesizing `Week 1 Day 1` & `Week 3 Day 1`:

- What is Ollama: pre-packaged local model execution runtime.
- Interfacing with local models using OpenAI client (`base_url='http://localhost:11434/v1', api_key='ollama'`).
- System prompt vs user prompt code example.
- Trade-offs: Pre-baked Ollama runtime vs low-level Python model libraries.
Ensure headings start at `##`.

- [ ] **Step 3: Create `3_Frontier APIs and Optimization.md`**

Write content synthesizing `Week 2 Day 1`:

- Model sizing vs reasoning demands (tiny models need explicit reasoning; large models resolve with minimal steps).
- High-speed inference: Groq LPUs.
- Unified routing layers: OpenRouter.
- Multi-provider abstraction layers: `LiteLLM` (cost and token tracking) and `LangChain`.
- Cloud Prompt Caching: OpenAI prefix caching, Anthropic explicit breakpoint caching, Gemini explicit and implicit caching.
Ensure headings start at `##`.

- [ ] **Step 4: Lint check**

Run: `npm run lint`
Expected: Pass.

- [ ] **Step 5: Commit Module 02**

```bash
git add "docs/Concepts/Learn LLM/02_APIs and Inference"
git commit -m "feat(llm): add module 02 apis and inference notes"
```

---

### Task 4: Module 03 - Prompting and Applications

**Files:**

- Create: `docs/Concepts/Learn LLM/03_Prompting and Applications/1_Prompt Engineering.md`
- Create: `docs/Concepts/Learn LLM/03_Prompting and Applications/2_Gradio UIs and Streaming.md`
- Create: `docs/Concepts/Learn LLM/03_Prompting and Applications/3_Conversational Chatbots.md`

- [ ] **Step 1: Create `1_Prompt Engineering.md`**

Write content synthesizing `Week 1 Day 1` & `Week 1 Day 5`:

- System prompt vs User prompt framing.
- Single-shot vs Multi-shot prompting with examples.
- Output formatting: Markdown and JSON schema enforcement.
- Product pattern: The "GPT Wrapper" commercial application.
Ensure headings start at `##`.

- [ ] **Step 2: Create `2_Gradio UIs and Streaming.md`**

Write content synthesizing `Week 2 Day 2`:

- Knowledge cutoffs in static LLMs.
- Introduction to the Gradio web UI framework.
- Core features: input/output components, sharing, authentication, theming.
- Streaming responses with Python generator functions (`yield`) and `stream=True`.
- Complete runnable Gradio `Interface` code block.
Ensure headings start at `##`.

- [ ] **Step 3: Create `3_Conversational Chatbots.md`**

Write content synthesizing `Week 2 Day 3`:

- State management with Gradio `ChatInterface`.
- Multi-turn conversation history passing.
- Dynamic system prompt modification based on user query keywords (lightweight context injection).
- Complete runnable Gradio `ChatInterface` code block.
Ensure headings start at `##`.

- [ ] **Step 4: Lint check**

Run: `npm run lint`
Expected: Pass.

- [ ] **Step 5: Commit Module 03**

```bash
git add "docs/Concepts/Learn LLM/03_Prompting and Applications"
git commit -m "feat(llm): add module 03 prompting and applications notes"
```

---

### Task 5: Module 04 - Tools and Agentic AI

**Files:**

- Create: `docs/Concepts/Learn LLM/04_Tools and Agentic AI/1_Tool Calling.md`
- Create: `docs/Concepts/Learn LLM/04_Tools and Agentic AI/2_Intro to Agents.md`

- [ ] **Step 1: Create `1_Tool Calling.md`**

Write content synthesizing `Week 2 Day 4`:

- Purpose of Tool Calling / Function Calling: external knowledge expansion & executing application actions.
- Theory vs Practice: models produce structured instructions, application executes code on model's behalf.
- Embedded visual diagrams (`![[image 1.png]]`, `![[image 2.png]]`).
- Tool calls as natural-language conditional logic (if-else loops).
- Foundational bridge to Agentic AI.
Ensure headings start at `##`.

- [ ] **Step 2: Create `2_Intro to Agents.md`**

Write content synthesizing `Week 2 Day 5`:

- Definition of an AI Agent: LLM orchestrating an execution loop to achieve a goal.
- 5 Core Pillars: Memory & Persistence, Planning Capabilities, Autonomy, LLM Orchestration, and Functionality via Tools.
- Under the hood implementation notes.
Ensure headings start at `##`.

- [ ] **Step 3: Lint check**

Run: `npm run lint`
Expected: Pass.

- [ ] **Step 4: Commit Module 04**

```bash
git add "docs/Concepts/Learn LLM/04_Tools and Agentic AI"
git commit -m "feat(llm): add module 04 tools and agentic ai notes"
```

---

### Task 6: Module 05 - Hugging Face Ecosystem

**Files:**

- Create: `docs/Concepts/Learn LLM/05_Hugging Face Ecosystem/1_Hugging Face Overview.md`
- Create: `docs/Concepts/Learn LLM/05_Hugging Face Ecosystem/2_Pipelines.md`
- Create: `docs/Concepts/Learn LLM/05_Hugging Face Ecosystem/3_Tokenizers Deep Dive.md`
- Create: `docs/Concepts/Learn LLM/05_Hugging Face Ecosystem/4_Model Quantization.md`

- [ ] **Step 1: Create `1_Hugging Face Overview.md`**

Write content synthesizing `Week 3 Day 1`:

- Hugging Face platform triad: Model Hub, Datasets, Spaces.
- Core libraries: `huggingface_hub`, `datasets`, `transformers`, `peft` (LoRA/QLoRA), `trl`, `accelerate`.
- Packaged Ollama runtimes vs code-level customization in HF.
Ensure headings start at `##`.

- [ ] **Step 2: Create `2_Pipelines.md`**

Write content synthesizing `Week 3 Day 2`:

- High-level Pipelines vs Low-level Tokenizer/Model APIs.
- Out-of-the-box inference tasks: Sentiment analysis, text classification, NER, QA, summarization, translation.
- Python code example utilizing `pipeline("sentiment-analysis", device="cuda")`.
Ensure headings start at `##`.

- [ ] **Step 3: Create `3_Tokenizers Deep Dive.md`**

Write content synthesizing `Week 3 Day 3`:

- What is a tokenizer: text $\leftrightarrow$ token tensor mapping.
- Vocabulary dictionaries and token index assignment.
- Special tokens (BOS, EOS, system/role delimiters).
- Model-specific tokenizers and why token counts vary across architectures.
Ensure headings start at `##`.

- [ ] **Step 4: Create `4_Model Quantization.md`**

Write content synthesizing `Week 3 Day 4`:

- Definition of Quantization: parameter precision reduction.
- Mechanism: FP32 $\to$ INT8 or INT4 weight and activation compression.
- Benefits: memory reduction and latency improvement.
- Challenges: accuracy loss in sensitive domains.
- Quantization-Aware Training (QAT).
Ensure headings start at `##`.

- [ ] **Step 5: Lint check**

Run: `npm run lint`
Expected: Pass.

- [ ] **Step 6: Commit Module 05**

```bash
git add "docs/Concepts/Learn LLM/05_Hugging Face Ecosystem"
git commit -m "feat(llm): add module 05 hugging face ecosystem notes"
```

---

### Task 7: Module 06 - RAG & Clean up old RAG folder

**Files:**

- Create: `docs/Concepts/Learn LLM/06_RAG/1_Intro to RAG.md`
- Remove: `docs/Concepts/Learn LLM/RAG/Intro.md` (and remove `RAG/` directory)

- [ ] **Step 1: Create `1_Intro to RAG.md`**

Write content synthesizing `RAG/Intro.md` and Week 2 Day 3 context:

- Definition: Retrieval-Augmented Generation.
- Core motivation: Solving training cutoff dates and hallucinations by injecting grounded external facts into context.
- End-to-end flow: User query $\to$ Retrieval from knowledge store $\to$ Dynamic prompt augmentation $\to$ LLM response generation.
Ensure headings start at `##`.

- [ ] **Step 2: Remove old `RAG/Intro.md`**

Run: `rm -rf "docs/Concepts/Learn LLM/RAG"`

- [ ] **Step 3: Lint check**

Run: `npm run lint`
Expected: Pass.

- [ ] **Step 4: Commit Module 06**

```bash
git add "docs/Concepts/Learn LLM/06_RAG" "docs/Concepts/Learn LLM/RAG"
git commit -m "feat(llm): add module 06 rag notes and retire legacy rag folder"
```

---

### Task 8: Master Index (`Learn LLM.md`) and Global Navigation

**Files:**

- Modify: `docs/Concepts/Learn LLM/Learn LLM.md`
- Modify: `docs/index.md` (update summary if needed)

- [ ] **Step 1: Update `docs/Concepts/Learn LLM/Learn LLM.md`**

Rewrite `Learn LLM.md` to feature:

- Hero image banner: `![[image.png]]`.
- Overview introduction.
- Structured curriculum tables/lists with wikilinks to all notes in modules 01 through 06.
- An archive section with links to the daily logs in `Archive/`.
- Ensure no H1s (start at `##`).

- [ ] **Step 2: Check `docs/index.md`**

Review line 36 of `docs/index.md`:
`- **[Learn LLM & AI](./Concepts/Learn%20LLM/)**: A 3-week course log covering Ollama, frontier model APIs, Gradio, tools, agentic AI, Hugging Face, tokenizers, transformers, and quantization.`
Update description to reflect the modular topic guide structure.

- [ ] **Step 3: Run full linting**

Run: `npm run lint`
Expected: 0 markdownlint issues, all notes valid.

- [ ] **Step 4: Commit master index**

```bash
git add "docs/Concepts/Learn LLM/Learn LLM.md" "docs/index.md"
git commit -m "feat(llm): update learn llm master index and docs overview"
```

---

### Task 9: Vault Link Audit & Final Verification

**Files:**

- Audit entire vault hyperlinks across all generated pages.

- [ ] **Step 1: Run link integrity audit**

Run: `npm run test:links`
Expected: 0 broken links (zero 404s).

- [ ] **Step 2: Verify git working tree is clean**

Run: `git status`
Expected: Working tree clean, everything committed.
