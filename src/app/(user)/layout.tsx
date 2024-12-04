import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ToolMeister Hardware",
  description: "Your one stop shop for all your hardware needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>
        <Header />
        {children}
        <Sidebar />
        <Footer />
        <Toaster position="bottom-right" toastOptions={
          {
            style: {
              background: "#333",
              color: "#fff",
            },
          }
        }/>
        </Layout>
      </body>
    </html>
  );
}
