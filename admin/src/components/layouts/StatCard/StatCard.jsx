import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { PiChartLineUpThin } from 'react-icons/pi';
const data = [
  { value: 100 },
  { value: 50 },
  { value: 100 },
  { value: 150 },
  { value: 100 },
  { value: 200 },
  { value: 300 },
];
const SparklineChart = ({ color }) => (
  <div className="mt-4 h-16 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={color}
          fillOpacity={0.1}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
function StatCard({
  title,
  value,
  change,
  icon: Icon,
  colorClass,
  chartColor,
  isChart = true,
  isDesc = true,
}) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        {/* Thêm min-w-0 để text không bao giờ đẩy icon ra ngoài */}
        <div className="min-w-0 flex-1">
          <h5 className="truncate text-sm font-medium text-gray-500">{title}</h5>
          <strong className="mt-1 block truncate text-2xl font-bold text-gray-900">{value}</strong>

          <div className="mt-2 flex items-center gap-1.5 text-sm">
            <span className="flex shrink-0 items-center font-medium text-green-600">
              <PiChartLineUpThin size={16} className="mr-1" /> {change}
            </span>
            {isDesc && <span className="whitespace-nowrap text-gray-400">vs last month</span>}
          </div>
        </div>

        {/* Icon luôn nằm cố định bên phải với shrink-0 */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClass} shrink-0`}
        >
          <Icon size={24} />
        </div>
      </div>

      {isChart && <SparklineChart color={chartColor} />}
    </div>
  );
}

export default StatCard;
