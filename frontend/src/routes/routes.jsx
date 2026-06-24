import Home from '@page/Home.jsx';
import Test from '@page/Test.jsx';
import Login from '@page/Login.jsx';
import Register from '@page/Register';
import NapCard from '@page/Transaction/NapCard';
import PageATM from '@page/Transaction/PageATM';
import Blogs from '@page/Blogs';
import MemberLayout from '@page/member/MemberLayout';
import PackNickNgocRongVip from '@page/PackNickNgocRongVip';
import Detail from '@page/Detail/Detail';
import TinTucGameNro from '@page/TinTuc/TinTucGameNro';
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
    path: '/nap-card',
    element: <NapCard />,
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
    path: '/member/transaction/card',
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
    path: '/category/tin-tuc-game-ngoc-rong',
    element: <TinTucGameNro />,
  },
  {
    path: '/test',
    element: <Test />,
  },
];
export { routes };
