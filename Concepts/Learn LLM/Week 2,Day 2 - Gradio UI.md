---
notion-id: 323d9a38-fc71-8080-9269-e2b804e0a4e7
---
1. You cant ask what is today’s date to LLM, because its already trained and it is trained only on info that is until what it is trained up on.
2. This is known as Training Cutoff
3. Gradio UI is a web framework from Hugging Face which is simple and powerful framework to create UIs.
4. Gradio gives simple Input Output textboxes to create UI.
5. Gradio has
    1. share the ui capability
    2. authentication
    3. dark/light mode
6. Python function generators and yield keyword can be used along with stream=true with chat completions api to look like real chatbot.


```python
def stream_gpt(prompt):
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": prompt}
      ]
    stream = ollama.chat.completions.create(
        model='llama3.2',
        messages=messages,
        stream=True
    )
    result = ""
    for chunk in stream:
        result += chunk.choices[0].delta.content or ""
        yield result

message_input = gr.Textbox(label="Your message:", info="Enter a message for GPT-4.1-mini", lines=7)
message_output = gr.Markdown(label="Response:")

view = gr.Interface(
    fn=stream_gpt,
    title="GPT", 
    inputs=[message_input], 
    outputs=[message_output], 
    examples=[
        "Explain the Transformer architecture to a layperson",
        "Explain the Transformer architecture to an aspiring AI engineer",
        ], 
    flagging_mode="never"
    )
view.launch()
```
