from flask import Flask, request, send_file, jsonify, after_this_request
import asyncio
import edge_tts
from flask_cors import CORS
import uuid
import os
import tempfile

app = Flask(__name__)
CORS(app)

@app.route("/speak", methods=["POST"])
def speak():
    try:
        data = request.json
        user_text = data.get("text", "Hello, how can I help you?")
        voice = "en-US-JennyNeural"

        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio:
            file_path = temp_audio.name

        async def generate_audio():
            tts = edge_tts.Communicate(text=user_text, voice=voice)
            await tts.save(file_path)

        asyncio.run(generate_audio())

        @after_this_request
        def cleanup(response):
            try:
                os.remove(file_path)
                print(f"Deleted: {file_path}")
            except Exception as e:
                print("Cleanup error:", e)
            return response

        return send_file(file_path, mimetype="audio/mpeg")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=3000, debug=True)
