import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Duraup | Elite Healthcare, Digital Pharmacy & Clinical AI",
  description: "Experience a seamless digital healthcare ecosystem. From clinical-grade AI diagnostics and online physician consultations to direct, authenticated pharmacy dispatch and wellness protocols.",
  keywords: "healthcare, digital pharmacy, AI diagnostics, online doctor, telehealth, medical consultation, Shilajit, Ashwagandha, wellness protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-background text-slate-800 selection:bg-emerald-500/20 selection:text-emerald-800">
        {children}
      </body>
    </html>
  );
}
