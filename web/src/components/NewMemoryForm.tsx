"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { Camera } from "lucide-react";

import { api } from "@/lib/api";
import { MediaPickerComponent } from "./MediaPicker";

interface IUploadResponse {
  fileUrl: string;
}

export function NewMemoryForm() {
  const router = useRouter();

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const mediaToUpload = formData.get("coverUrl");

    let coverUrl = "";

    if (mediaToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", mediaToUpload);

      try {
        const uploadResponse = await api.post<IUploadResponse>(
          "/upload",
          uploadFormData
        );

        coverUrl = uploadResponse.data.fileUrl;
      } catch (error) {
        console.error(error);
      }

      const token = Cookie.get("token");

      try {
        await api.post(
          "/memories",
          {
            coverUrl,
            content: formData.get("content"),
            isPublic: formData.get("isPublic"),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <form className="flex h-full flex-col gap-2" onSubmit={handleCreateMemory}>
      <div className="flex items-center gap-4">
        <div>
          <label
            htmlFor="media"
            className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-200 hover:text-gray-100 transition-colors"
          >
            <Camera className="w-4 h-4" />
            Anexar mídia
          </label>
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

      <MediaPickerComponent />

      <textarea
        name="content"
        spellCheck={false}
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        className="flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
      />

      <button
        type="submit"
        className="inline-block self-end uppercase rounded-full bg-green-500 px-5 py-3 font-alt text-sm leading-none text-black hover:bg-green-600 transition-colors"
      >
        Salvar
      </button>
    </form>
  );
}
