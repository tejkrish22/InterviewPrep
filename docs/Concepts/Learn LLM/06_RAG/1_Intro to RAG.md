## What is RAG (Retrieval-Augmented Generation)?

**Retrieval-Augmented Generation (RAG)** is an architecture that optimizes the output of a Large Language Model by referencing an authoritative, external knowledge base outside of its training data before generating a response.

---

## Why RAG Is Essential

Even the most capable foundation models suffer from three fundamental constraints:

1. **Static Training Cutoffs**: Once pre-training concludes, a model's internal weights contain no knowledge of newly published information, current events, or updated policies.
2. **Hallucination Risk**: When queried on obscure, private, or highly specific domain facts, models may fabricate answers with high confidence.
3. **Enterprise Privacy & Access Controls**: Corporate knowledge bases (confluence docs, customer CRM records, private codebases) cannot be exposed during public model pre-training.

RAG resolves these limitations without requiring costly model retraining or fine-tuning by injecting fresh, grounded facts directly into the prompt context at inference time.

---

## The End-to-End RAG Pipeline

```text
1. User Query: "What is our company's refund policy for damaged goods?"
         |
         v
+------------------+
|  Retriever Step  | ---> Queries Knowledge Base / Vector DB / Search Index
+------------------+
         |
         v (Relevant chunks retrieved)
Chunks: ["Policy §4: Damaged items are eligible for a 100% refund within 30 days."]
         |
         v
+------------------+
| Augmentation Step| ---> Assembles Augmented Prompt:
+------------------+      "Context: [Policy §4...] Question: [User Query]
                          Instruction: Answer strictly based on the context."
         |
         v
+------------------+
| Generation Step  | ---> LLM generates grounded answer citing Policy §4.
+------------------+
```

### The Three Phases of RAG

1. **Retrieval**: The system queries a document repository (using dense vector embeddings, BM25 keyword search, or hybrid search) to find the top-$k$ text snippets most relevant to the user query.
2. **Augmentation**: The retrieved text snippets are formatted and injected alongside the original query into the model's active context window.
3. **Generation**: The LLM reads the injected context and produces a synthesized, factual response, often including direct citations back to the source documents.
