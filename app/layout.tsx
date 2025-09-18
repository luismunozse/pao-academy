// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BackToTop from "../components/BackToTop";

export const metadata: Metadata = {
  title: "GLOMIND360",
  description: "Formación práctica para líderes y equipos",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
