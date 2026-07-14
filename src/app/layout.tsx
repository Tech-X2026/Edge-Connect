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
  metadataBase: new URL("https://www.edgeconnect.au"),
  title: "Digital Marketing Agency Canberra | EDGE CONNECT",
  description: "EDGE CONNECT is a Canberra digital marketing agency delivering SEO, performance marketing, web design and creative services that drive measurable results.",
  keywords: ["EDGE CONNECT", "Digital Marketing Canberra", "SEO Canberra", "Performance Marketing", "Web Design Canberra"],
  authors: [{ name: "EDGE CONNECT" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://www.edgeconnect.au/",
    siteName: "EDGE CONNECT",
    title: "Digital Marketing Agency Canberra | EDGE CONNECT",
    description: "EDGE CONNECT is a Canberra digital marketing agency delivering SEO, performance marketing, web design and creative services that drive measurable results.",
    images: ["/logo.png"],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "ProfessionalService", "name": "EDGE CONNECT", "url": "https://www.edgeconnect.au/", "logo": "https://www.edgeconnect.au/logo.png", "description": "Canberra digital marketing agency delivering SEO, performance marketing, web design and creative services.", "telephone": "+61432887457", "email": "info@edgeconnect.au", "address": {"@type": "PostalAddress", "streetAddress": "40 Parkes Pl E", "addressLocality": "Parkes", "addressRegion": "ACT", "postalCode": "2600", "addressCountry": "AU"}, "areaServed": {"@type": "City", "name": "Canberra"}, "sameAs": ["https://www.facebook.com/profile.php?id=61590116797723", "https://www.instagram.com/edgec_onnect/", "https://www.linkedin.com/in/edge-connect-515986410/", "https://www.youtube.com/@edgeconnect-u9w"]}) }}
        />
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
