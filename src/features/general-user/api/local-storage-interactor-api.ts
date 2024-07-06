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
  newResp: UserResponseType,
  responseIndex: number
) => {
  const userResponses = JSON.parse(
    localStorage.getItem(save_response_key) || "[]"
  );

  const prevResp: UserResponseType = userResponses[responseIndex];
  const newPayload: UserResponseType = JSON.parse(JSON.stringify(prevResp));

  for (let i = 0; i < prevResp.quiz.length; i++) {
    // Check the last element of attempted answer for both previous and new response
    const prevLastAnswer =
      prevResp.quiz[i].answer.attemptedAnswers.slice(-1)[0];
    const newLastAnswer = newResp.quiz[i].answer.attemptedAnswers.slice(-1)[0];

    if (prevLastAnswer !== newLastAnswer) {
      const optionIndex =
        newPayload.quiz[i].answer.givenOptions.indexOf(newLastAnswer) + 1;

      newPayload.quiz[i].answer.optionNumber = optionIndex;
      newPayload.quiz[i].answer.isAnswered = true;
      newPayload.quiz[i].answer.attemptedAnswers.push(newLastAnswer);
    }
  }

  console.log("this is the updated payload: ", newPayload);
  userResponses[responseIndex] = newPayload;
  localStorage.setItem(save_response_key, JSON.stringify(userResponses));
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
