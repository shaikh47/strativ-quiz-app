import clsx from "clsx";
import { ContentLayout } from "../../../components/layout";
import { useNavigate } from "react-router-dom";

import {
  getUserResponses,
  type UserResponseType,
} from "../api/local-storage-interactor-api";
import AttemptedQuizViewCards from "../components/attempted-quiz-view-cards";

export const QuizHistoryPage = () => {
  const navigate = useNavigate();
  const attempted_quizzes: UserResponseType[] = getUserResponses();

  return (
    <ContentLayout title={"Taken Quizzes"}>
      <div className={clsx("grid gap-10")}>
        <button
          className="bg-[#5F6CE1] hover:bg-[#4e5cdb] text-white font-medium py-2 px-10 rounded-md justify-self-center"
          onClick={() => {
            navigate("/take-quiz/attempt");
          }}
        >
          Attempt Quiz
        </button>
        <AttemptedQuizViewCards attemptedQuizzes={attempted_quizzes} />
      </div>
    </ContentLayout>
  );
};
