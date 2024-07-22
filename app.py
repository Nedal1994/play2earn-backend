from flask import Flask, request, Response
import google.generativeai as genai
from load_creds import load_creds
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

creds = load_creds()

# Configure Generative AI with credentials
genai.configure(credentials=creds)

# Get the tuned model
tuned_model_name = "tunedModels/play2earnai157242-5h7utthhbjgr"
tuned_model = genai.get_tuned_model(tuned_model_name)

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

@app.route("/chat", methods=["POST"])
def chat():
    question = request.form.get("question", "")
    if not question:
        return Response("No question provided", status=400, mimetype='text/plain')

    question = question.lower().strip()
    response = model.generate_content(question)

    # Log the entire response to debug the structure
    logging.debug(f"Response object: {response}")

    try:
        candidate = response.candidates[0]
        response_bot = candidate.content.parts[0].text
    except Exception as e:
        logging.error(f"Error processing response: {e}")
        response_bot = "Sorry, there was an error processing your request. Please try again."

    return Response(response_bot, status=200, mimetype='text/plain')

if __name__ == "__main__":
    app.run(debug=True)
