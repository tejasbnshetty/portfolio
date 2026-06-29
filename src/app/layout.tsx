import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Tejas Shetty — Software Developer",
  description:
    "Software developer based in Canberra. I build backend systems, ship AI integrations, and occasionally publish research.",
  openGraph: {
    title: "Tejas Shetty",
    description: "Software developer based in Canberra, AU.",
    url: "https://tejasshetty.dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable}`}>{children}</body>
    </html>
  );
}