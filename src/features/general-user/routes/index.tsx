import { Navigate, Route, Routes } from "react-router-dom";
import { QuizPage } from "./quiz-page";

export const QuizPageRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<QuizPage />} />
    </Routes>
  );
};

//   <Route path=':interviewTrainingId/report' element={<InterviewTrainingReport />} />
//   <Route path='/train' element={<InterviewTraining />} />
//   <Route path='*' element={<Navigate replace to='' />} />
