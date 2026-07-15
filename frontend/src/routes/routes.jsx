import Home from '@page/Home.jsx';
import Login from '@page/Login.jsx';
import Register from '@page/Register';
import PageATM from '@page/Transaction/PageATM';
import Blogs from '@page/TinTuc/Blogs';
import MemberLayout from '@page/member/MemberLayout';
import PackNickNgocRongVip from '@page/PackNickNgocRongVip';
import Detail from '@page/Detail/Detail';
import TinTucGameNro from '@page/TinTuc/TinTucGameNro';
import DetailBlogs from '@page/TinTuc/DetailBlogs';
import TinTucGameFF from '@page/TinTuc/TinTucGameFF';
import TinTucGameLq from '@page/TinTuc/TinTucGameLq';
const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  {
    path: '/nap-atm',
    element: <PageATM />,
  },
  {
    path: '/blogs',
    element: <Blogs />,
  },
  {
    path: '/member',
    element: <MemberLayout />,
  },
  {
    path: '/member/password',
    element: <MemberLayout />,
  },

  {
    path: '/member/transaction/atm',
    element: <MemberLayout />,
  },
  {
    path: '/member/purchase',
    element: <MemberLayout />,
  },
  {
    path: '/pack-nick-ngoc-rong-vip',
    element: <PackNickNgocRongVip />,
  },
  {
    path: '/pack-nick-ngoc-rong-vip/account',
    element: <Detail />,
  },
  {
    path: '/blogs/tin-tuc-game-ngoc-rong',
    element: <TinTucGameNro />,
  },
  {
    path: '/blogs/details',
    element: <DetailBlogs />,
  },
  {
    path: '/blogs/tin-tuc-game-free-fire',
    element: <TinTucGameFF />,
  },
  {
    path: '/blogs/tin-tuc-game-lien-quan',
    element: <TinTucGameLq />,
  },
];
export { routes };
