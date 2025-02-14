import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const IBMPLEX = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "Imaginify",
  description: "AI powered Image Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("font-IBMPLEX antialiased", IBMPLEX.variable)} 
      >
        {children}
      </body>
    </html>
  );
}
