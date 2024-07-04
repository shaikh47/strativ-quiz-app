import { Navigate, useLocation, type RouteObject } from 'react-router-dom';
import { AuthRoutes } from '../features/auth';

const RedirectToAuth = () => {
  const location = useLocation();
  const from = `${location.pathname}${location.search}`;
  const state = { from };
  return <Navigate replace to='/auth' state={state} />;
};

export const generalRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthRoutes />,
  },
  {
    path: '*',
    element: <RedirectToAuth />,
  },
];
