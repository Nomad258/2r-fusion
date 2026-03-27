import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2R Fusion | Premium Beachfront Dining, Tangier",
  description:
    "Experience culinary excellence at 2R Fusion in Tangier, Morocco. Premium beachfront dining with international fusion cuisine.",
  keywords: [
    "restaurant",
    "dining",
    "Tangier",
    "Morocco",
    "fusion cuisine",
    "premium dining",
    "beachfront",
  ],
  authors: [{ name: "2R Fusion" }],
  creator: "2R Fusion",
  publisher: "2R Fusion",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://2rfusion.com",
    siteName: "2R Fusion",
    title: "2R Fusion | Premium Beachfront Dining",
    description:
      "Experience culinary excellence at 2R Fusion in Tangier, Morocco.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-950 text-stone-100">
        {children}
      </body>
    </html>
  );
}
