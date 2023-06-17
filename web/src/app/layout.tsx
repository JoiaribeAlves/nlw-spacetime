import { cookies } from "next/headers";
import {
  Roboto_Flex as RobotoFlex,
  Bai_Jamjuree as BaiJamjuree,
} from "next/font/google";

import SignInComponent from "@/components/SignIn";
import ProfileComponent from "@/components/Profile";
import HeroComponent from "@/components/Hero";
import FooterComponent from "@/components/Footer";

import "./globals.css";
import React from "react";

const roboto = RobotoFlex({ subsets: ["latin"], variable: "--font-roboto" });
const baiJamjuree = BaiJamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "NLW Spacetime",
  description:
    "Uma cápsula do tempo construída com React, Next JS, Typescript, Tailwindcss",
};

interface IRootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayout) {
  const isAuthenticated = cookies().has("token");

  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid grid-cols-2 min-h-screen">
          {/* left */}
          <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">
            {/* blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 bg-purple-700 opacity-50  rounded-full blur-full"></div>

            {/* stripes */}
            <div className="absolute top-0 right-2 bottom-0 w-2 bg-stripes"></div>

            {isAuthenticated ? <ProfileComponent /> : <SignInComponent />}

            <HeroComponent />

            <FooterComponent />
          </div>

          {/* right */}
          <div className="flex flex-col max-h-screen overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
