import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2R Fusion | Gastronomie Premium face à la Mer, Tanger",
  description:
    "Découvrez l&apos;excellence culinaire à 2R Fusion à Tanger, Maroc. Gastronomie premium face à la mer avec une cuisine fusion internationale.",
  keywords: [
    "restaurant",
    "gastronomie",
    "Tanger",
    "Maroc",
    "cuisine fusion",
    "gastronomie premium",
    "face à la mer",
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
    locale: "fr_FR",
    url: "https://2rfusion.com",
    siteName: "2R Fusion",
    title: "2R Fusion | Gastronomie Premium face à la Mer",
    description:
      "Découvrez l&apos;excellence culinaire à 2R Fusion à Tanger, Maroc.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-stone-950 text-stone-100">
        {children}
      </body>
    </html>
  );
}