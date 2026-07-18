"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ClipboardList,
  Boxes,
  UserPlus,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";


const STATS = [
  {
    label: "Total revenue",
    value: "৳4,82,300",
    delta: "+12.4%",
    up: true,
    icon: DollarSign,
  },
  {
    label: "Orders",
    value: "1,284",
    delta: "+6.1%",
    up: true,
    icon: ClipboardList,
  },
  {
    label: "Customers",
    value: "938",
    delta: "+3.8%",
    up: true,
    icon: UserPlus,
  },
  {
    label: "Inventory left",
    value: "214",
    delta: "-2.2%",
    up: false,
    icon: Boxes,
  },
];

const revenueData = [
  { day: "Mon", revenue: 32000 },
  { day: "Tue", revenue: 41000 },
  { day: "Wed", revenue: 38000 },
  { day: "Thu", revenue: 52000 },
  { day: "Fri", revenue: 61000 },
  { day: "Sat", revenue: 74000 },
  { day: "Sun", revenue: 68000 },
];

const recentOrders = [
  { id: "TH-10312", customer: "Rafiul Islam", total: "৳3,200", status: "Delivered" },
  { id: "TH-10311", customer: "Nusrat Jahan", total: "৳1,150", status: "Processing" },
  { id: "TH-10310", customer: "Tanvir Ahmed", total: "৳2,780", status: "Delivered" },
  { id: "TH-10309", customer: "Farzana Akter", total: "৳980", status: "Pending" },
  { id: "TH-10308", customer: "Imran Kabir", total: "৳4,420", status: "Delivered" },
];

const statusStyles = {
  Delivered: "text-emerald-400/90 bg-emerald-400/10",
  Processing: "text-[#d4a24e] bg-[#d4a24e]/10",
  Pending: "text-[#f5f0e6]/60 bg-[#f5f0e6]/10",
};

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e6] flex">
    

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between gap-4 border-b border-[#f5f0e6]/10 px-6 py-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#f5f0e6]/35" />
            <input
              type="text"
              placeholder="Search orders, products, customers..."
              className="w-full rounded-full bg-[#111111] border border-[#f5f0e6]/10 pl-9 pr-4 py-2 text-sm placeholder:text-[#f5f0e6]/35 focus:outline-none focus:border-[#d4a24e]/40"
            />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              aria-label="Notifications"
              className="relative rounded-full p-2 hover:bg-[#f5f0e6]/5 transition-colors"
            >
              <Bell className="h-5 w-5 text-[#f5f0e6]/70" strokeWidth={1.8} />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#d4a24e]" />
            </button>
            <div className="h-9 w-9 rounded-full bg-[#d4a24e]/15 border border-[#d4a24e]/40 flex items-center justify-center text-sm font-medium text-[#d4a24e]">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-[#f5f0e6]/45 mt-1">
              Here's what's happening at the haat today.
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(({ label, value, delta, up, icon: Icon }) => (
              <div
                key={label}
                className="rounded-lg border border-[#f5f0e6]/10 bg-[#111111] p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#d4a24e]/10 p-2">
                    <Icon className="h-4 w-4 text-[#d4a24e]" strokeWidth={2} />
                  </span>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium ${
                      up ? "text-emerald-400/90" : "text-red-400/80"
                    }`}
                  >
                    {up ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {delta}
                  </span>
                </div>
                <p className="text-2xl font-semibold mt-4">{value}</p>
                <p className="text-xs text-[#f5f0e6]/45 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Chart + recent orders */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-lg border border-[#f5f0e6]/10 bg-[#111111] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-[#f5f0e6]/70">
                  Revenue this week
                </h2>
                <span className="text-xs text-[#f5f0e6]/35">Last 7 days</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d4a24e" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#d4a24e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f5f0e6"
                      strokeOpacity={0.06}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      stroke="#f5f0e6"
                      strokeOpacity={0.2}
                      tick={{ fill: "#f5f0e6", fillOpacity: 0.45, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "#0a0a0a",
                        border: "1px solid rgba(245,240,230,0.1)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      labelStyle={{ color: "#f5f0e6" }}
                      itemStyle={{ color: "#d4a24e" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#d4a24e"
                      strokeWidth={2}
                      fill="url(#revFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent orders */}
            <div className="rounded-lg border border-[#f5f0e6]/10 bg-[#111111] p-5">
              <h2 className="text-sm font-medium text-[#f5f0e6]/70 mb-4">
                Recent orders
              </h2>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{order.customer}</p>
                      <p className="text-xs text-[#f5f0e6]/35">{order.id}</p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p>{order.total}</p>
                      {/* <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}