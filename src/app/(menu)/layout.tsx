import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2R Fusion Menu",
  description: "Explore our premium dining menu",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className="bg-stone-950 text-stone-100 overflow-x-hidden">
        <div className="min-h-screen flex flex-col">
          {/* Minimal header */}
          <header className="border-b border-amber-900/30 bg-stone-950/50 backdrop-blur-sm px-4 py-3 sticky top-0 z-50">
            <div className="flex items-center justify-center">
              <h1 className="text-sm font-light tracking-widest text-amber-100">
                2R FUSION
              </h1>
            </div>
          </header>
          {/* Main content */}
          <main className="flex-1 w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
