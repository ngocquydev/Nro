import { lazy } from 'react';
const Home = lazy(() => import('@pages/Home/Home'));
const LoginPage = lazy(() => import('@pages/LoginPage/LoginPage'));

const routers = [
  {
    path: '/',
    element: <Home />,
  },
];

export default routers;
