import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import mockQuizQuestions from "../mock-ques";
import { type AnswerType } from "../../types";
import { message } from "antd";

export type QuestionType = {
  question: string;
  answer: {
    options: string[];
    weight: number;
    optionNumber: number;
    isMultichoice: boolean;
  };
};

type QuizProgressState = {
  questions: QuestionType[];
  date: string;
};

const default_initial_question_structure: QuestionType = {
  question: "",
  answer: {
    options: [""],
    isMultichoice: false,
    weight: -1,
    optionNumber: -1,
  },
};

const initialState: QuizProgressState = {
  questions: [default_initial_question_structure],
  date: "",
};

const addQuestionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<QuestionType>) => {
      state.questions.push(action.payload);
    },
    editQuestion: (
      state,
      action: PayloadAction<{ index: number; updatedQuestion: QuestionType }>
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
