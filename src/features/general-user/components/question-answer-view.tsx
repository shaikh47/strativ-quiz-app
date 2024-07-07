import DescriptiveAnswerPanel from "./descriptive-answer";
import MultichoiceAnswerPanel from "./multichoice-answer";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { type AnsweredStateType } from "../../../store/quizProgress/quizProgressSlice";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "../../../store/quizProgress/quizProgressSlice";
import { type RootStateType } from "../../../store/rootStore";
import { getQuiz } from "../api/local-storage-interactor-api";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";

const buttonStyle =
  "bg-[#5F6CE1] text-white px-4 py-2 rounded-lg flex gap-3 items-center justify-center hover:bg-[#5561CA]";

export type QuestionAnswerViewProps = {
  selectedQuestionNumber: number;
  selectedQuestion: AnsweredStateType;
  isPastQuiz: boolean;
  nextClick: () => void;
  prevClick: () => void;
};

const QuestionPanel = ({
  selectedQuestion,
  selectedQuestionNumber,
}: Omit<QuestionAnswerViewProps, "nextClick" | "prevClick" | "isPastQuiz">) => {
  return (
    <div className="p-5 border-customBorder border rounded-lg grid gap-4 bg-white">
      <p>{`Question ${selectedQuestionNumber + 1}`}</p>
      <b>{selectedQuestion.question}</b>
    </div>
  );
};

type AnswerPanelPropsType = {
  givenAnswer: any;
  selectedQuestionNumber: number;
};

const AnswerPanel = ({
  givenAnswer,
  selectedQuestionNumber,
}: AnswerPanelPropsType) => {
  const dispatch = useDispatch();
  const progress = useSelector(
    (store: RootStateType) => store.quizProgress.quizProgress
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const onOptionClick = (optionNumber: number, option: string) => {
    console.log(optionNumber, option, givenAnswer.answer.options);
    
    dispatch(
      saveAnswer({
        questionName: givenAnswer.question,
        attemptedAnswer: option,
        optionNumber: optionNumber,
        givenOptions: givenAnswer.answer.givenOptions || givenAnswer.answer.options,
        isMarked: false,
      })
    );
  };

  const onTypingEnd = (typedAnswer: string) => {
    dispatch(
      saveAnswer({
        questionName: givenAnswer.question,
        attemptedAnswer: typedAnswer,
        givenOptions: givenAnswer.answer.options,
        optionNumber: -1,
        isMarked: false,
      })
    );
  };

  return (
    <div className="h-full p-5 border-customBorder border rounded-lg bg-white">
      {progress[selectedQuestionNumber].answer.attemptedAnswers.length > 1 && (
        <>
          <div
            className="flex items-center justify-end text-sm cursor-pointer"
            onClick={showModal}
          >
            <p className="border-black border border-1 rounded-sm px-2">
              View Past Answer
            </p>
          </div>
          <Modal
            title="This is the past History of the users Attempted Answer for this Question: "
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleOk}
            onClose={handleOk}
          >
            {progress[selectedQuestionNumber].answer.attemptedAnswers.map(
              (pastanswer, index) => {
                return (
                  <div className="flex gap-1" key={index}>
                    <div>{`${index + 1}. `}</div>
                    <div className="font-medium">{pastanswer}</div>
                  </div>
                );
              }
            )}
          </Modal>
        </>
      )}

      <div className="grid gap-4 h-full min-h-64">
        {givenAnswer.answer.isMultichoice ? (
          <MultichoiceAnswerPanel
            options={givenAnswer.answer.givenOptions || givenAnswer.answer.options}
            onOptionClick={onOptionClick}
            selectedOption={
              progress[selectedQuestionNumber].answer.optionNumber
            }
          />
        ) : (
          <DescriptiveAnswerPanel
            value={
              progress[selectedQuestionNumber].answer.attemptedAnswers.slice(
                -1
              )[0]
            }
            onTypingEnd={onTypingEnd}
          />
        )}
      </div>
    </div>
  );
};

const QuestionAnswerView = ({
  isPastQuiz = false,
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
        givenAnswer={
          isPastQuiz ? selectedQuestion : getQuiz()[selectedQuestionNumber]
        }
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
