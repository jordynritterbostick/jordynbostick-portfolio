import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import BinaryBackground from "../components/BinaryBackground";

export const metadata: Metadata = {
  title: "Jordyn Bostick | Cybersecurity Portfolio",
  description: "Cybersecurity portfolio with hands-on labs, projects, and writeups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-black text-white antialiased">
        <BinaryBackground />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}