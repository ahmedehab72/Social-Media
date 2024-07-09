'use client'

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";
import Navbar from "./.navbar/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "@/context/UserContext";
import { Provider } from "react-redux";
import { store } from "@/lib/store";


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {



  let queryClient = new QueryClient()

  return (
    <html lang="en">
      <title>Social Media</title>
      <Provider store={store}>
        <body className="marginTop">
          <QueryClientProvider client={queryClient}>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <UserContext>
                  <Navbar />
                  {children}
                </UserContext>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </QueryClientProvider>
        </body>
      </Provider>
    </html>
  );
}
