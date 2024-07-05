import clsx from "clsx";
import { ContentLayout } from "../../../components/layout";
import QuestionAnswerView from "../components/question-answer-view";
import QuestionCount from "../components/question-count";
import { type AnswerType, type QuestionType } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  saveAnswer,
  setLastAttemptDate,
} from "../../../store/quizProgress/quizProgressSlice";
import { type RootStateType } from "../../../store/rootStore";
import { useState } from "react";

type MockQuesType = {
  question: QuestionType;
  answer: AnswerType;
};

export const QuizPage = () => {
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(0);
  const quizProgress = useSelector(
    (state: RootStateType) => state.quizProgress.quizProgress
  );
  const lastAttemptDate = useSelector(
    (state: RootStateType) => state.quizProgress.lastAttemptDate
  );

  const onTileClick = (clickedQuestion: number) => {
    console.log("Clicked Tile: ", clickedQuestion);
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
        <QuestionCount
          currentQuestionNumber={selectedQuestionNumber + 1}
          answeredQuestions={[1, 2, 3]}
          questionCount={quizProgress.length}
          onTileClick={onTileClick}
        />
      </div>
    </ContentLayout>
  );
};
