import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Roboto } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrimeTech Solutions",
  description: "We build digital experiences that matter.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${roboto.variable} min-h-screen bg-white text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}