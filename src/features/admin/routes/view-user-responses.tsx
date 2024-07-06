import ViewUserResponseList from "../components/view-user-response-list";
import { ContentLayout } from "../../../components/layout";

export type ViewUserResponsesProps = {};

const ViewUserResponses = ({}: ViewUserResponsesProps) => {
  return (
    <ContentLayout title="User Responses">
      <div className="">
        <ViewUserResponseList />
      </div>
    </ContentLayout>
  );
};

export default ViewUserResponses;
