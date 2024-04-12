'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "@/redux/provider";
import { ApolloWrapper } from "../(main)/apolloWrapper";
import Footer from "../components/common/nav/footer/footer";
import Navbar from "../components/common/nav/navbar/navbar";
import { SessionProvider } from "next-auth/react";



const inter = Inter({ subsets: ["latin"] });

 const metadata: Metadata = {
  title: "SummitShare",
  description:
    "A pioneering digital platform dedicated to the repatriation of African cultural artifacts. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 mt-24 mx-5 ${inter.className}`}>
 <SessionProvider>

 <ApolloWrapper>
          <Providers>
            <Navbar />
            {children} 
            <Footer/>
            </Providers>
        </ApolloWrapper>

 </SessionProvider>
     
     
      </body>
    </html>
  );
}
