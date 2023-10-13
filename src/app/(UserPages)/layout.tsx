import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "../UserPagesComponents/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SummitShare",
  // description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          " bg-gray-50 mx-[10px] lg:mx-[30px] mt-20 md:mx-[20px] {inter.className"
        }
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
