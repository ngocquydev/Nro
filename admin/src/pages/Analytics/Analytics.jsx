import React from 'react';
import StatCard from '@components/layouts/StatCard/StatCard';
import { FaUserGroup } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';
import { GoArrowUpLeft } from 'react-icons/go';
import { PiClock } from 'react-icons/pi';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const overviewData = [
  { name: 'Jan', value: 20000 },
  { name: 'Feb', value: 25000 },
  { name: 'Mar', value: 22000 },
  { name: 'Apr', value: 30000 },
  { name: 'May', value: 35000 },
  { name: 'Jun', value: 32000 },
  { name: 'Jul', value: 40000 },
  { name: 'Aug', value: 800000 },
  { name: 'Sep', value: 600000 },
  { name: 'Oct', value: 400000 },
  { name: 'Nov', value: 200000 },
  { name: 'Dec', value: 0 },
];

const categoryData = [
  { name: 'Templates', value: 28000 },
  { name: 'Licenses', value: 13000 },
  { name: 'Plans', value: 10000 },
  { name: 'Modules', value: 7000 },
];
const countryData = [
  { name: 'United States', count: '12.847', percentage: 30 },
  { name: 'United Kingdom', count: '6.423', percentage: 15 },
  { name: 'Germany', count: '5.134', percentage: 12 },
  { name: 'Canada', count: '3.847', percentage: 9 },
  { name: 'France', count: '2.983', percentage: 7 },
  { name: 'Australia', count: '2.561', percentage: 6 },
];
const colors = {
  main: '#ea580c', // Cam đậm (cho nét biểu đồ)
  light: '#ffedd5', // Cam rất nhạt (cho nền)
  bar: '#c2410c', // Cam cho BarChart
};

const OverviewChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={overviewData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorOverview" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
          <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f3f4f6" />
      <XAxis
        dataKey="name"
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12, fill: '#9ca3af' }}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        ticks={[0, 200000, 400000, 600000, 800000]}
        domain={[0, 800000]}
        tickFormatter={(val) => `${val / 1000}`}
        tick={{ fontSize: 12, fill: '#9ca3af' }}
      />
      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
      <Area
        type="natural"
        dataKey="value"
        stroke="#f97316"
        strokeWidth={3}
        fill="url(#colorOverview)"
        activeDot={{ r: 6 }}
      />
    </AreaChart>
  </ResponsiveContainer>
);

function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back, Aigars. Here's what's happening with your business today
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Page Views"
          value="284,392"
          change="+12.5%"
          icon={FiEye}
          colorClass="bg-orange-100 text-orange-600"
        />
        <StatCard
          title="Unique Visitors"
          value="42,847"
          change="+8.2%"
          icon={FaUserGroup}
          colorClass="bg-emerald-100 text-emerald-600"
        />
        <StatCard
          title="Bounce Rate"
          value="32.4%"
          change="+4.1%"
          icon={GoArrowUpLeft}
          colorClass="bg-cyan-100 text-cyan-600"
        />
        <StatCard
          title="Avg. Session"
          value="4m 32s"
          change="+15.3%"
          icon={PiClock}
          colorClass="bg-amber-100 text-amber-700"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Overview Chart */}
        <div className="col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Page Views Over Time</h2>
          <p className="mb-6 text-sm text-gray-500">Monthly performance for the current year</p>
          <div className="h-64">
            <OverviewChart />
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="col-span-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Revenue by Category</h2>
          <p className="text-gray-500">Distribution across product types</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 0, right: 30, left: -20, bottom: 0 }}
                barSize={24}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  width={80}
                />
                <Bar dataKey="value" fill="#0d9488" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 flex justify-end text-[13px] text-gray-400">
              <span className="mx-2">$0k</span>
              <span className="mx-2">$8k</span>
              <span className="mx-2">$15k</span>
              <span className="mx-2">$23k</span>
              <span>$30k</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        {/* 1. Bảng Top Pages */}
        <div className="flex h-[400px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Top Pages</h2>
          <p className="mb-6 text-sm text-gray-500">Most visited pages this period</p>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-400">
                  <th className="py-3">Page</th>
                  <th className="py-3">Views</th>
                  <th className="py-3">Unique</th>
                  <th className="py-3">Bounce</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 text-[13px] font-medium text-blue-600">
                    /products/pro-dashboard
                  </td>
                  <td className="py-3 text-gray-700">12.847</td>
                  <td className="py-3 text-gray-700">8.392</td>
                  <td className="py-3 text-gray-700">28%</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 font-medium text-blue-600">/products/enterprise</td>
                  <td className="py-3 text-gray-700">9.234</td>
                  <td className="py-3 text-gray-700">8.456</td>
                  <td className="py-3 text-gray-700">32%</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 font-medium text-blue-600">/pricing</td>
                  <td className="py-3 text-gray-700">6.128</td>
                  <td className="py-3 text-gray-700">5.843</td>
                  <td className="py-3 text-gray-700">31%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Danh sách Top Countries */}
        <div className="flex h-[400px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Top Countries</h2>
          <p className="mb-6 text-sm text-gray-500">Where your visitors come from</p>

          <div className="flex-1 space-y-5 overflow-y-auto">
            {countryData.map((c) => (
              <div key={c.name} className="flex items-center gap-4">
                <span className="w-32 truncate text-sm font-medium text-gray-600">{c.name}</span>
                <div className="h-2 flex-1 rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-orange-700"
                    style={{ width: `${c.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sm font-bold">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
