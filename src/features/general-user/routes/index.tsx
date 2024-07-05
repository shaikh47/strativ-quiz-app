import { Navigate, Route, Routes } from "react-router-dom";
import { QuizPage } from "./quiz-page";
import { QuizHistoryPage } from "./history-page";

export const QuizPageRoutes = () => {
  return (
    <Routes>
      <Route path="/history" element={<QuizHistoryPage />} />
      <Route path="/attempt" element={<QuizPage />} />
    </Routes>
  );
};

//   <Route path=':interviewTrainingId/report' element={<InterviewTrainingReport />} />
//   <Route path='/train' element={<InterviewTraining />} />
//   <Route path='*' element={<Navigate replace to='' />} />
