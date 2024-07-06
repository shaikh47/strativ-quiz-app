import { Route, Routes } from "react-router-dom";
import { QuizPage } from "./quiz-page";
import { QuizHistoryPage } from "./history-page";
import { EditPastQuizPage } from "./edit-past-quiz-page";

export const QuizPageRoutes = () => {
  return (
    <Routes>
      <Route path="/history" element={<QuizHistoryPage />} />
      <Route path="/history/:responseId" element={<EditPastQuizPage />} />
      <Route path="/attempt" element={<QuizPage />} />
    </Routes>
  );
};
