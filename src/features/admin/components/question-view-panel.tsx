import { useState } from "react";
import { Input } from "antd";
const { TextArea } = Input;
import { type AnsweredStateType } from "../../../store/quizProgress/quizProgressSlice";
import Modal from "antd/es/modal/Modal";

export type QuestionViewPanelProps = {
  quiz: AnsweredStateType;
};

const QuestionViewPanel = ({ quiz }: QuestionViewPanelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="border bg-white border-customBorder rounded-xl p-4">
      {quiz.answer.attemptedAnswers.length > 1 && (
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
            {quiz.answer.attemptedAnswers.map((pastanswer, index) => {
              return (
                <div className="flex gap-1" key={index}>
                  <div>{`${index + 1}. `}</div>
                  <div className="font-medium">{pastanswer}</div>
                </div>
              );
            })}
          </Modal>
        </>
      )}
      <div className="grid gap-3">
        <div className="flex gap-4 items-center justify-center">
          <div className="w-full grid gap-2">
            <p className="text-sm">Question: </p>
            <TextArea placeholder="Add Question" autoSize value={quiz.question}>
              {quiz.question}
            </TextArea>
          </div>
        </div>
        <p className="text-sm">Answer</p>
        <p>
          <TextArea
            placeholder="Add Option"
            autoSize
            value={quiz.answer.attemptedAnswers.slice(-1)[0]}
          />
        </p>
      </div>
    </div>
  );
};

export default QuestionViewPanel;
