## Two API Levels in Hugging Face

The `transformers` library organizes model interaction into two primary abstraction tiers:

1. **High-Level: Pipelines (`pipeline`)**:
   - Out-of-the-box convenience APIs that encapsulate data preprocessing (tokenization), model forward pass, and postprocessing (softmax, decoding) into a single callable object.
   - Ideal for rapid prototyping and standard inference tasks in 2 to 3 lines of code.
2. **Low-Level: Tokenizers and Models (`AutoTokenizer`, `AutoModel`)**:
   - Exposes raw tensors, logits, hidden states, and attention masks.
   - Provides granular control over generation parameters (beam search, temperature, top-p, custom stopping criteria).

---

## Out-of-the-Box Pipeline Tasks

The `pipeline` abstraction supports standard natural language processing, audio, and computer vision tasks:

| Task Identifier | Description | Example Input $\to$ Output |
| :--- | :--- | :--- |
| **`sentiment-analysis`** | Text classification into positive/negative sentiment. | `"I loved this course!"` $\to$ `POSITIVE (0.99)` |
| **`ner` (Named Entity Recognition)** | Extracts entities (people, locations, organizations). | `"Ed works at Google in Zurich"` $\to$ `[PER: Ed, ORG: Google, LOC: Zurich]` |
| **`question-answering`** | Extracts exact answers given a context paragraph. | Question + Context passage $\to$ Extracted span |
| **`summarization`** | Compresses long articles into concise abstracts. | 1,000-word text $\to$ 100-word summary |
| **`translation`** | Translates text across language pairs. | English $\to$ French / German / Spanish |
| **`text-generation`** | Autoregressive text completion. | Prompt $\to$ Continuous prose completion |

---

## Code Example: Sentiment Analysis Pipeline

```python
from transformers import pipeline

# Instantiate the pipeline (defaults to DistilBERT for sentiment analysis)
# Specify device: -1 for CPU, 0 or "cuda" for GPU, "mps" for Apple Silicon
sentiment_analyzer = pipeline("sentiment-analysis", device=-1)

sample_text = "I am super excited to be on the path to LLM mastery!"
result = sentiment_analyzer(sample_text)

print(result)
# Output: [{'label': 'POSITIVE', 'score': 0.9998}]
```

### Under the Hood of a Pipeline

When invoking `sentiment_analyzer(text)`, the pipeline executes three internal stages:

1. **Pre-processing**: Uses the model's associated tokenizer to convert the raw string into numerical input IDs and attention masks.
2. **Model Evaluation**: Feeds the tensor batches through the neural network on the specified device (`cuda`, `mps`, or `cpu`) to produce logits.
3. **Post-processing**: Applies Softmax to logits to compute probabilities, maps the highest probability index to human-readable labels (`POSITIVE`), and formats the final dictionary.
