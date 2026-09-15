import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Top 2 Bottom Facility Solutions — Facility Solutions Made Simple",
    template: "%s | Top 2 Bottom Facility Solutions",
  },
  description:
    "Technology-driven facility services: commercial janitorial, property services, facility maintenance and specialty services — managed end-to-end on the T2B platform.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ivory text-ink antialiased">{children}</body>
    </html>
  );
}
