import clsx from "clsx";
import { ContentLayout } from "../../../components/layout";
import QuestionAnswerView from "../components/question-answer-view";
import QuestionCount from "../components/question-count";
import { useSelector } from "react-redux";
import { type RootStateType } from "../../../store/rootStore";
import { useState } from "react";
import { getCurrentDateTime } from "../../../utils/date";
import {
  saveUserResponse,
  type UserResponseType,
} from "../api/local-storage-interactor-api";
import { useNavigate, useParams } from "react-router-dom";
import { getUserResponses } from "../api/local-storage-interactor-api";

export const EditPastQuizPage = () => {
  const navigate = useNavigate();
  const { responseId } = useParams<{ responseId: string }>();
  const attemptedResponse: UserResponseType =
    getUserResponses()[parseInt(responseId!)];

  console.log("attempted respo: ", attemptedResponse.quiz);

  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(0);
  const currentUser = useSelector((state: RootStateType) => state.auth.user);

  const onTileClick = (clickedQuestion: number) => {
    setSelectedQuestionNumber(clickedQuestion - 1);
  };

  const handleNextClick = () => {
    if (selectedQuestionNumber < attemptedResponse.quiz.length - 1) {
      setSelectedQuestionNumber(selectedQuestionNumber + 1);
    }
  };

  const handlePreviousClick = () => {
    if (selectedQuestionNumber > 0) {
      setSelectedQuestionNumber(selectedQuestionNumber - 1);
    }
  };

  const handleQuizUpdate = () => {
    const userResponse: UserResponseType = {
      userEmail: currentUser?.email!,
      attemptTime: getCurrentDateTime(),
      quiz: attemptedResponse.quiz,
    };
    // saveUserResponse(userResponse);
    navigate("/take-quiz/history");
  };

  const getAnsweredQuestions = (): number[] => {
    return attemptedResponse.quiz
      .map((item, index) => (item.answer.isAnswered ? index + 1 : null))
      .filter((index) => index !== null);
  };

  return (
    <ContentLayout title={"Take Quiz"}>
      <div
        className={clsx(
          "grid grid-cols-[2fr_1fr] gap-10 sp:grid-cols-1 h-full"
        )}
      >
        <QuestionAnswerView
          isPastQuiz={false}
          selectedQuestionNumber={selectedQuestionNumber}
          selectedQuestion={attemptedResponse.quiz[selectedQuestionNumber]}
          nextClick={handleNextClick}
          prevClick={handlePreviousClick}
        />
        <div className="flex flex-col gap-6">
          <QuestionCount
            currentQuestionNumber={selectedQuestionNumber + 1}
            answeredQuestions={getAnsweredQuestions()}
            questionCount={attemptedResponse.quiz.length}
            onTileClick={onTileClick}
          />
          <button
            className="rounded-md bg-sky-900 hover:bg-sky-800 w-full p-2 text-white"
            onClick={handleQuizUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </ContentLayout>
  );
};