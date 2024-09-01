import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartNest",
  description: "Smart app to save you money",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-44 bg-gradient-to-br from-[#2B88B9] to-[#53CBC9] rounded-b-3xl shadow-md">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
