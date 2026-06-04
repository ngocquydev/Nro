import { lazy } from 'react';
const Dashboard = lazy(() => import('@pages/Dashboard/Dashboard'));
const Analytics = lazy(() => import('@pages/Analytics/Analytics'));
const Products = lazy(() => import('@pages/Products/Products'));

const routers = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/analytics',
    element: <Analytics />,
  },
  {
    path: '/ecommerce',
    element: <Dashboard />,
  },
  {
    path: '/crm',
    element: <Dashboard />,
  },
  {
    path: '/saas',
    element: <Dashboard />,
  },
  {
    path: '/chart',
    element: <Dashboard />,
  },
  {
    path: '/products',
    element: <Products />,
  },
];

export default routers;
