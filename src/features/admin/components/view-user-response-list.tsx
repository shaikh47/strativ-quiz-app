import { type UserResponseType } from "../../general-user/api/local-storage-interactor-api";
import { Card } from "../../../components/elements/Card";
import Avatar from "antd/es/avatar/avatar";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { getUserResponses } from "../../general-user/api/local-storage-interactor-api";

export type ViewUserResponseListProps = {
};

const ViewUserResponseList = ({}: ViewUserResponseListProps) => {
  const navigate = useNavigate();
  const attemptedQuizzes: UserResponseType[] = getUserResponses();

  return (
    <div className="grid grid-cols-4 gap-4 sp:grid-cols-1">
      {attemptedQuizzes.map(
        (attemptedQuiz: UserResponseType, index: number) => {
          return (
            <Card
              className={clsx(
                "h-44 w-full cursor-pointer px-5 py-4 flex flex-col gap-6 border border-customBorder"
              )}
              key={index}
              onClick={() => {
                navigate(`/admin/view-user-responses/${index}`);
              }}
            >
              <div className={clsx("")}>
                <p className="text-xs font-medium opacity-70 text-sky-950">
                  Attempt time
                </p>
                <p className="text-sm font-medium">
                  {attemptedQuiz.attemptTime}
                </p>
              </div>

              <div className="flex gap-2">
                <Avatar style={{ verticalAlign: "middle" }} size="default">
                  {attemptedQuiz.userEmail.charAt(0).toUpperCase()}
                </Avatar>
                <p>{attemptedQuiz.userEmail}</p>
              </div>

              <div className="flex gap-4 mt-auto">
                <p className="text-xs ml-auto font-medium text-orange-600">
                  more info
                </p>
                <FaLongArrowAltRight color="#EC7440" />
              </div>
            </Card>
          );
        }
      )}
    </div>
  );
};

export default ViewUserResponseList;
