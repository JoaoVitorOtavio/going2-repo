"use client";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateJwt } from "./utils/auth";

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
        {children}
      </body>
    </html>
  );
}
