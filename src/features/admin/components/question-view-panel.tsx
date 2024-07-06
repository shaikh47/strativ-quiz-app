import { Input } from "antd";
const { TextArea } = Input;
import { type AnsweredStateType } from "../../../store/quizProgress/quizProgressSlice";

export type QuestionViewPanelProps = {
  quiz: AnsweredStateType;
};

const QuestionViewPanel = ({ quiz }: QuestionViewPanelProps) => {
  return (
    <div className="border-2 rounded-xl p-4">
      <div className="grid gap-3">
        <div className="flex gap-4 items-center justify-center">
          <div className="w-full grid gap-2">
            <p className="text-sm">Question:</p>
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
