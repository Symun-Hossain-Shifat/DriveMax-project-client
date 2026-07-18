import type { Metadata } from "next";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Sign In | DriveMax",
  description: "Sign in to your DriveMax account to browse, buy, and track premium car and bike parts.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
