---
notion-id: 34cd9a38-fc71-80ca-993b-e388a07600d3
---
## What is Tokenizer?
1. A tokenizer is a code that maps between text and tokens that represents that text.
2. A tokenizer breaks the text into small chunks called tokens and each token has an ID, called token index. 
3. A dictionary is present that contains a vocab that can include special tokens to signal information to LLM, like start of prompt.
4. The neural networks are trained with these token IDs.
5. Different LLMs use different tokenizers based on their requirements and purpose on which LLM is used.
6. The no. of tokens should not matter, only the input to output quality only matters.

## Process of Tokenization
7. Every chunk is a token and this token has an ID.
8. Also there are special tokens to indicate info like start of system message and end of system msg etc.