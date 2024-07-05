import clsx from "clsx";
import { ContentLayout } from "../../../components/layout";
import QuestionAnswerView from "../components/question-answer-view";
import QuestionCount from "../components/question-count";
import { type AnswerType, type QuestionType } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  setLastAttemptDate,
} from "../../../store/quizProgress/quizProgressSlice";
import { type RootStateType } from "../../../store/rootStore";
import { useState } from "react";
import { saveState } from "../../../utils/browser-storage";
import { getCurrentDateTime } from "../../../utils/date";
import { saveUserResponse, type UserResponseType } from "../api/local-storage-interactor-api";

type MockQuesType = {
  question: QuestionType;
  answer: AnswerType;
};

export const QuizPage = () => {
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(0);
  const quizProgress = useSelector(
    (state: RootStateType) => state.quizProgress.quizProgress
  );
  const currentUser = useSelector(
    (state: RootStateType) => state.auth.user
  );

  const onTileClick = (clickedQuestion: number) => {
    setSelectedQuestionNumber(clickedQuestion - 1);
  };

  const handleNextClick = () => {
    if (selectedQuestionNumber < quizProgress.length - 1) {
      setSelectedQuestionNumber(selectedQuestionNumber + 1);
    }
  };

  const handlePreviousClick = () => {
    if (selectedQuestionNumber > 0) {
      setSelectedQuestionNumber(selectedQuestionNumber - 1);
    }
  };

  const handleQuizSubmit = () => {
    const userResponse: UserResponseType = {
      userEmail: currentUser?.email!,
      attemptTime: getCurrentDateTime(),
      quiz: quizProgress,
    };
    saveUserResponse(userResponse);
  }

  return (
    <ContentLayout title={"Take Quiz"}>
      <div
        className={clsx(
          "grid grid-cols-[2fr_1fr] gap-10 sp:grid-cols-1 h-full"
        )}
      >
        <QuestionAnswerView
          selectedQuestionNumber={selectedQuestionNumber}
          selectedQuestion={quizProgress[selectedQuestionNumber]}
          nextClick={handleNextClick}
          prevClick={handlePreviousClick}
        />
        <div className="flex flex-col gap-6">
          <QuestionCount
            currentQuestionNumber={selectedQuestionNumber + 1}
            answeredQuestions={[1, 2, 3]}
            questionCount={quizProgress.length}
            onTileClick={onTileClick}
          />
          <button className="rounded-md bg-sky-900 hover:bg-sky-800 w-full p-2 text-white" onClick={handleQuizSubmit}>Submit</button>
        </div>
      </div>
    </ContentLayout>
  );
};
