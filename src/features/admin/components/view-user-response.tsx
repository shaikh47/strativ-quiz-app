import { useDispatch, useSelector } from "react-redux";
import { ContentLayout } from "../../../components/layout";
import { useNavigate, useParams } from "react-router-dom";
import { getUserResponses } from "../../general-user/api/local-storage-interactor-api";
import QuestionViewPanel from "./question-view-panel";
import { type AnsweredStateType } from "../../../store/quizProgress/quizProgressSlice";

export type ViewUserAttemptedResponseProps = {};

const ViewUserAttemptedResponse = ({}: ViewUserAttemptedResponseProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { responseId } = useParams<{ responseId: string }>();
  
  const questions = getUserResponses();

  return (
    <ContentLayout title="Manage Questions">
      <div className="grid gap-4">
        <div className="grid gap-4">
          {questions[parseInt(responseId!)].quiz.map((question: AnsweredStateType, index: number) => {
            return (
              <QuestionViewPanel
                key={index}
                quiz={question}
              />
            );
          })}
        </div>
      </div>
    </ContentLayout>
  );
};

export default ViewUserAttemptedResponse;
