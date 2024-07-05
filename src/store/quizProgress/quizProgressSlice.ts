import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockQuizQuestions from "../mock-ques";

export type AnsweredStateType = {
  question: string;
  answer: {
    isAnswered: boolean;
    attemptedAnswer: string;
    optionNumber: number;
    isMultichoice: boolean;
  };
};

type QuizProgressState = {
  quizProgress: AnsweredStateType[];
  lastAttemptDate: string;
};

const answerInitialState: AnsweredStateType[] = mockQuizQuestions.map((question) => {
  return {
    question: question.question,
    answer: {
      isAnswered: false,
      attemptedAnswer: "",
      optionNumber: -1,
      isMultichoice: false,
    },
  };
});

const initialState: QuizProgressState = {
  quizProgress: answerInitialState,
  lastAttemptDate: "",
};

const authSlice = createSlice({
  name: "quizprogress",
  initialState,
  reducers: {
    setLastAttemptDate(state, action: PayloadAction<string>) {
      state.lastAttemptDate = action.payload;
    },
    saveAnswer(
      state,
      action: PayloadAction<{
        questionName: string;
        attemptedAnswer: string;
        optionNumber: number;
        isMarked: boolean;
      }>
    ) {
      const { questionName, attemptedAnswer, optionNumber } =
        action.payload;
      const questionIndex = state.quizProgress.findIndex(
        (q) => q.question === questionName
      );
      if (questionIndex !== -1) {
        state.quizProgress[questionIndex].answer = {
          isAnswered: true,
          attemptedAnswer: attemptedAnswer,
          optionNumber: optionNumber,
          isMultichoice: state.quizProgress[questionIndex].answer.isMultichoice,
        };
      }
    },
  },
});

export const { setLastAttemptDate, saveAnswer } = authSlice.actions;
export default authSlice.reducer;
