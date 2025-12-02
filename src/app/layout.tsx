import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AiProg - Build Anything With AI",
  description: "Create production-ready applications by chatting with our advanced AI. No more debugging. No more errors. Just pure creation.",
  keywords: ["AI", "programming", "code generation", "AI assistant", "development", "web development"],
  authors: [{ name: "AiProg" }],
  creator: "AiProg",
  publisher: "AiProg",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiprog.dev",
    title: "AiProg - Build Anything With AI",
    description: "Create production-ready applications by chatting with our advanced AI. Superior AI. Better Code. Faster Results.",
    siteName: "AiProg",
  },
  twitter: {
    card: "summary_large_image",
    title: "AiProg - Build Anything With AI",
    description: "Create production-ready applications by chatting with our advanced AI.",
    creator: "@aiprog",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://aiprog.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientBody
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </ClientBody>
    </html>
  );
}
