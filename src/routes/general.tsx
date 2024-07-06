import { Spinner } from "../components/elements";
import { MainLayout } from "../components/layout";
import { Suspense } from "react";
import { Navigate, Outlet, type RouteObject } from "react-router-dom";
import { namedLazyImport } from "../utils/named-lazy-import";
import RedirectComponent from "./redirect";
import { useSelector } from "react-redux";
import { type RootStateType } from "../store/rootStore";

const { QuizPageRoutes } = namedLazyImport(
  async () => import("../features/general-user/routes/index"),
  "QuizPageRoutes"
);

const App = () => {
  const user = useSelector((store: RootStateType) => store.auth.user);
  const isAuthenticated = useSelector(
    (store: RootStateType) => store.auth.isAuthenticated
  );

  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="grid h-full w-full place-content-center place-items-center">
            <Spinner />
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <RedirectComponent user={user} isAuthenticated={isAuthenticated}/>
    </MainLayout>
  );
};

export const generalRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "take-quiz/*",
        element: <QuizPageRoutes />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
    errorElement: <div>Error</div>,
  },
];
