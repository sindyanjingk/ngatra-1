import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

const title = "Ngatra Panel – Your SMM Solutions";
const description =
  "Ngatra Panel offers seamless multi-tenant management for payment and service transactions. Built with the latest technology for reliability and scalability.";
const image = "https://app.ngatrapanel.my.id/ngatra-logo.svg";

export const metadata: Metadata = {
  title,
  description,
  icons: ["https://yourdomain.com/favicon.ico"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@yourhandle",
  },
  metadataBase: new URL("https://app.ngatrapanel.my.id/ngatra-logo.svg"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{ backgroundColor: "#1A202C" }} // Updated primary background color
        className={cn(
          "min-h-screen text-white antialiased"
        )}
      >
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}