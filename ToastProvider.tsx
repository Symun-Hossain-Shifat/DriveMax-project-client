"use client";

import { AppProvider } from "./components/AppContext";
import { Toaster } from "@/components/ui/sonner"; // অথবা "@/components/ui/toaster"

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppProvider>
            {children}
            <Toaster />
        </AppProvider>
    );
}