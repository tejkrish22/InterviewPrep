---
notion-id: 34cd9a38-fc71-8036-baaa-e10ac885cb93
---
## Two API Levels of Hugging Face
1. Pipelines - High Level APIs to carry out standard task incredibly quickly.
2. Tokenizers and models - Lower Level APIs to provide the most power and control.

## Pipelines
3. Pipelines are for simple out-of-box inference tasks in very few lines of code.
4. Inferences can range across
    1. Sentimental Analysis
    2. Classifier
    3. Named Entity Recognition
    4. Question Answering
    5. Summarizing
    6. Translation
    7. [https://huggingface.co/docs/transformers/main_classes/pipelines#transformers.pipeline.task](https://huggingface.co/docs/transformers/main_classes/pipelines#transformers.pipeline.task)

```c++
# Sentiment Analysis

my_simple_sentiment_analyzer = pipeline("sentiment-analysis", device="cuda")
result = my_simple_sentiment_analyzer("I'm super excited to be on the way to LLM mastery!")
print(result)
```
