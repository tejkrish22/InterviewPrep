---
notion-id: 2f2d9a38-fc71-80ae-a1d8-e09c8894cdba
---
1. Every Frontier model provides APIs similar to open AI.
2. For every Frontier model, we can use the same Open AI client python module to connect with them.
3. Tiny model needs more reasoning.
4. Large model may give right answer with minimal reasoning.
5. `Groq - Is a very fast vendor that runs open source models on edge devices.`
6. Routing - OpenRouter provides unified interface for many frontier models APIs.
7. Abstraction Layers - LangChain , LiteLLM; allows to switch between different models.
8. LiteLLM supports 
    1. `Amazon BedRock`
    2. LiteLLM supports monitoring no. of tokens and api costs.
9. Prompt Caching - The tokens which are repeatedly sent are cached in the cloud, if asked repeatedly then the cost would be less.
    3. Open AI - Prefix acts as cache
    4. `Anthropic - Tell specifically to what to cache`
    5. Gemini - Both support explicit and Implicit caching.
10. We can make two models talk with each other by maintaining  the list of messages and passing these messages every time. User, assistant. 