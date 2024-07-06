import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import ViewUserResponseList from "../components/view-user-response-list";
import { ContentLayout } from "../../../components/layout";

export type ViewUserResponsesProps = {};

const ViewUserResponses = ({}: ViewUserResponsesProps) => {
  const navigate = useNavigate();

  return (
    <ContentLayout title="User Responses">
      <div className="">
        <ViewUserResponseList />
      </div>
    </ContentLayout>
  );
};

export default ViewUserResponses;
