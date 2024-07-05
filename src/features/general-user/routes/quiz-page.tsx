import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { ContentLayout } from "../../../components/layout";
import QuestionAnswerView from "../components/question-answer-view";
import QuestionCount from "../components/question-count";
import { type AnswerType, type QuestionType } from "../../../types";

type MockQuesType = {
  question: QuestionType;
  answer: AnswerType;
}

const mockques: MockQuesType[] = [
  {
    question: "Which is the tallest mountain in the world?",
    answer: { answerType: "descriptive", answer: "", optionNumber: -1 },
  },
];

export const QuizPage = () => {
  const navigate = useNavigate();

  const onTileClick = (clickedQuestion: number) => {
    console.log("Clicked Tile: ", clickedQuestion);
  };

  return (
    <ContentLayout title={"Take Quiz"}>
      <div className="grid grid-cols-[2fr_1fr] gap-10 sp:grid-cols-1">
        <QuestionAnswerView
          question={mockques[0].question}
          questionNumber={0}
          answer={mockques[0].answer}
        />
        <QuestionCount
          currentQuestionNumber={4}
          answeredQuestions={[1, 2, 3]}
          questionCount={20}
          onTileClick={onTileClick}
        />
      </div>
    </ContentLayout>
  );
};
