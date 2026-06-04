const orders = [
  {
    customer: 'Emma Wilson',
    email: 'emma@example.com',
    id: 'ORD-7891',
    product: 'Pro Dashboard License',
    status: 'Completed',
    amount: '$299.00',
    initials: 'EW',
    color: 'bg-orange-500',
  },
  {
    customer: 'James Chen',
    email: 'james@company.io',
    id: 'ORD-7890',
    product: 'Team Plan Upgrade',
    status: 'Processing',
    amount: '$599.00',
    initials: 'JC',
    color: 'bg-teal-600',
  },
  {
    customer: 'Sofia Garcia',
    email: 'sofia@startup.co',
    id: 'ORD-7889',
    product: 'Enterprise License',
    status: 'Completed',
    amount: '$1,499.00',
    initials: 'SG',
    color: 'bg-blue-600',
  },
  {
    customer: 'Alex Thompson',
    email: 'alex@dev.com',
    id: 'ORD-7888',
    product: 'Single License',
    status: 'Pending',
    amount: '$79.00',
    initials: 'AT',
    color: 'bg-amber-600',
  },
  {
    customer: 'Maria Santos',
    email: 'maria@agency.co',
    id: 'ORD-7887',
    product: 'Pro Dashboard License',
    status: 'Completed',
    amount: '$299.00',
    initials: 'MS',
    color: 'bg-purple-600',
  },
  {
    customer: 'David Kim',
    email: 'david@tech.io',
    id: 'ORD-7886',
    product: 'Team Plan Upgrade',
    status: 'Cancelled',
    amount: '$599.00',
    initials: 'DK',
    color: 'bg-red-700',
  },
];

const statusStyles = {
  Completed: 'bg-green-600 text-white',
  Processing: 'bg-orange-600 text-white',
  Pending: 'bg-amber-400 text-black',
  Cancelled: 'bg-red-600 text-white',
};

function RecentOrders() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <p className="text-gray-500">Latest transactions from your store</p>
        </div>
        <a href="#" className="flex items-center gap-1 font-medium text-orange-600">
          View all <span>↗</span>
        </a>
      </div>
      {/* Sử dụng w-full để bảng chiếm toàn bộ không gian thẻ cha */}
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-100 text-[13px] font-semibold tracking-wide text-gray-400 uppercase">
            <th className="py-3">Customer</th>
            <th className="py-3">Order ID</th>
            <th className="py-3">Product</th>
            <th className="py-3">Status</th>
            <th className="py-3 text-right">Amount</th>
          </tr>
        </thead>
        {/* Áp dụng text-[13px] cho toàn bộ nội dung trong tbody */}
        <tbody className="divide-y divide-gray-100 text-[13px]">
          {orders.map((order, i) => (
            <tr key={i} className="transition-colors hover:bg-gray-50">
              <td className="flex items-center gap-3 py-3">
                <div
                  className={`h-9 w-9 rounded-full ${order.color} flex items-center justify-center text-[13px] font-bold text-white`}
                >
                  {order.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{order.customer}</p>
                  <p className="text-gray-400">{order.email}</p>
                </div>
              </td>
              <td className="py-3 text-gray-500">{order.id}</td>
              <td className="py-3 font-medium text-gray-700">{order.product}</td>
              <td className="py-3">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-3 text-right font-bold">{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default RecentOrders;
