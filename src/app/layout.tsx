import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "robotstxt.ai - AI Crawler Manager for robots.txt",
  description:
    "Visual robots.txt manager for the AI era. Block or allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and 20+ AI crawlers with one click.",
  keywords: [
    "robots.txt",
    "AI crawler",
    "GPTBot",
    "ClaudeBot",
    "PerplexityBot",
    "Google-Extended",
    "AI bot blocker",
    "robots.txt generator",
  ],
  openGraph: {
    title: "robotstxt.ai - AI Crawler Manager",
    description: "Visual robots.txt manager for the AI era. Control which AI bots can crawl your site.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100 min-h-screen antialiased">{children}</body>
    </html>
  );
}
