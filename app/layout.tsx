import type { Metadata } from "next";
import { Roboto, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "talkingPDF | Home",
  description: "Talk with your pdf for free",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <Providers>
        <body
          className={cn(
            "min-h-screen font-sans antialiased bg-zinc-50",
            inter.className
          )}
        >
          {children}
        </body>
      </Providers>
    </html>
  );
}
