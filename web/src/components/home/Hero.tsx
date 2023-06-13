import Image from "next/image";

import Logo from "../../assets/logo.svg";

export default function HeroComponent() {
  return (
    <div className="space-y-5">
      <Image src={Logo} alt="Logo da NLW Spacetime" />

      <div className="max-w-[420px] space-y-4">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>

        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <a
        href="#"
        className="inline-block uppercase rounded-full bg-green-500 px-5 py-3 font-alt text-sm leading-none text-black hover:bg-green-600 transition-colors"
      >
        Cadastrar lembrança
      </a>
    </div>
  );
}
