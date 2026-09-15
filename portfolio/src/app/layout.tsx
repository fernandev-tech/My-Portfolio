import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Fernando B Sebastião — Desenvolvedor Frontend",
  description: "Portfólio de Fernando B Sebastião, desenvolvedor frontend.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-body bg-primary text-text-primary`}>
        <Header />
        {children}
      </body>
    </html>
  );
}