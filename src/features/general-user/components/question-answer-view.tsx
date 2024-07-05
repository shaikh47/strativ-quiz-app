import { type QuestionType, type AnswerType } from "../../../types";
import DescriptiveAnswerPanel from "./descriptive-answer";
import MultichoiceAnswerPanel from "./multichoice-answer";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { type AnsweredStateType } from "../../../store/quizProgress/quizProgressSlice";
import mockQuizQuestions from "../../../store/mock-ques";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "../../../store/quizProgress/quizProgressSlice";
import { type RootStateType } from "../../../store/rootStore";

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
  selectedQuestionNumber: number;
};

const AnswerPanel = ({
  studentAnswer,
  givenAnswer,
  selectedQuestionNumber,
}: AnswerPanelPropsType) => {
  const dispatch = useDispatch();
  const progress = useSelector(
    (store: RootStateType) => store.quizProgress.quizProgress
  );

  const onOptionClick = (optionNumber: number, option: string) => {
    dispatch(
      saveAnswer({
        questionName: givenAnswer.question,
        attemptedAnswer: option,
        optionNumber: optionNumber,
        isMarked: false,
      })
    );
  };

  const onTypingEnd = (typedAnswer: string) => {
    dispatch(
      saveAnswer({
        questionName: givenAnswer.question,
        attemptedAnswer: typedAnswer,
        optionNumber: -1,
        isMarked: false,
      })
    );
    console.log("on typing end", typedAnswer);
  };

  return (
    <div className="p-5 shadow-2xl grid gap-4 bg-orange-200 h-full min-h-64">
      {givenAnswer.answer.isMultichoice ? (
        <MultichoiceAnswerPanel
          options={givenAnswer.answer.options}
          onOptionClick={onOptionClick}
          selectedOption={progress[selectedQuestionNumber].answer.optionNumber}
        />
      ) : (
        <DescriptiveAnswerPanel
          value={progress[selectedQuestionNumber].answer.attemptedAnswer}
          onTypingEnd={onTypingEnd}
        />
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
        selectedQuestionNumber={selectedQuestionNumber}
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
