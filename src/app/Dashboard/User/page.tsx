

import { GetUserInserver } from '@/lib/Actions/Getuser';
import React, { FC } from 'react';

// Interfaces for dashboard mock data
interface MetricCard {
  title: string;
  value: string | number;
  icon: string;
  bgColor: string;
  textColor: string;
}

interface RecentOrder {
  id: string;
  date: string;
  items: string;
  total: string;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
}

const metrics: MetricCard[] = [
  { title: 'Total Orders', value: 12, icon: '📦', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  { title: 'Active Orders', value: 1, icon: '🚚', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
  { title: 'Wishlist Items', value: 8, icon: '❤️', bgColor: 'bg-rose-50', textColor: 'text-rose-600' },
  { title: 'Haat Wallet Balance', value: '৳ 2,450', icon: '💳', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
];

const recentOrders: RecentOrder[] = [
  { id: '#TH-9843', date: 'Jul 10, 2026', items: '1x Premium Cotton Panjabi, 1x Leather Sandal', total: '৳ 4,200', status: 'Processing' },
  { id: '#TH-9721', date: 'Jun 28, 2026', items: '2x Slim Fit Linen Shirts', total: '৳ 2,600', status: 'Shipped' },
  { id: '#TH-9510', date: 'Jun 14, 2026', items: '1x Smart Casual Chino Pant', total: '৳ 1,850', status: 'Delivered' },
];

const statusStyles = {
  Processing: 'bg-amber-100 text-amber-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Delivered: 'bg-emerald-100 text-emerald-800',
  Cancelled: 'bg-rose-100 text-rose-800',
};

const UserDashboardHome: FC = async () => {
  const user = await GetUserInserver
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Welcome Banner */}
        <div className="bg-neutral-900 text-white rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-md">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Assalamu Alaikum, <span className="text-orange-400">{user?.name}</span>!
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Welcome back to your Haat central. Track your ongoing shipments, browse saved trends, or check your wallet balance.
            </p>
          </div>
          {/* Subtle background abstract shape */}
          <div className="absolute right-[-10%] bottom-[-30%] w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        </div>

        {/* Metrics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-1">{item.title}</p>
                <p className="text-xl md:text-2xl font-extrabold text-neutral-900">{item.value}</p>
              </div>
              <div className={`w-12 h-12 ${item.bgColor} ${item.textColor} text-xl rounded-xl flex items-center justify-center`}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid Content */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Ongoing Order Tracking Status (Left 2 Columns) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-neutral-900">Track Ongoing Shipment</h2>
                <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full">#TH-9843</span>
              </div>

              {/* Stepper tracking graphic */}
              <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <div className="absolute left-[15px] sm:left-0 sm:right-0 top-0 sm:top-4 bottom-0 sm:bottom-auto h-full sm:h-0.5 bg-gray-100 -z-0">
                  <div className="h-1/3 sm:h-full w-0.5 sm:w-1/3 bg-orange-500"></div>
                </div>

                <div className="flex sm:flex-col items-center gap-3 sm:gap-2 relative z-10 bg-white pr-4 sm:pr-0">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">✓</div>
                  <div className="text-left sm:text-center">
                    <p className="text-xs font-bold text-neutral-900">Confirmed</p>
                    <p className="text-[10px] text-gray-400">Jul 10</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-3 sm:gap-2 relative z-10 bg-white px-4 sm:px-0">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-sm animate-pulse">🚚</div>
                  <div className="text-left sm:text-center">
                    <p className="text-xs font-bold text-neutral-900">Processing</p>
                    <p className="text-[10px] text-gray-400">In Hub</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-3 sm:gap-2 relative z-10 bg-white px-4 sm:px-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 border border-gray-200 flex items-center justify-center text-xs font-bold">📦</div>
                  <div className="text-left sm:text-center">
                    <p className="text-xs font-medium text-gray-400">Shipped</p>
                    <p className="text-[10px] text-gray-400">Pending</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-3 sm:gap-2 relative z-10 bg-white pl-4 sm:pl-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 border border-gray-200 flex items-center justify-center text-xs font-bold">🏠</div>
                  <div className="text-left sm:text-center">
                    <p className="text-xs font-medium text-gray-400">Delivered</p>
                    <p className="text-[10px] text-gray-400">Expected Jul 14</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders Table Component */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-neutral-900">Recent Transactions</h2>
                <button className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      <th className="py-3 px-6">Order ID</th>
                      <th className="py-3 px-6">Date</th>
                      <th className="py-3 px-6">Items Purchased</th>
                      <th className="py-3 px-6">Total Amount</th>
                      <th className="py-3 px-6 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs text-gray-600">
                    {recentOrders.map((order, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                        <td className="py-4 px-6 font-bold text-neutral-900">{order.id}</td>
                        <td className="py-4 px-6 text-gray-400">{order.date}</td>
                        <td className="py-4 px-6 max-w-[200px] truncate font-medium">{order.items}</td>
                        <td className="py-4 px-6 font-semibold text-neutral-900">{order.total}</td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyles[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions & Preferences (Right 1 Column) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Quick Marketplace Actions</h2>
              <div className="space-y-2">
                <button className="w-full text-left bg-gray-50 hover:bg-orange-50 hover:text-orange-700 text-sm font-medium p-3.5 rounded-xl border border-gray-100 hover:border-orange-200 transition-all flex items-center gap-3">
                  <span>🛒</span> Continue Shopping
                </button>
                <button className="w-full text-left bg-gray-50 hover:bg-orange-50 hover:text-orange-700 text-sm font-medium p-3.5 rounded-xl border border-gray-100 hover:border-orange-200 transition-all flex items-center gap-3">
                  <span>🛠️</span> Account Profile Settings
                </button>
                <button className="w-full text-left bg-gray-50 hover:bg-orange-50 hover:text-orange-700 text-sm font-medium p-3.5 rounded-xl border border-gray-100 hover:border-orange-200 transition-all flex items-center gap-3">
                  <span>🎟️</span> Check Active Promo Coupons
                </button>
              </div>
            </div>

            <div className="bg-orange-50/70 border border-orange-100 p-6 rounded-2xl text-center">
              <h3 className="font-bold text-orange-900 text-sm mb-1">Need help with an item?</h3>
              <p className="text-orange-700 text-xs mb-4">Our dedicated Haat assistance portal handles returns, disputes, and delivery changes fast.</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors">
                Open Support Ticket
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;