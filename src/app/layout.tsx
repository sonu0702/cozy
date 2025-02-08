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
  title: "Cozy - Business Management",
  description: "A comprehensive business management solution",
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: '48x48' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon/android-chrome-192x192.png' },
      { rel: 'android-chrome', url: '/favicon/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/favicon/android-chrome-512x512.png', sizes: '512x512' }
    ]
  },
  manifest: '/favicon/site.webmanifest'
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
