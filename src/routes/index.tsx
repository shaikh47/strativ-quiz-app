import { useRoutes, type RouteObject } from "react-router-dom";
import { adminRoutes } from "./admin";
import { generalRoutes } from "./general";
import { LandingPage } from "../features/landing/routes/landing";
import { AuthRoutes } from "../features/auth";

export const AppRoutes = () => {
  const role = "admin";
  const commonRoutes = [{ path: '/', element: <LandingPage /> }, { path: '/Auth', element: <AuthRoutes /> }];

  let routes: RouteObject[] = [{ path: "*", element: <></> }];
  if (role === "admin") {
    routes = adminRoutes;
  } else if (role === "general") {
    routes = generalRoutes;
  }

  const element = useRoutes([...routes, ...commonRoutes]);

  return element;

  // TODO: Modify using createBrowserRouter
  // const router = createBrowserRouter([...routes, ...commonRoutes]);
  // return <RouterProvider router={router} />;
};
