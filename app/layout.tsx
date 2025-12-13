import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import GlobalLoadingOverlay from "@/components/GlobalLoading";
import { AppToastContainer } from "@/components/AppToastContainer";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "catatUangku",
  description: "Aplikasi pencatat keuangan pribadi sederhana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <GlobalLoadingOverlay />
          <AppToastContainer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
