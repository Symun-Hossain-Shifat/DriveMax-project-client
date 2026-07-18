"use client";

import { AppProvider } from "./components/AppContext";
import { ToastProvider } from "./components/Toast";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ToastProvider>
            <AppProvider>
                {children}
            </AppProvider>
        </ToastProvider>
    );
}