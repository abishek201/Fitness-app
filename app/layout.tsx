import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./css-components/card.css";
 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "track my fitness",
  description: "abishek",
  // manifest: "/site.webmanifest",
  // icons: {
  //   icon: [
  //     { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  //     { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  //   ],
  //   shortcut: ["/favicon.ico"],
  //   apple: [
  //     { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  //   ],
  // }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
   
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>


      <body>  
       
        <Analytics />
         
          {children}
       

      </body>
    </html>
    
  );
}
