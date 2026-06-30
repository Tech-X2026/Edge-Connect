import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const Toaster = dynamic(() => import("@/components/ui/toaster").then((mod) => mod.Toaster));
const ChatBot = dynamic(() => import("@/components/edge-connect/ChatBot"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EDGE CONNECT - Digital Marketing Solutions",
  description: "EDGE CONNECT delivers cutting-edge digital marketing, SEO, performance marketing, and web design solutions that drive real results for your business.",
  keywords: ["EDGE CONNECT", "Digital Marketing", "SEO", "Performance Marketing", "Web Design"],
  authors: [{ name: "EDGE CONNECT" }],
  icons: {
    icon: "/img/connect_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
        <ChatBot />
      </body>
    </html>
  );
}
