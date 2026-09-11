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
    "Search the team's desktop apps, web apps, Custom GPTs, and Codex plugins.",
  openGraph: {
    title: "Team App Library",
    description:
      "Search the team's desktop apps, web apps, Custom GPTs, and Codex plugins.",
    images: [
      {
        url: new URL("og.png", normalizedSiteUrl).toString(),
        width: 1200,
        height: 630,
        alt: "Team App Library catalog for apps, Custom GPTs, and Codex plugins",
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
