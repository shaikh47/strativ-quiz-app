import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuiz } from "../../features/general-user/api/local-storage-interactor-api";

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

const answerInitialState: AnsweredStateType[] = getQuiz().map((question) => {
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

const quizProgress = createSlice({
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

export const { setLastAttemptDate, saveAnswer } = quizProgress.actions;
export default quizProgress.reducer;
