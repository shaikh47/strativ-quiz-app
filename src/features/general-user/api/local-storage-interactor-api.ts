import { type UserType } from "../../../domains/models/user";
import { type AnsweredStateType } from "../../../store/quizProgress/quizProgressSlice";
import { type QuestionStructureType } from "../../../store/addQuestion/addQuestionSlice";

export type UserResponseType = {
  userEmail: string;
  attemptTime: string;
  quiz: AnsweredStateType[];
};

const save_response_key = "app-key-userResponses";
const save_question_admin_key = "app-key-question";

// setters
export const saveUser = (user: UserType) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const saveQuizByAdmin = (quiz: QuestionStructureType[]) => {
  localStorage.setItem(save_question_admin_key, JSON.stringify(quiz));
};

export const saveUserResponse = (response: UserResponseType) => {
  const userResponses = JSON.parse(
    localStorage.getItem(save_response_key) || "[]"
  );
  userResponses.push(response);
  localStorage.setItem(save_response_key, JSON.stringify(userResponses));
};

export const updateUserResponse = (
  response: UserResponseType,
  entryIndex: number,
  updatedAnswer: {
    attemptedAnswer: string;
    optionNumber: number;
  }
) => {
  // Check if the entryIndex is valid
  if (entryIndex < 0 || entryIndex >= response.quiz.length) {
    throw new Error("Invalid entry index");
  }

  const quizEntry = response.quiz[entryIndex];

  let newAttemptedAnswer = quizEntry.answer.attemptedAnswers;

  if (quizEntry.answer.isMultichoice) {
    if (!newAttemptedAnswer.includes(updatedAnswer.attemptedAnswer)) {
      newAttemptedAnswer = [
        ...newAttemptedAnswer,
        updatedAnswer.attemptedAnswer,
      ];
    }
  } else {
    newAttemptedAnswer = [updatedAnswer.attemptedAnswer];
  }

  response.quiz[entryIndex] = {
    ...quizEntry,
    answer: {
      ...quizEntry.answer,
      isAnswered: true,
      attemptedAnswers: newAttemptedAnswer,
      optionNumber: updatedAnswer.optionNumber,
    },
  };

  return response;
};

// getters
export const getUsers = (): any => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const getQuiz = (): QuestionStructureType[] => {
  return JSON.parse(localStorage.getItem(save_question_admin_key) || "[]");
};

export const getUserResponses = (userEmail?: string): UserResponseType[] => {
  const responses: UserResponseType[] = JSON.parse(
    localStorage.getItem(save_response_key) || "[]"
  );

  if (userEmail) {
    return responses.filter((response) => response.userEmail === userEmail);
  }

  return responses;
};
