import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/session-provider";
import { TitleBar } from "./components/title-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistRobotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistRobotoMono.variable} antialiased bg-background text-foreground`}
      >
        <SessionWrapper>
          <div className="min-h-screen flex  justify-center p-8">
            <div className="w-full max-w-screen-lg">
              <div className="flex flex-row p-8">
                <TitleBar />
              </div>
              {children}
            </div>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
