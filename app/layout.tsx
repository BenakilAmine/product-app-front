import '@ant-design/v5-patch-for-react-19';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from '../components/Providers';
import LoadingIndicator from '../components/LoadingIndicator';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Manager",
  description: "Application de gestion de produits avec authentification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} loading`}>
        <div className="loading-indicator" id="loading-indicator"></div>
        <LoadingIndicator>
          <Providers>
            {children}
          </Providers>
        </LoadingIndicator>
      </body>
    </html>
  );
}
