---
notion-id: 2e7d9a38-fc71-80af-9fe3-d054b9825024
---
1. There are 3 Dimensions of LLM Engineering
    1. Models - Open Source, Closed Source, Multi-modal, Architecture, Selecting
    2. Tools - HuggingFace, LangChain, Gradio, Weights&Biases, Modal
    3. Technique - APIs, RAG, Fine tuning, Agentization.
2. Closed-Source Frontier Models
    4. These models are usually pay to use.
    5. OpenAI - GPT 
    6. Anthropic - Claude
        1. Haiku → Sonnet → Opus
    7. Google - Gemini
        2. Initially Bard
        3. But now on par with others using Gemini
    8. x - Grok
3. Open-Source Models
    9. These are free to use
    10. Weights are available
    11. But limited data available on training and so on.
    12. Meta - Llama
        4. First company to release open source model
    13. Mistral - Mixtral
        5. Made of many smaller specialized models 
    14. Alibaba Cloud - Qwen
    15. Google - Gemini
    16. Microsoft - Phi
    17. Deepseek AI - DeepSeek
        6. The training cost was very less for this model that is why it became famous.
    18. Smaller variants are made from Llama and Qwen. They trained these smaller qwen and llama on the synthetic data produced by bigger DeepSeek. This process is called `Distillation` 
    19. OpenAI - GPToss
4. Three ways to use  models
    20. Chat Interfaces 
        7. ChatGPT
    21. Cloud APIs 
        8. Frameworks like LangChain
        9. Managed AI Cloud Services
            1. Amazon Bedrock
            2. Google Vertex
            3. Azure ML
    22. Direct Inference
        10. With the HuggingFace Transformers Library
            4. Literally running the trained model with weights locally
        11. With Ollama to run locally
            5. The model and its weights are packaged very efficiently to run on the local machine.
5. Chat Completions API
    23. The simplest way to call an LLM
    24. It's called Chat Completions because it's saying: "here is a conversation, please predict what should come next"
    25. The Chat Completions API was invented by OpenAI, but it's so popular that everybody uses it!
6. The chat completions API can be called via response as it is just an endpoint -HTTP address that OpenAI exposes.
7. First the header and payload are populated where header would hold the api-key and header would hold the info like model and prompt.
8. Using response python module we can post this to the endpoint and get the response as json.

```python
import requests

headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}

payload = {
    "model": "gpt-5-nano",
    "messages": [
        {"role": "user", "content": "Tell me a fun fact"}]
}

response = requests.post(
    "https://api.openai.com/v1/chat/completions",
    headers=headers,
    json=payload
)

response.json()
```
9. To avoid all this drama to play with JSON and all; the openAI package is created as a wrapper that provides strongly typed methods.

```python
from openai import OpenAI
openai = OpenAI()

response = openai.chat.completions.create(model="gpt-5-nano", messages=[{"role": "user", "content": "Tell me a fun fact"}])

response.choices[0].message.content
```
10. As this method became popular, every model provider took up same approach and created “OpenAI Compatible Endpoints”.
11. So we can use the same OpenAI python client library to switch different company’s model by changing the http url.

```python
from openai import OpenAI
import requests
from IPython.display import Markdown, display


system_prompt = "You are helping a 4th grade student to learn algebra and show the content in markdown"
user_prompt = "Hey Llama! What is (a+b)^2"

messages = [
    {'role':'system', 'content':system_prompt},
    {'role':'user', 'content':user_prompt}
    ]

openai = OpenAI(base_url='http://localhost:11434/v1', api_key='ollama')
response = openai.chat.completions.create(model="llama3.2", messages=messages)
display(Markdown(response.choices[0].message.content))
```
