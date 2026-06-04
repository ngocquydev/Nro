import { BsCart } from 'react-icons/bs';
import { FaUserGroup } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';
import { PiArrowLineUpRightThin, PiCurrencyDollarBold } from 'react-icons/pi';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useState } from 'react';
import RecentOrders from './components/RecentOrders/RecentOrders';
import listRecentActivity from './contans/contans';
import StatCard from '@components/layouts/StatCard/StatCard';
const overviewData = [
  { name: 'Jan', value: 20000 },
  { name: 'Feb', value: 25000 },
  { name: 'Mar', value: 22000 },
  { name: 'Apr', value: 30000 },
  { name: 'May', value: 35000 },
  { name: 'Jun', value: 32000 },
  { name: 'Jul', value: 40000 },
  { name: 'Aug', value: 42000 },
  { name: 'Sep', value: 45000 },
  { name: 'Oct', value: 43000 },
  { name: 'Nov', value: 50000 },
  { name: 'Dec', value: 55000 },
];
const trafficData = [
  { name: 'Direct', value: 35 },
  { name: 'Organic', value: 28 },
  { name: 'Referral', value: 22 },
  { name: 'Social', value: 15 },
];
const goalsData = [
  { label: 'Monthly Revenue', current: 48295, target: 55000, color: 'bg-orange-600' },
  { label: 'New Customers', current: 847, target: 1000, color: 'bg-teal-600' },
  { label: 'Conversion Rate', current: 3.8, target: 5, color: 'bg-blue-600' },
];
const COLORS = ['#d35400', '#008080', '#3498db', '#9b59b6'];
const ProgressBar = ({ label, current, target, color }) => {
  const percentage = Math.round((current / target) * 100);

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold text-gray-800">{label}</span>
        <span className="font-medium text-gray-500">{percentage}%</span>
      </div>

      {/* Thanh nền (xám nhạt) */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
        {/* Thanh tiến trình (màu sắc) */}
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>

      <div className="mt-2 flex justify-between text-sm text-gray-400">
        <span>{current.toLocaleString()}</span>
        <span>Target: {target.toLocaleString()}</span>
      </div>
    </div>
  );
};

const TrafficChart = () => (
  <div className="grid grid-cols-2 items-center justify-center gap-4">
    <div className="relative h-40">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={trafficData}
            innerRadius={40}
            outerRadius={60}
            paddingAngle={5}
            dataKey="value"
          >
            {trafficData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-gray-900">284K</span>
        <span className="text-xs text-gray-500">Visits</span>
      </div>
    </div>
    <div>
      <div className="space-y-2">
        {trafficData.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ background: COLORS[i] }} />
            <span className="text-sm text-gray-600">{item.name}</span>
            <span className="ml-auto text-sm font-bold">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const OverviewChart = () => (
  <div className="h-64 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={overviewData}>
        <defs>
          <linearGradient id="colorOverview" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#f97316"
          strokeWidth={3}
          fill="url(#colorOverview)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
function Dashboard() {
  const [type, setType] = useState('Revenue');
  const listView = [
    {
      name: 'Revenue',
    },
    {
      name: 'Orthers',
    },
    {
      name: 'Profit',
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="opacity-50">
          Welcome back, Aigars. Here's what's happening with your business today
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$48,295"
          change="+12.5%"
          icon={PiCurrencyDollarBold}
          colorClass="bg-orange-100 text-orange-600"
          chartColor="#f97316"
        />
        <StatCard
          title="Active Users"
          value="2,847"
          change="+8.2%"
          icon={FaUserGroup}
          colorClass="bg-lime-100 text-lime-600"
          chartColor="#84cc16"
        />
        <StatCard
          title="Total Orders"
          value="1,432"
          change="+4.1%"
          icon={BsCart}
          colorClass="bg-cyan-100 text-cyan-600"
          chartColor="#06b6d4"
        />
        <StatCard
          title="Page Views"
          value="48,295"
          change="+15.3%"
          icon={FiEye}
          colorClass="bg-purple-100 text-purple-600"
          chartColor="#a855f7"
        />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-6">
        {/* Cột lớn bên trái: Biểu đồ Overview */}
        <div className="col-span-2 rounded-2xl border border-gray-100 bg-white px-4 pt-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Overview</h2>
              <p className="text-sm text-gray-500">Monthly performance for the current year</p>
            </div>
            {/* Nút lọc (Revenue/Orders/Profit) */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              {listView.map((view) => {
                return (
                  <button
                    className={
                      type === view.name
                        ? 'cursor-pointer rounded bg-white px-4 py-1 text-sm font-medium shadow-sm'
                        : 'cursor-pointer px-4 py-1 text-sm text-gray-500'
                    }
                    key={view.name}
                    onClick={() => setType(view.name)}
                  >
                    {view.name}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Chèn component biểu đồ lớn của bạn vào đây */}
          <div className="h-64">
            <OverviewChart />
          </div>
        </div>

        {/* Cột nhỏ bên phải: Traffic & Goals */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Traffic Sources */}
          <div className="rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-sm">
            <h2 className="text-lg font-bold">Traffic Sources</h2>
            <p className="opacity-50">Where your visitors come from</p>
            <TrafficChart />
          </div>

          {/* Monthly Goals */}
          <div className="rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-sm">
            <h2 className="text-lg font-bold">Monthly Goals</h2>
            <p className="opacity-50">Track progress toward targets</p>
            {goalsData.map((goal, index) => (
              <ProgressBar key={index} {...goal} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-6">
        {/* Cột lớn bên trái: Biểu đồ Overview */}
        <div className="col-span-2 rounded-2xl border border-gray-100 bg-white px-4 pt-6 shadow-sm">
          <RecentOrders />
        </div>

        {/* Cột nhỏ bên phải: Traffic & Goals */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Traffic Sources */}
          <div className="rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-sm">
            <div className="grid grid-cols-4">
              <div className="col-span-2">
                <h2 className="text-[16px] font-bold">Recent Activity</h2>
                <p className="text-[13px] whitespace-nowrap opacity-50">
                  Latest events from your store
                </p>
              </div>
              <div className="col-span-2">
                <a href="#" className="block flex justify-end text-sm font-medium text-orange-600">
                  View all <PiArrowLineUpRightThin size={20} />
                </a>
              </div>
            </div>
            {listRecentActivity.map((it) => {
              return (
                <div className="mt-6 flex items-start gap-3" key={it.id}>
                  {/* Icon - giảm padding hoặc chiều rộng nếu muốn sát hơn nữa */}
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${it.bg} ${it.color}`}
                  >
                    {it.icon}
                  </div>

                  {/* Phần nội dung chữ */}
                  <div>
                    <h6 className="font-bold">{it.name}</h6>
                    <p className="text-[14px] opacity-50">{it.desc}</p>
                    <p className="text-[13px] opacity-50">{it.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
