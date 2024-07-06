import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { type User } from "../types/auth";

type RedirectComponentProps = {
  user: User | null;
  isAuthenticated: boolean;
};

const RedirectComponent = ({
  user,
  isAuthenticated,
}: RedirectComponentProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user === null) {
      return;
    } else if (
      isAuthenticated &&
      user.role === "user" &&
      location.pathname === "/"
    ) {
      navigate("/take-quiz/history");
    }
  }, [user, navigate]);

  return null;
};

export default RedirectComponent;
