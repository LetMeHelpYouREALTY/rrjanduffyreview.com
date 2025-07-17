import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
// Removed: import { sampleProductsReviews } from "@/lib/sample-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Review summary",
  description: "AI summaries of customer reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Removed: const products = sampleProductsReviews;
  return (
    <html lang="en">
      <head>
        <script src="https://em.realscout.com/widgets/realscout-web-components.umd.js" type="module"></script>
        <style>{`
          realscout-simple-search {
            --rs-ss-font-primary-color: #726a6d;
            --rs-ss-searchbar-border-color: #1d6fbd;
            --rs-ss-box-shadow: 0 10px 15px -3px #0000001a;
            --rs-ss-widget-width: 500px !important;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <nav className="flex justify-center gap-8 py-4 border-b mb-8 bg-white shadow-sm">
          <Link className="text-lg font-semibold hover:text-blue-700 transition" href="/">Home</Link>
          <a className="text-lg font-semibold hover:text-blue-700 transition" href="#about">Meet Dr. Jan Duffy</a>
          <a className="text-lg font-semibold hover:text-blue-700 transition" href="#reviews">Client Reviews</a>
          <a className="text-lg font-semibold hover:text-blue-700 transition" href="#neighborhoods">Neighborhoods</a>
          <a className="text-lg font-semibold hover:text-blue-700 transition" href="#offices">Offices</a>
          <a className="text-lg font-semibold hover:text-blue-700 transition" href="#contact">Contact</a>
        </nav>
        <div className="flex justify-center mb-8">
          <realscout-simple-search agent-encoded-id="QWdlbnQtMjI1MDUw"></realscout-simple-search>
        </div>
        <main className="pt-6">{children}</main>
      </body>
    </html>
  );
}
