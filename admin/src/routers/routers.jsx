import { lazy } from "react";
const Home = lazy(() => import("@pages/Home/Home"));

const routers = [
  {
    path: "/",
    element: <Home />,
  },
];

export default routers;
