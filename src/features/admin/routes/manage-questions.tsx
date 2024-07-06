import { saveQuizByAdmin } from "../../general-user/api/local-storage-interactor-api";
import QuestionEditPanel from "../components/question-edit-panel";
import { useDispatch, useSelector } from "react-redux";
import { type RootStateType } from "../../../store/rootStore";
import { type AnswerType } from "../../../types";
import { ContentLayout } from "../../../components/layout";
import { addQuestion } from "../../../store/addQuestion/addQuestionSlice";
import { message } from "antd";

export type ManageQuestionsProps = {};

const default_answer_structure: AnswerType = {
  options: [""],
  isMultichoice: false,
  weight: -1,
  optionNumber: -1,
};

// dispatch(addQuestion({
//   question: "What is the capital of France?",
//   answer: {
//     options: ["Paris", "London", "Berlin", "Madrid"],
//     weight: 1,
//     optionNumber: 0,
//     isMultichoice: false,
//   },
// }));

const ManageQuestions = ({}: ManageQuestionsProps) => {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state: RootStateType) => state.addQuestion.questions
  );

  const onAddQuestionClick = () => {
    if (questions[questions.length-1].question.trim().length > 0) {
      dispatch(
        addQuestion({
          question: "",
          answer: default_answer_structure,
        })
      );
    } else {
      message.error("Add your previous question first");
    }
  };

  return (
    <ContentLayout title="Manage Questions">
      <div className="grid gap-4">
        <div>
          {questions.map((question, index) => {
            return (
              <QuestionEditPanel
                key={index}
                questionProp={question.question}
                answerProp={question.answer}
                questionIndex={index}
              />
            );
          })}
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-green-400 px-4 py-2 rounded-lg flex gap-3 items-center justify-center hover:bg-orange-400">
            Save Quiz Question
          </button>
          <button
            className="bg-orange-300 px-4 py-2 rounded-lg flex gap-3 items-center justify-center hover:bg-orange-400"
            onClick={() => onAddQuestionClick()}
          >
            Add Question
          </button>
        </div>
      </div>
    </ContentLayout>
  );
};

export default ManageQuestions;
