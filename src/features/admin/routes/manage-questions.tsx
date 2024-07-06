import { saveQuizByAdmin } from "../../general-user/api/local-storage-interactor-api";
import QuestionEditPanel from "../components/question-edit-panel";
import { useDispatch, useSelector } from "react-redux";
import { type RootStateType } from "../../../store/rootStore";
import { type AnswerType } from "../../../types";
import { ContentLayout } from "../../../components/layout";
import { addQuestion } from "../../../store/addQuestion/addQuestionSlice";
import { message } from "antd";
import { type QuestionStructureType } from "../../../store/addQuestion/addQuestionSlice";

export type ManageQuestionsProps = {};

const default_answer_structure: AnswerType = {
  options: [""],
  isMultichoice: false,
  weight: 1,
  optionNumber: -1,
};

const ManageQuestions = ({}: ManageQuestionsProps) => {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state: RootStateType) => state.addQuestion.questions
  );

  const quizValidation = (questions: QuestionStructureType[]): boolean => {
    for (const question of questions) {
      if (question.question.trim() === "") {
        return false;
      }
  
      if(question.answer.isMultichoice) {
        for (const option of question.answer.options) {
          if (option.trim() === "") {
            return false;
          }
        }
      }
    }
  
    return true;
  };

  const handleQuestionSave = () => {
    console.log("this should be saved: ", questions, quizValidation(questions));
    if (!quizValidation(questions)) {
      message.error("Please complete all of your questions and options.");
    } else {
      saveQuizByAdmin(questions);
      message.success("Saved Quiz");
    }
  };

  const onAddQuestionClick = () => {
    if (questions[questions.length - 1].question.trim().length > 0) {
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
        <div className="grid gap-4">
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
          <button
            onClick={handleQuestionSave}
            className="bg-green-500 px-4 py-2 rounded-lg flex gap-3 items-center justify-center hover:bg-green-600"
          >
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