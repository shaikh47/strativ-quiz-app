import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import mockQuizQuestions from "../mock-ques";
import { type AnswerType } from "../../types";
import { message } from "antd";
import { getQuiz } from "../../features/general-user/api/local-storage-interactor-api";

export type QuestionStructureType = {
  question: string;
  answer: {
    options: string[];
    weight: number;
    optionNumber: number;
    isMultichoice: boolean;
  };
};

type QuizProgressState = {
  questions: QuestionStructureType[];
  date: string;
};

const default_initial_question_structure: QuestionStructureType = {
  question: "",
  answer: {
    options: [""],
    isMultichoice: false,
    weight: 1,
    optionNumber: -1,
  },
};

const initialState: QuizProgressState = {
  questions:
    getQuiz().length === 0 ? [default_initial_question_structure] : getQuiz(),
  date: "",
};

const addQuestionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<QuestionStructureType>) => {
      state.questions.push(action.payload);
    },
    editQuestion: (
      state,
      action: PayloadAction<{
        index: number;
        updatedQuestion: QuestionStructureType;
      }>
    ) => {
      const { index, updatedQuestion } = action.payload;
      if (state.questions[index]) {
        state.questions[index] = updatedQuestion;
      }
    },
    removeQuestion: (state, action: PayloadAction<number>) => {
      if (state.questions.length <= 1)
        message.info("Atleast 1 question should be there.");
      else state.questions.splice(action.payload, 1);
    },
    updateDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
});

export const { addQuestion, editQuestion, removeQuestion, updateDate } =
  addQuestionSlice.actions;
export default addQuestionSlice.reducer;
