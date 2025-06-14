import {create} from 'zustand'

const useConversation = create((set) => ({
  candidateAnswer: "",
  setCandidateAnswer: (candidateAnswer) => set({candidateAnswer}),

  assistantContent: "",
  setAssistantContent: (assistantContent) => set({assistantContent}),

  askedQuestions: [],
  setAskedQuestions: (askedQuestions) => set({askedQuestions}),

  givenAnswers: [],
  setGivenAnswers: (givenAnswers) => set({givenAnswers}),
}));

export default useConversation;

























