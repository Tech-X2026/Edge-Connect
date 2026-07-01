import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";

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
  description: "EDGE CONNECT delivers cutting-edge digital marketing, SEO, performance marketing, and web web solutions that drive real results for your business.",
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
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MC637KW3');`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-foreground`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MC637KW3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
        <Toaster />
        <ChatBot />
      </body>
    </html>
  );
}
