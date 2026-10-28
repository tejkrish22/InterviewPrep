## The Transformer Paradigm

Modern Large Language Models originate from the Transformer architecture introduced by Google researchers in 2017 in the landmark paper *"Attention Is All You Need"*. In 2018, OpenAI adopted this architecture to train GPT-1 (Generative Pre-trained Transformer), establishing the blueprint for the current generative AI revolution.

---

## Why Transformers Replaced LSTMs

Prior to Transformers, sequential natural language tasks relied on Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) networks:

```text
RNN / LSTM (Sequential Processing):
Token 1 ---> Hidden State 1 ---> Token 2 ---> Hidden State 2 ---> Token 3 ...
(Cannot parallelize across sequence length; bottlenecked by sequential dependencies)

Transformer (Parallel Processing):
[ Token 1, Token 2, Token 3, Token 4 ]
        |       |       |       |
  =======================================
       Multi-Head Self-Attention
  =======================================
(Every token attends to all other tokens simultaneously; fully parallelizable on GPUs)
```

| Feature | RNNs / LSTMs | Transformers |
| :--- | :--- | :--- |
| **Data Processing** | Sequential token-by-token. | Entire token sequence processed simultaneously. |
| **GPU Parallelization** | Poor; step $t$ strictly requires step $t-1$. | Massive; matrix operations compute across all tokens in parallel. |
| **Long-Distance Context** | Vanishing/exploding gradient; forgets early context. | Direct pairwise self-attention paths between any two tokens. |
| **Training Scalability** | Hits compute ceilings rapidly. | Scales reliably with compute, parameters, and dataset size. |

---

## The Self-Attention Mechanism

The breakthrough component of the Transformer is the **Self-Attention Layer**:

1. **Query, Key, Value Projections**: Every token in the input embedding is projected into three distinct vectors:
   - **Query ($Q$)**: What the current token is looking for.
   - **Key ($K$)**: What the current token advertises or offers.
   - **Value ($V$)**: The actual content or information payload.
2. **Attention Weight Calculation**: The similarity between Query $Q$ of token $i$ and Key $K$ of token $j$ determines the attention weight (importance of token $j$ to token $i$).
3. **Contextual Encoding**: The output representation for token $i$ is a weighted sum of the Value vectors $V$ of all tokens in the sequence.

Through multi-head attention, different attention heads learn to track syntactic structure, grammatical agreement, semantic relationships, and factual references simultaneously.

---

## Parameters and Scaling

### What Are Parameters?

Parameters are the trainable **weights and biases** across all neural network layers (attention matrices, feed-forward layers, layer normalization).

- During training, these parameters are iteratively updated via backpropagation to minimize next-token prediction loss.
- Larger parameter counts (e.g., 7B, 70B, 405B) enable the model to memorize more factual associations and represent nuanced grammatical and reasoning patterns.

### Two Frontiers of Scaling

1. **Training-Time Scaling (Pre-training Laws)**:
   - Increasing the number of parameters ($N$), dataset token count ($D$), and total FLOPs ($C$) yields predictable power-law decreases in loss (Chinchilla scaling laws).
   - Once trained, the base model capabilities are fixed.

2. **Inference-Time Scaling (Test-Time Compute)**:
   - Rather than only scaling the model size during training, modern reasoning models (e.g., OpenAI o1/o3, DeepSeek-R1) scale compute *during inference*.
   - By allocating additional tokens to explore multiple solution paths, self-correct, and deliberate before generating the final answer, a smaller model with test-time compute can surpass a much larger model that responds greedily.
