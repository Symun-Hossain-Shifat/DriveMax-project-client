import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SideNavbar from "@/components/SideNavbar";

import { GetUserInserver } from "@/lib/Actions/Getuser";
import Providers from "@/provider";

interface CurrentUserType {
  id: string;
  createdAt: Date;
  updatedAt: Date | string;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  let currentUserData = null;

  try {
    currentUserData = await GetUserInserver();
  } catch (error) {
    console.error(error);
  }

  const currentUser = currentUserData as CurrentUserType | null;

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-500">
            Access Denied
          </h2>
          <p>Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <Providers>
      <div className="flex h-screen w-screen overflow-hidden bg-black text-white">
        <SideNavbar
          Userinfo={{
            ...currentUser,
            image: currentUser.image ?? undefined,
            role: currentUser.role as "Admin" | "User" | undefined,
          }}
        />

        <div className="flex flex-1 flex-col overflow-y-auto">
          <main className="flex-1 p-4 md:p-6">
            <Navbar
              onCartClick={() => { }}
              onWishlistClick={() => { }}
            />
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </Providers>
  );
}