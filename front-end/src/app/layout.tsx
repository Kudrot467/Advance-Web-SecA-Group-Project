import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { useEffect, useState } from "react";
import { AuthProvider } from "./utils/Provider/authcontext";
import Navbar from "./Shared/Navbar/page";
import Footer from "./Shared/Footer/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trip Nest",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
  
    <html lang="en"  suppressHydrationWarning={true}>
     
     <body className={inter.className}>
     <div>
      <Navbar/>
     </div>
     <div>
     {children}
     </div>
     <div>
      <Footer/>
     </div>
      </body>  
     </html>
  );
}
