import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./ornl-design-tokens.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const normalizedSiteUrl = siteUrl.endsWith("/") ? siteUrl : siteUrl + "/";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(normalizedSiteUrl),
  title: {
    default: "Team App Library",
    template: "%s",
  },
  description:
    "Setup and usage guides for the team's local desktop apps and Codex resources.",
  openGraph: {
    title: "Team App Library",
    description:
      "Install and learn the team's local desktop apps and Codex resources.",
    images: [
      {
        url: new URL("og.png", normalizedSiteUrl).toString(),
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
