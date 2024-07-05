import { type UserType } from "../../../domains/models/user";
import { type AnsweredStateType } from "../../../store/quizProgress/quizProgressSlice";
import { getCurrentDateTime } from "../../../utils/date";

type Quiz = {
  id: string;
  title: string;
  questions: Question[];
  email: string;
  timestamp: string;
};

export type UserResponseType = {
  userEmail: string;
  attemptTime: string;
  quiz: AnsweredStateType[];
};

const save_response_key = "app-key-userResponses";

// setters
export const saveUser = (user: UserType) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const saveQuizByAdmin = (quiz: Quiz) => {
  // this is supposed to be saved by the admin
  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  quizzes.push(quiz);
  localStorage.setItem("quizzes", JSON.stringify(quizzes));
};

export const saveUserResponse = (response: UserResponseType) => {
  const userResponses = JSON.parse(
    localStorage.getItem(save_response_key) || "[]"
  );
  userResponses.push(response);
  localStorage.setItem(save_response_key, JSON.stringify(userResponses));
};

// getters
export const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const getQuizzes = (): Quiz[] => {
  return JSON.parse(localStorage.getItem("quizzes") || "[]");
};

export const getUserResponses = (userEmail: string): UserResponseType[] => {
  const responses: UserResponseType[] = JSON.parse(
    localStorage.getItem(save_response_key) || "[]"
  );
  return responses.filter((response) => response.userEmail === userEmail);
};



// next task is to create a page which will redirect user to a page where he can see 
// 1. all his attempted quizzes
// 2. a button to start new quiz 