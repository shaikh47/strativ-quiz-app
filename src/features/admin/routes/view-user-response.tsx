import clsx from "clsx";
import ViewUserResponseComponent from "../components/view-user-response";
import { ContentLayout } from "../../../components/layout";

export type ViewUserResponseProps = {};

const ViewUserResponses = ({}: ViewUserResponseProps) => {
  return (
    <ContentLayout title="User Responses">
      <div className="">
        <ViewUserResponseComponent />
      </div>
    </ContentLayout>
  );
};

export default ViewUserResponses;
