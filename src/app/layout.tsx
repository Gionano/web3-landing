import type { Metadata } from "next";
import { Web3Provider } from "@/components/Web3Provider";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
  title: "ClawdCat | Next-Gen Web3 Asset",
  description: "Mint and trade the future of decentralized finance",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
