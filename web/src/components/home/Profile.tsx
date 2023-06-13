import Image from "next/image";

import { getUser } from "@/lib/auth";

export default function ProfileComponent() {
  const { name, avatarUrl } = getUser();

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        alt={name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />

      <p className="text-sm leading-snug max-w-[140px]">
        {name}
        <a href="#" className="block text-red-400 hover:text-red-300">
          Quero sair
        </a>
      </p>
    </div>
  );
}
