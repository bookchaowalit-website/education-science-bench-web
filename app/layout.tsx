import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// The font variable sits on <html>: the Reader shell tokens live on :root and read it from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description = "A small experiment notebook for changing one variable and recording an observation. Synthetic curves, no sensor.";

export const metadata: Metadata = {
  metadataBase: new URL("https://science.bookchaowalit.com"),
  title: "Observation Bench — Science notebook",
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Observation Bench", title: "Observation Bench — Science notebook", description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
