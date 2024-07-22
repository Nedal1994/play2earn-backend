#script.py file to test the functionality of the loaded credentials
import google.generativeai as genai
from load_creds import load_creds
from google.generativeai.types import HarmCategory, HarmBlockThreshold

creds = load_creds()

# Configure Generative AI with credentials
genai.configure(credentials=creds)

# Get the tuned model
tuned_model_name = "tunedModels/play2earn137242-qc6ljs30t811"
tuned_model = genai.get_tuned_model(tuned_model_name)

# Print the details of the tuned model
print(f"Tuned Model Name: {tuned_model.name}")
print(f"Description: {tuned_model.description}")
print(f"Temperature: {tuned_model.temperature}")
print(f"Top P: {tuned_model.top_p}")
print(f"Top K: {tuned_model.top_k}")

# Example of using the tuned model in a GenerativeModel instance
generation_config = {
    "temperature": 0.85,
    "top_p": 1,
    "top_k": 0,
    "max_output_tokens": 2048,
    "response_mime_type": "text/plain",
}

safety_settings = {
    HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
}

model = genai.GenerativeModel(
    model_name=tuned_model_name,
    generation_config=generation_config,
    safety_settings=safety_settings
)

def gemini_response(question):
    question = question.lower().strip()
    response = model.generate_content(question)
    if(response.candidates[0].finish_reason==3):
      response_bot = "Please refrain from asking irrelevant questions😊"
      return response_bot
    else:
      return response.text

while True:
    question = input("How can i help you? (type 'exit' to stop): ")
    if question.lower() == "exit":
        print("Exiting the chat.")
        break
    response = gemini_response(question)
    print("Bot response:", response)
