---
notion-id: 2e7d9a38-fc71-8061-998c-ea5718119937
---
1. Ollama is a repo of trained models which we can download to local and run the model.
2. We can use OpenAI python module to connect to the locally run module and chat with it.
3. System Prompt: Defines the behavior of the model
4. User Prompt: Query or Question

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
