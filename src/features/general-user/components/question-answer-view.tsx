import { type QuestionType, type AnswerType } from "../../../types";
import DescriptiveAnswerPanel from "./descriptive-answer";
import MultichoiceAnswerPanel from "./multichoice-answer";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { type AnsweredStateType } from "../../../store/quizProgress/quizProgressSlice";
import mockQuizQuestions from "../../../store/mock-ques";

const buttonStyle =
  "bg-orange-300 px-4 py-2 rounded-lg flex gap-3 items-center justify-center hover:bg-orange-400";

export type QuestionAnswerViewProps = {
  selectedQuestionNumber: number;
  selectedQuestion: AnsweredStateType;
  nextClick: () => void;
  prevClick: () => void;
};

const QuestionPanel = ({
  selectedQuestion,
  selectedQuestionNumber,
}: Omit<QuestionAnswerViewProps, "nextClick" | "prevClick">) => {
  return (
    <div className="p-5 shadow-2xl grid gap-4">
      <p>{`Question ${selectedQuestionNumber + 1}`}</p>
      <b>{selectedQuestion.question}</b>
    </div>
  );
};

type AnswerPanelPropsType = {
  studentAnswer: any;
  givenAnswer: any;
};

const AnswerPanel = ({ studentAnswer, givenAnswer }: AnswerPanelPropsType) => {
  console.log("this shit: ", studentAnswer);
  return (
    <div className="p-5 shadow-2xl grid gap-4 bg-orange-200 h-full min-h-64">
      {givenAnswer.answer.isMultichoice ? (
        <MultichoiceAnswerPanel options={givenAnswer.answer.options} />
      ) : (
        <DescriptiveAnswerPanel />
      )}
    </div>
  );
};

const QuestionAnswerView = ({
  selectedQuestion,
  selectedQuestionNumber,
  nextClick,
  prevClick,
}: QuestionAnswerViewProps) => {
  return (
    <div className="flex flex-col gap-4">
      <QuestionPanel
        selectedQuestion={selectedQuestion}
        selectedQuestionNumber={selectedQuestionNumber}
      />
      <AnswerPanel
        studentAnswer={selectedQuestion.answer}
        givenAnswer={mockQuizQuestions[selectedQuestionNumber]}
      />

      <div className="pb-10 flex gap-10 justify-center">
        <button className={buttonStyle} onClick={prevClick}>
          <FaChevronLeft /> Previous Question
        </button>
        <button className={buttonStyle} onClick={nextClick}>
          Next Question <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default QuestionAnswerView;
