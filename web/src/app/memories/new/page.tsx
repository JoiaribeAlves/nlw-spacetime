import Link from "next/link";
import { Camera, ChevronLeft } from "lucide-react";

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar para a timeline
      </Link>

      <form className="flex h-full flex-col gap-2">
        <div className="flex items-center gap-4">
          <div>
            <label
              htmlFor="media"
              className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-200 hover:text-gray-100 transition-colors"
            >
              <Camera className="w-4 h-4" />
              Anexar mídia
            </label>
            <input type="file" id="media" className="hidden" />
          </div>

          <div className="flex items-center gap-1.5">
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              value="true"
              className="w-4 h-4 rounded border border-gray-400 bg-gray-700 text-purple-500 focus:ring-0"
            />
            <label
              htmlFor="isPublic"
              className="cursor-pointer text-sm text-gray-200 hover:text-gray-100 transition-colors"
            >
              Tornar memória pública
            </label>
          </div>
        </div>

        <textarea
          name="content"
          spellCheck={false}
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          className="flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        />
      </form>
    </div>
  );
}
