import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${sourceSerif4.className} antialiased`}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
