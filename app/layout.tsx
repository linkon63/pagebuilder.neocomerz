import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeoComerz Page Builder",
  description: "Build your own page and sell your products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
