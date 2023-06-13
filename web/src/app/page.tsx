import { cookies } from "next/headers";

import SignInComponent from "@/components/home/SignIn";
import ProfileComponent from "@/components/home/Profile";
import HeroComponent from "@/components/home/Hero";
import EmptyMemoriesComponent from "@/components/home/EmptyMemories";
import FooterComponent from "@/components/home/Footer";

export default function Home() {
  const isAuthenticated = cookies().has("token");

  return (
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
      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <EmptyMemoriesComponent />
      </div>
    </main>
  );
}
