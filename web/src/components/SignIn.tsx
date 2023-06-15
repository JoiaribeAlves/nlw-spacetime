import { User } from "lucide-react";

export default function SignInComponent() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="flex items-center gap-3 text-left hover:text-gray-50 transition-colors"
    >
      <span className="flex w-10 h-10 items-center justify-center rounded-full bg-gray-400">
        <User className="w-5 h-5 text-gray-500" />
      </span>

      <p className="text-sm leading-snug max-w-[140px]">
        <span className="underline">Crie sua conta</span> e salve suas memórias!
      </p>
    </a>
  );
}
