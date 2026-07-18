import SideNavbar from '@/components/SideNavbar';
import { GetUserInserver } from '@/lib/Actions/Getuser';
import React from 'react';


interface CurrentUserType {
  id: string;
  createdAt: Date;
  updatedAt: Date & string;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
  role: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  let currentUserData = null;

  // FIX 1: ট্রাই-ক্যাচ দিয়ে ঘেরাও করা হলো যেন Unauthorized এরর পেজ ক্রাশ না করায়
  try {
    currentUserData = await GetUserInserver();
  } catch (error) {
    console.error("Layout auth error caught:", error);
    // এরর আসলে currentUserData null থাকবে, ক্রাশ করবে না
  }

  const currentUser = currentUserData as CurrentUserType;

  // ইউজার না থাকলে এখানেই আটকে দেবে এবং সুন্দর মেসেজ দেখাবে
  if (!currentUser) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-500">Access Denied</h2>
          <p className="mt-2 text-zinc-400">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    // FIX 2: স্ক্রিনের হাইট ফিক্সড করে overflow-hidden করা হয়েছে (স্ক্রল এবং ফুটার ফিক্স)
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white">
      <SideNavbar
        Userinfo={{
          ...currentUser,
          image: currentUser.image ?? undefined,
          role: currentUser.role as "Admin" | "User" | undefined
        }}
      />

      {/* FIX 3: ডানপাশের মেইন কন্টেন্ট এরিয়াকে আলাদাভাবে স্ক্রল করার ব্যবস্থা করা হয়েছে */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}