import { type QuestionType, type AnswerType } from "../../../types";
import DescriptiveAnswerPanel from "./descriptive-answer";
import MultichoiceAnswerPanel from "./multichoice-answer";

export type QuestionAnswerViewProps = {
  question: QuestionType;
  questionNumber: number;
  answer: AnswerType;
};

const QuestionPanel = ({
  question,
  questionNumber,
}: Omit<QuestionAnswerViewProps, "answer">) => {
  return (
    <div className="p-5 shadow-xl grid gap-4">
      <p>{`Question ${questionNumber + 1}`}</p>
      <b>{question}</b>
    </div>
  );
};

const AnswerPanel = ({ answerType, answer }: AnswerType) => {
  return (
    <div className="p-5 shadow-xl grid gap-4">
      {answerType === "descriptive" ? (
        <DescriptiveAnswerPanel />
      ) : (
        <MultichoiceAnswerPanel />
      )}
    </div>
  );
};

const QuestionAnswerView = ({
  question,
  questionNumber,
  answer,
}: QuestionAnswerViewProps) => {
  return (
    <div className="flex flex-col gap-4">
      <QuestionPanel question={question} questionNumber={questionNumber} />
      <AnswerPanel answer={answer.answer} answerType={answer.answerType} />
    </div>
  );
};

export default QuestionAnswerView;
