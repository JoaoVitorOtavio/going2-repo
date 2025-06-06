"use client";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateJwt } from "./utils/auth";
import { ReduxProvider } from "../store/provider";
import LoadingSpinner from "./components/Spinner/Spinner";
import { AbilityProvider } from "@/contexts/AbilityContext";
import { AppInitializer } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthenticated = validateJwt(token);

    if (!isAuthenticated) {
      router.push("/");
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <ToastContainer position="top-right" autoClose={3000} />
        <ReduxProvider>
          <AppInitializer>
            <AbilityProvider>
              <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
            </AbilityProvider>
          </AppInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
