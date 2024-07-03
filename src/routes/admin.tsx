import { Spinner } from '../components/elements';
import { MainLayout } from '../components/layout';
import { Suspense } from 'react';
import { Navigate, Outlet, useLocation, type RouteObject } from 'react-router-dom';

const Layout = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className='grid h-full w-full place-content-center place-items-center'>
            <Spinner />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes: RouteObject[] = [
  {
    path: '',
    element: <Layout />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: 'questions/*',
        element: <div>This should be the question page</div>,
      },
    ],
  },
  {
    path: '*',
    element: <div>Not Found</div>,
    errorElement: <div>Error</div>,
  },
];
