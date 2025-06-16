import { cn } from "../lib/utils.js";
import React, { useEffect, useState, useRef } from "react";
import AssistantPage from "./assistantPage.jsx";
import CandidateSection from "./candidateSection.jsx";
import VoiceConvertor from "../components/voiceToText.jsx";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";
import TextToVoice from "../components/textToVoice.jsx";

function InterviewPage() {
  const [spokenText, setSpokenText] = useState("");
  const [recordingStatus, setRecordingStatus] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [controls, setControls] = useState(null);
  const scrollRef = useRef(null);
  const {
    candidateAnswer,
    setCandidateAnswer,
    assistantContent,
    setAssistantContent,
    askedQuestions,
    setAskedQuestions,
    givenAnswers,
    setGivenAnswers
  } = useConversation();
  const [startInterview, setStartInterview] = useState(false);

  useEffect(() => {
    setSpokenText(transcript);
    setCandidateAnswer(transcript);
  }, [transcript]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [spokenText]);

  const handleBeginRecordingButton = () => {
    setRecordingStatus(false);
    controls?.startListening();
  }

  const handleSendRecording = async () => {
    setSpokenText("");
    setRecordingStatus(true);
    controls?.stopListening();
    controls?.resetTranscript();

    try {
      const role = "user";
      const topic = "Fullstack Web Development";
      const name = "Ishika"
      const previousQuestions = askedQuestions;
      const askedQuestion = assistantContent;
      const givenAnswer = candidateAnswer;
      console.log(previousQuestions);

      const {data} = await axios.post("http://localhost:8000/interview/generate-question",
        { role, topic, name, previousQuestions, askedQuestion, givenAnswer }
      );

      setAssistantContent(data.responseData);
      askedQuestions.push(data.question);
      setAskedQuestions(askedQuestions);
    } catch (err) {
      console.log(err);
    }

    setCandidateAnswer("");
  }

  const handleStartInterview = async () => {
    setStartInterview(true);
    try {
      const role = "user";
      const topic = "Fullstack Web Development";
      const name = "Ishika"
      const previousQuestions = askedQuestions;
      console.log(previousQuestions);
  
      const { data } = await axios.post("http://localhost:8000/interview/generate-question",
        { role, topic, name, previousQuestions}
      );
      setAssistantContent(data.responseData);
      askedQuestions.push(data.question);
      setAskedQuestions(askedQuestions);
    } catch (err) {
      console.log(err);
    }
  }

  const handleEndInterview = () => {
    setStartInterview(false);
    setAskedQuestions([]);
    setAssistantContent("");
  }

  return (
    <div className="relative flex h-[100vh] w-[100vw] items-center justify-center bg-white dark:bg-gray-950">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(209,213,219,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(209,213,219,0.3)_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,rgba(55,65,81,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(55,65,81,0.3)_1px,transparent_1px)]",
        )}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-gray-950"></div>
      <div className="h-[100%] w-[100%] min-h-[100vh] min-w-[100vw] z-20 flex justify-evenly items-center flex-col">
        <div className="h-[80%] w-[100%] flex flex-row justify-evenly">
          <AssistantPage />
          <CandidateSection />
          <TextToVoice />
        </div>

        <div className="w-[80%] mb-8 flex flex-col items-center space-y-4">
          <div className="w-full relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-75 transition duration-200"></div>
            <div className="relative w-full h-16 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
              <div className="h-full flex items-center">
                <p
                  ref={scrollRef}
                  className="text-gray-900 dark:text-gray-100 text-lg font-medium whitespace-nowrap overflow-x-auto scroll-smooth no-scrollbar"
                >
                  {spokenText || (
                    <span className="text-gray-500 dark:text-gray-400">
                      <span className="text-blue-600 dark:text-blue-400">Waiting...</span> Speak to see text appear
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            {
              recordingStatus ? <button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                onClick={() => {
                  handleBeginRecordingButton();
                }}
                disabled={
                  controls?.isListening
                }
              >
                Begin Recording
              </button> : <button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                onClick={() => {
                  handleSendRecording();
                }}
                disabled={
                  !controls?.isListening
                }
              >
                Send Recording
              </button>
            }

            {
              startInterview ? <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                onClick={handleEndInterview}
              >
                End Interview
              </button> : <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                onClick={handleStartInterview}
              >
                Start Interview
              </button>
            }



            <VoiceConvertor
              onTranscriptUpdate={setTranscript}
              onControlsReady={setControls}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage