"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Pencil,
  ChevronRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



const TABS = [
  { key: "overview", label: "Overview", icon: User },
  { key: "orders", label: "Orders", icon: Package },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "settings", label: "Settings", icon: Settings },
];


const orders = [
  { id: "TH-10234", date: "Jul 02, 2026", total: "৳2,450", status: "Delivered" },
  { id: "TH-10198", date: "Jun 18, 2026", total: "৳1,120", status: "Delivered" },
  { id: "TH-10142", date: "May 29, 2026", total: "৳3,980", status: "Processing" },
];

export default function ProfilePage() { 
    const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // 💡 State to track if the client has mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f0e6] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 border-b border-[#f5f0e6]/10 pb-8">
          <div className="relative shrink-0">
            <div className="h-20 w-20 rounded-full bg-[#d4a24e]/15 border border-[#d4a24e]/40 flex items-center justify-center overflow-hidden">
              
                <span className="text-2xl font-semibold text-[#d4a24e]">
                  {user?.name.charAt(0)}
                </span>
              
            </div>
            <button
              aria-label="Edit profile photo"
              className="absolute -bottom-1 -right-1 rounded-full bg-[#d4a24e] p-1.5 text-[#0a0a0a] hover:bg-[#e8b768] transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>

          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {user?.name}
            </h1>
            <p className="text-sm text-[#f5f0e6]/50 mt-1">{user?.email}</p>
            <p className="text-xs text-[#f5f0e6]/35 mt-1">
              Member since 
            </p>
          </div>

          <button
  onClick={handleLogout}
  className="inline-flex items-center gap-2 rounded-full border border-[#f5f0e6]/15 px-5 py-2.5 text-sm font-medium text-[#f5f0e6]/80 hover:border-[#f5f0e6]/35 hover:text-[#f5f0e6] transition-colors self-start"
>
  <LogOut className="h-4 w-4" strokeWidth={2} />
  Log out
</button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
          <div className="rounded-lg border border-[#f5f0e6]/10 bg-[#111111] px-5 py-4">
            <p className="text-2xl font-semibold text-[#d4a24e]">
              10
            </p>
            <p className="text-xs text-[#f5f0e6]/50 mt-1">Total orders</p>
          </div>
          <div className="rounded-lg border border-[#f5f0e6]/10 bg-[#111111] px-5 py-4">
            <p className="text-2xl font-semibold text-[#d4a24e]">
              5
            </p>
            <p className="text-xs text-[#f5f0e6]/50 mt-1">Wishlist items</p>
          </div>
          <div className="hidden sm:block rounded-lg border border-[#f5f0e6]/10 bg-[#111111] px-5 py-4">
            <p className="text-2xl font-semibold text-[#d4a24e]">Gold</p>
            <p className="text-xs text-[#f5f0e6]/50 mt-1">Membership tier</p>
          </div>
        </div>

        {/* Body: tab nav + content */}
        <div className="flex flex-col md:flex-row gap-8 mt-10">
          {/* Tabs */}
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:w-56 shrink-0">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === key
                    ? "bg-[#d4a24e]/10 text-[#d4a24e] border border-[#d4a24e]/30"
                    : "text-[#f5f0e6]/60 hover:text-[#f5f0e6] hover:bg-[#f5f0e6]/5 border border-transparent"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {label}
                </span>
                <ChevronRight className="h-3.5 w-3.5 hidden md:block opacity-50" />
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1 rounded-lg border border-[#f5f0e6]/10 bg-[#111111] p-6 min-h-[280px]">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <h2 className="text-sm font-medium text-[#f5f0e6]/70">
                  Account details
                </h2>
                <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-[#f5f0e6]/40">Full name</dt>
                    <dd className="mt-1">{user?.name}</dd>
                  </div>
                  <div>
                    <dt className="text-[#f5f0e6]/40">Email</dt>
                    <dd className="mt-1">{user?.email}</dd>
                  </div>
                </dl>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-[#f5f0e6]/70 mb-2">
                  Recent orders
                </h2>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-md border border-[#f5f0e6]/10 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-[#f5f0e6]/40 text-xs mt-0.5">
                        {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p>{order.total}</p>
                      <span
                        className={`text-xs mt-0.5 inline-block ${
                          order.status === "Delivered"
                            ? "text-emerald-400/80"
                            : "text-[#d4a24e]"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "wishlist" && (
              <p className="text-sm text-[#f5f0e6]/50">
                Items you've saved will show up here.
              </p>
            )}

            {activeTab === "addresses" && (
              <p className="text-sm text-[#f5f0e6]/50">
                No saved addresses yet. Add one at checkout to see it here.
              </p>
            )}

            {activeTab === "settings" && (
              <p className="text-sm text-[#f5f0e6]/50">
                Password, notifications, and privacy controls go here.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}