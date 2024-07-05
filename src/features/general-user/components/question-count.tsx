import clsx from "clsx";
import { useState } from "react";
import { FaFlag } from "react-icons/fa6";

export type QuestionCountProps = {
  currentQuestionNumber: number;
  answeredQuestions: number[];
  questionCount: number;
  onTileClick: (clickedQuestion: number) => void;
};

const QuestionCount = ({
  currentQuestionNumber,
  answeredQuestions,
  questionCount,
  onTileClick,
}: QuestionCountProps) => {
  const [markedQuestions, setMarkedQuestions] = useState([2]);
  const questionTiles = Array.from({ length: questionCount });

  const insertMarkedQuestion = (questionNumber: number) => {
    setMarkedQuestions((prevMarkedQuestions) => {
      if (!prevMarkedQuestions.includes(questionNumber)) {
        return [...prevMarkedQuestions, questionNumber];
      }
      return prevMarkedQuestions;
    });
  };

  const removeMarkedQuestion = (questionNumber: number) => {
    setMarkedQuestions((prevMarkedQuestions) => {
      return prevMarkedQuestions.filter((number) => number !== questionNumber);
    });
  };

  const handleMarkQuestionClick = () => {
    console.log("cliked");
    if (markedQuestions.includes(currentQuestionNumber)) {
      removeMarkedQuestion(currentQuestionNumber);
    } else {
      insertMarkedQuestion(currentQuestionNumber);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full shadow-2xl p-6 rounded-md">
      <p>Question {`${currentQuestionNumber}/${questionCount}`}</p>
      <div className="flex flex-wrap gap-3">
        {questionTiles.map((_, index) => {
          return (
            <div
              className={clsx(
                "w-10 h-10 p-2 outline outline-1 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer",
                markedQuestions.includes(index + 1) && "bg-indigo-300",
                answeredQuestions.includes(index + 1) && "bg-green-400"
              )}
              onClick={() => onTileClick(index + 1)}
              key={index}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      <span
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => handleMarkQuestionClick()}
      >
        <p className="font-medium">
          {markedQuestions.includes(currentQuestionNumber)
            ? "Unmark This Question"
            : "Mark This Question"}
        </p>
        <FaFlag />
      </span>
    </div>
  );
};

export default QuestionCount;
