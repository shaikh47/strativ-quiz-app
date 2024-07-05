import { Spinner } from "../components/elements";
import { MainLayout } from "../components/layout";
import { Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";
import { namedLazyImport } from "../utils/named-lazy-import";

const { QuizPage } = namedLazyImport(
  async () => import('../features/general-user/routes/quiz-page'),
  'QuizPage',
);

const App = () => {
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
        element: <QuizPage />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
    errorElement: <div>Error</div>,
  },
];
