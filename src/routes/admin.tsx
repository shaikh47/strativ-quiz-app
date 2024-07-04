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

const DummyComponent = () => {
  return (
    <>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
      <div className="bg-slate-400">This is the main content</div>
    </>
  );
};

export const adminRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "question/*",
        element: <div>This should be the question page</div>,
      },
      {
        path: "answer/*",
        element: <div>This should be the answer page</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
    errorElement: <div>Error</div>,
  },
];
