import { Navigate, useRoutes, type RouteObject } from "react-router-dom";
import { adminRoutes } from "./admin";
import { generalRoutes } from "./general";
import { AuthRoutes } from "../features/auth";
import { useSelector } from "react-redux";
import { type RootStateType } from "../store/rootStore";

export const AppRoutes = () => {
  const isAuthenticated = useSelector(
    (store: RootStateType) => store.auth.isAuthenticated
  );
  const authenticatedUser = useSelector(
    (store: RootStateType) => store.auth.user
  );

  const commonRoutes = [{ path: "/auth", element: <AuthRoutes /> }];
  let routes: RouteObject[] = [{ path: "*", element: <Navigate to="/auth" /> }];

  if (isAuthenticated && authenticatedUser?.role === "admin") {
    routes = adminRoutes;
  } else if (isAuthenticated && authenticatedUser?.role === "user") {
    routes = generalRoutes;
  }

  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
};
