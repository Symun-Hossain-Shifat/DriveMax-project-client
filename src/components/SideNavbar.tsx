"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, useOverlayState } from "@heroui/react";

import { BiPlusCircle } from "react-icons/bi";
import {
  BsHouse,
  BsPerson,
} from "react-icons/bs";

import { FiBookOpen } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { IconType } from "react-icons";

interface UserInfo {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: "Admin" | "User";
}

interface SideNavigationProps {
  Userinfo: UserInfo | null;
}

interface NavItem {
  href: string;
  label: string;
  icon: IconType;
}

export default function SideNavbar({ Userinfo }: SideNavigationProps) {
  const pathname = usePathname();
  const user = Userinfo;

  const drawerState = useOverlayState({ defaultOpen: false });

  const UserNavItems: NavItem[] = [
    { href: "/Dashboard/User", icon: BsHouse, label: "Overview" },
    { href: "/Dashboard/User/product", icon: BiPlusCircle, label: "Add Product" },
    { href: "/Dashboard/User/ManageProduct", icon: FiBookOpen, label: "Manage Product" } ,
    { href: "/Dashboard/User/profile", icon: BsPerson, label: "Profile" },
     
  ];

  const AdminNavItems: NavItem[] = [
    { href: "/Dashboard/Admin", icon: BsHouse, label: "Overview" },
    { href: "/Dashboard/Admin/Manageproduct", icon: FiBookOpen, label: "Manage Product" },
    { href: "/Dashboard/Admin/profile", icon: BsPerson, label: "Profile" },
  ];

  const FinalLinks = user?.role === "Admin" ? AdminNavItems : UserNavItems;

  const renderNavmenu = (closeOnNavigate: boolean) => (
    <div className="w-full">
      <nav className="flex flex-col gap-2">
        {/* User Card - Changed to pitch black background with zinc border */}
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-zinc-800 bg-black p-3">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-zinc-800">
            <Image
              src={user?.image || "/default-avatar.png"}
              alt="User"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold text-white">
              {user?.name || "Guest"}
            </h2>
            <p className="text-sm text-zinc-400">
              Welcome back 👋
            </p>
          </div>
        </div>

        {FinalLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeOnNavigate ? () => drawerState.close() : undefined}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-orange-500"
              }`}
            >
              <Icon
                className={`text-lg transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — Pitch Black Background */}
      <aside className="hidden w-64 shrink-0 border-r border-zinc-800 bg-black p-4 lg:block">
        {renderNavmenu(false)}
      </aside>

      {/* Mobile view */}
      <div className="lg:hidden">
        <Drawer state={drawerState}>
          {/* Bottom navbar — Pitch Black Background */}
          <div className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-center border-t border-zinc-800 bg-black">
            <Drawer.Trigger
              aria-label="Open sidebar"
              className="flex h-14 w-14 -translate-y-4 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-white shadow-lg ring-4 ring-black transition-transform active:scale-95"
            >
              <IoMenu className="text-2xl" />
            </Drawer.Trigger>
          </div>

          <Drawer.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
            <Drawer.Content
              placement="left"
              className="fixed inset-y-0 left-0 z-50 h-full w-72 max-w-[85vw]"
            >
              {/* Drawer Dialog — Pitch Black Background */}
              <Drawer.Dialog className="h-full w-72 max-w-[85vw] overflow-y-auto bg-black border-r border-zinc-800 p-4">
                <Drawer.CloseTrigger className="ml-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-900" />

                <Drawer.Header>
                  <Drawer.Heading className="text-white">
                    Navigation
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body className="overflow-y-auto">
                  {renderNavmenu(true)}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>

        {/* Spacer */}
        <div className="h-16" />
      </div>
    </>
  );
}