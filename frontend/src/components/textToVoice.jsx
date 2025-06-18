import React, { useState, useEffect } from "react";
import useConversation from "../stateManage/useConversation";

function TextToVoice({onStart, onEnd}) {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const { assistantContent, setAssistantContent } = useConversation();

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      if (allVoices.length > 0) {
        const ziraVoice = allVoices.find((v) =>
          v.name.toLowerCase().includes("zira")
        );
        setSelectedVoice(ziraVoice || allVoices[0]);
      }
    };

    if (typeof window !== "undefined") {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }

    const stopSpeech = () => {
      window.speechSynthesis.cancel();
    };

    window.addEventListener("beforeunload", stopSpeech);
    return () => {
      stopSpeech();
      window.removeEventListener("beforeunload", stopSpeech);
    };
  }, []);

  const speakText = () => {
    if (!assistantContent.trim()) return;

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(assistantContent);
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.pitch = 1.3;
      utterance.rate = 1.2;
    
      utterance.onstart = () => {
        onStart?.();
      }

      utterance.onend = () => {
        onEnd?.();
      }

      window.speechSynthesis.cancel(); 
      window.speechSynthesis.speak(utterance);

    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  useEffect(() => {
    speakText();
  }, [assistantContent, setAssistantContent]);

  return null;
}

export default TextToVoice;
