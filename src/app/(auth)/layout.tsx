import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Provider } from "../provider/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
