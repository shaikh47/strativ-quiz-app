import { Spinner } from "../components/elements";
import { MainLayout } from "../components/layout";
import { Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";

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

export const adminRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "manage-questions/*",
        element: <div>Edit questions in this page</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
    errorElement: <div>Error</div>,
  },
];
