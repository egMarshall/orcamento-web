import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./theme/globals.css";
import { cn } from "@/utils/utils";
import ReactQueryProvider from "@/react-query";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Budget App",
  description: "Aplicativo de controle financeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={cn(nunito.className)}>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}
