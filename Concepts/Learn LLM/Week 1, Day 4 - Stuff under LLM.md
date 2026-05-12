---
notion-id: 2f1d9a38-fc71-806e-b937-ec8eeb5885ac
---
1. GPT - Generative Pre-trained Transformer.
2. The Transformer is first introduced by Google in 2017 in a paper called “Attention is All you need”. 
3. What they did was, they introduced new way of organizing several Deep Neural Networks and adding a new layer called - Self Attention Layer.
4. In 2018 Open AI adopted this and released GPT-1
5. Transformers optimized the amount of data that the model could train up on parallelly,
6. Before Transformer, LSTM - Long Short Term Memory is used and actually is better than Transformer. But the main problem was to train it as it takes lot of time.
7. But everything is you just give a sequence of data and this transformer predicts how could the sequence can continue. And these are output tokens.
8. Along the way - 
    1. Prompt Engineering
    2. Copilots
    3. Context Engineering - RAG
    4. Agentic AI -An LLM handles system, and could call another LLM. Also as LLM can call itself.
9. Everything boils down to take input sequence and predict output sequence.
10. The Parameters are the trainable weights and biases in the neural network, adjusted during training to model language patterns. 
11. Bigger the model, more the parameters and more time or energy to train the model.
12. Inference time scaling
13. Training time scaling
14. In early days, neural networks were trained at the characters level and predict the next character in this sequence. Then neural networks were trained off words. Then the token came where its some where middle between word and character. 
15. That is the input sequence is broken down into chunks called tokens. 
16. The very first input to LLM is token ID.
17. [OpenAI Platform](https://platform.openai.com/tokenizer) - Tokenizer
18. Local tokenizaton can be performed using tiktoken python package.

```python
import tiktoken

encoding = tiktoken.encoding_for_model("gpt-4.1-mini")
tokens = encoding.encode("Hi my name is Ed and I like banoffee pie")
for token_id in tokens:
    token_text = encoding.decode([token_id])
    print(f"{token_id} = {token_text}")
encoding.decode([326])
```
19. Every call to an LLM is stateless
20. We pass in the entire conversation so far in the input prompt, every time
21. This gives the illusion that the LLM has memory - it apparently keeps the context of the conversation
22. But this is a trick; it's a by-product of providing the entire conversation, every time
23. An LLM just predicts the most likely next tokens in the sequence; if that sequence contains "My name is Ed" and later "What's my name?" then it will predict.. Ed!
24. The ChatGPT product uses exactly this trick - every time you send a message, it's the entire conversation that gets passed in.
25. Does that mean we have to pay extra each time for all the conversation so far"
26. For sure it does. And that's what we WANT. We want the LLM to predict the next tokens in the sequence, looking back on the entire conversation. We want that compute to happen, so we need to pay the electricity bill for it!
27. Context Window - Max number of tokens that model can consider when generating the next token. In other words its maximum no. of tokens that llm can take in.
28. Includes the original input prompt, subsequent conversation, the latest input prompt and almost all the output prompt.
29. The context window governs how well the model can remember references, content and context.
30. Particularly important for multi-shot prompting where the prompt includes examples, or for long conversations.
31. Why Gemini is good, because it has larger context window.
32. API Costs - 
    1. For the input sequence / input tokens 
    2. Previous chat
    3. Thinking process 
    4. Output 
33. [vellum.ai](http://vellum.ai/) - Context Windows and API Costs.

