import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuiz } from "../../features/general-user/api/local-storage-interactor-api";

export type AnsweredStateType = {
  question: string;
  answer: {
    isAnswered: boolean;
    attemptedAnswers: string[];
    optionNumber: number;
    givenOptions: string[],
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
      attemptedAnswers: [""],
      givenOptions: question.answer.options,
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
    loadProgressState(state, action: PayloadAction<AnsweredStateType[]>) {
      state.quizProgress = action.payload;
    },
    clearProgressState(state) {
      state.quizProgress = answerInitialState;
    },
    saveAnswer(
      state,
      action: PayloadAction<{
        questionName: string;
        attemptedAnswer: string;
        optionNumber: number;
        givenOptions: string[];
        isMarked: boolean;
      }>
    ) {
      const { questionName, attemptedAnswer, optionNumber, givenOptions } =
        action.payload;
      const questionIndex = state.quizProgress.findIndex(
        (q) => q.question === questionName
      );
      if (questionIndex !== -1) {
        state.quizProgress[questionIndex].answer = {
          isAnswered: true,
          attemptedAnswers: [attemptedAnswer],
          givenOptions: givenOptions,
          optionNumber: optionNumber,
          isMultichoice: state.quizProgress[questionIndex].answer.isMultichoice,
        };
      }
    },
  },
});

export const { setLastAttemptDate, saveAnswer, loadProgressState, clearProgressState } = quizProgress.actions;
export default quizProgress.reducer;
