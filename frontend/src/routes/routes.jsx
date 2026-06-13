import Home from '@page/Home.jsx';
import Test from '@page/Test.jsx';
import Login from '@page/Login.jsx';
import Register from '@page/Register';
import NapCard from '@page/NapCard';
import PageATM from '@page/PageATM';
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
        path: '/member/balance-history',
        element: <MemberLayout />,
    },
    {
        path: '/member/transaction',
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
        path: '/account',
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
const routesAdmin = [
    // { path: '/admin', element: <AdminHome /> },
    // { path: '/admin/products/add', element: <CreateProducts /> },
    // { path: '/admin/products/add/Detail', element: <CreateDetailProducts /> },
    // {
    //     path: '/admin/products/add/DanhMucSanPham',
    //     element: <CreateDanhMucSanPham />,
    // },
];
export { routes, routesAdmin };
