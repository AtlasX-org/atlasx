"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Network, SatsWagmiConfig } from "@gobob/sats-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <QueryClientProvider client={queryClient}>
          <SatsWagmiConfig
            network={"testnet" as Network}
            queryClient={queryClient}
          >
            <Navbar />
            {children}
          </SatsWagmiConfig>
        </QueryClientProvider>
      </body>
    </html>
  );
}
