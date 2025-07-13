import React, { useEffect } from "react";
import useConversation from "../stateManage/useConversation";

function TextToVoice({ onStart, onEnd }) {
  const { assistantContent } = useConversation();

  const speakText = async () => {
    if (!assistantContent.trim()) return;

    try {
      onStart?.();

      const response = await fetch("http://localhost:3000/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: assistantContent }),
      });

      if (!response.ok) throw new Error("Failed to fetch voice");

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        onEnd?.();
      };

      audio.play();
    } catch (err) {
      console.error("Voice playback error:", err.message);
      onEnd?.();
    }
  };

  useEffect(() => {
    speakText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistantContent]);

  return null;
}

export default TextToVoice;
