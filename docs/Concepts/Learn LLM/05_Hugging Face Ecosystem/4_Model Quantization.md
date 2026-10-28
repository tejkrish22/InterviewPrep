## Model Quantization

**Quantization** is a model compression technique in machine learning that reduces the memory footprint and accelerates inference speed by converting model parameters (weights and activations) from high-precision numerical formats into lower-precision formats.

---

## Precision Formats

In standard deep learning training, weights are stored as floating-point numbers requiring 16 or 32 bits per parameter:

| Data Type | Bits per Weight | Memory for a 7B Parameter Model | Precision Level |
| :--- | :--- | :--- | :--- |
| **FP32 (Single Precision)** | 32 bits (4 bytes) | $\approx 28\text{ GB}$ | Maximum training precision; high memory overhead. |
| **FP16 / BF16 (Half Precision)** | 16 bits (2 bytes) | $\approx 14\text{ GB}$ | Standard modern training and inference baseline. |
| **INT8 (8-bit Integer)** | 8 bits (1 byte) | $\approx 7\text{ GB}$ | Minor accuracy loss; fits easily on consumer GPUs (RTX 3060/4060). |
| **INT4 (4-bit Integer)** | 4 bits (0.5 bytes) | $\approx 3.5\text{ GB}$ | Aggressive compression; runs locally on standard laptops and smartphones. |

---

## How Quantization Works

Quantization maps a continuous range of floating-point values into a discrete set of lower-precision integers:

$$X_{\text{quantized}} = \text{round}\left(\frac{X}{\text{scale}}\right) + \text{zero\_point}$$

During matrix multiplication at inference time, specialized tensor cores (or CPU SIMD instructions) perform integer arithmetic much faster than floating-point math, while saving memory bandwidth.

---

## Efficiency vs Accuracy Trade-offs

### The Practical "Free Lunch"

Empirical research demonstrates that neural networks exhibit substantial parameter redundancy. Compressing weights from 16-bit float down to 8-bit or 4-bit integers often results in negligible degradation in general benchmark accuracy, while reducing memory consumption by $50\%$ to $75\%$.

### Challenges and Vulnerabilities

- **Outlier Activations**: Certain layers develop large outlier values that suffer severe clipping or distortion when forced into small 4-bit ranges.
- **Precision-Critical Domains**: Highly fine-grained tasks—such as complex mathematical proofs, precise financial calculations, or medical imaging analysis—experience higher sensitivity to quantization noise.

---

## Post-Training Quantization (PTQ) vs QAT

1. **PTQ (Post-Training Quantization)**:
   - Applied *after* a model has finished pre-training (e.g., AWQ, GPTQ, GGUF).
   - Fast and requires minimal calibration data; the standard method used for running open-source models in Ollama and vLLM.
2. **QAT (Quantization-Aware Training)**:
   - The model is trained (or fine-tuned) with simulated quantization noise present during forward passes, allowing backpropagation to adjust weights specifically to tolerate low-precision rounding.
   - Preserves higher accuracy than PTQ, especially at extreme 2-bit and 3-bit quantization boundaries.
