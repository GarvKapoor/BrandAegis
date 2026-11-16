import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrandAegis AI - Intelligent Multimodal Brand Governance",
  description: "Autonomous co-pilot for enterprise brand fidelity, claim compliance, and multimodal integrity. Hackathon Round 2 Working MVP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased text-slate-900">
        {children}
      </body>
    </html>
  );
}
