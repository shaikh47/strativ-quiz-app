import { Route, Routes } from "react-router-dom";
import ManageQuestions from "./manage-questions";
import ViewUserResponses from "./view-user-responses";
import ViewUserAttemptedResponse from "../components/view-user-response";

export const AdminPageRoutes = () => {
  return (
    <Routes>
      <Route path="/manage-question" element={<ManageQuestions />} />
      <Route path="/view-user-responses" element={<ViewUserResponses />} />
      <Route path="/view-user-responses/:responseId" element={<ViewUserAttemptedResponse />} />
    </Routes>
  );
};
