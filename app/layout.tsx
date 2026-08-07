import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./ornl-design-tokens.css";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Team App Library",
    template: "%s",
  },
  description:
    "Source-based setup and usage guides for the team's Electron desktop apps.",
  openGraph: {
    title: "Team App Library",
    description:
      "Install, update, launch, and learn the team's Electron desktop apps.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Team App Library with Badge Blur, OrgChart Studio, and USA Map Studio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mulish.variable}>{children}</body>
    </html>
  );
}
