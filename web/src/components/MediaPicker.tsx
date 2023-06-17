"use client";

import { ChangeEvent, useState } from "react";

export function MediaPickerComponent() {
  const [preview, setPreview] = useState<string | null>(null);

  function onMediaSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    const previewUrl = URL.createObjectURL(files[0]);

    setPreview(previewUrl);
  }

  return (
    <>
      <input
        type="file"
        id="media"
        name="coverUrl"
        accept="image/*"
        className="hidden"
        onChange={onMediaSelected}
      />

      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="rounded-lg w-full aspect-video object-cover"
        />
      )}
    </>
  );
}
