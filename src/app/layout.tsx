import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from '@/_common/components/NavBar/NavBar';
import ThemeRegistry from '@/_global/components/Theme/ThemeRegistry';
import { CozyTheme } from '@/_global/helper/constants';
import { Box, Divider } from "@mui/material";
import Nav from "@/_homePage/Nav/nav";
import QuickActions from "@/_homePage/QuickActions/QuickActions";
import { Suspense } from "react";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QueryProvider from '../_global/components/query-provider';
import { AuthProvider } from '../_global/components/context/AuthContext';
import ClientLayout from "@/_global/components/ClientLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
// const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ThemeRegistry
          platformTheme={CozyTheme}
          fontName={"'Inter', sans-serif"}
        >
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <ClientLayout>
                {children}
              </ClientLayout>
            </Suspense>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
