import type { Metadata } from "next";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Create Account | DriveMax",
  description: "Join DriveMax — register for a free account to shop premium car and bike parts with guaranteed fitment.",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
