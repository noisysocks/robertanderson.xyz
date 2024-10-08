import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Robert Anderson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSerif4.className} antialiased bg-bg text-text`}>
        {children}
      </body>
    </html>
  );
}
