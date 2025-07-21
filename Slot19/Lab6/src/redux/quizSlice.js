import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Madrid"],
      correctAnswer: "Paris",
      selectedAnswer: null
    },
    {
      id: 2,
      question: "2 + 2 equals?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
      selectedAnswer: null
    }
  ],
  isChecked: false
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    selectAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        question.selectedAnswer = answer;
      }
    },
    checkAnswers: (state) => {
      state.isChecked = true;
    },
    resetQuiz: (state) => {
      state.questions.forEach(q => q.selectedAnswer = null);
      state.isChecked = false;
    }
  }
});

export const { selectAnswer, checkAnswers, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
