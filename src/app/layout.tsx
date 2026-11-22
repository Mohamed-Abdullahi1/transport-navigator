import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Transport Navigator | London Private Hire",
    template: "%s | Transport Navigator",
  },
  description:
    "Book pre-arranged private hire journeys with Transport Navigator. Local journeys, airport transfers and long-distance travel.",
  applicationName: "Transport Navigator",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
