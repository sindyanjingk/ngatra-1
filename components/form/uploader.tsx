"use client";

import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function Uploader({
  defaultValue,
  name,
  siteId
}: {
  defaultValue: string | null;
  name: "image" | "logo";
  siteId : string
}) {
  const aspectRatio = name === "image" ? "aspect-video" : "aspect-square";

  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(defaultValue);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    
    if (file.size / 1024 / 1024 > 50) {
      toast.error("File size too big (max 50MB)");
      return;
    }
    if (!file.type.includes("png") && !file.type.includes("jpg") && !file.type.includes("jpeg")) {
      toast.error("Invalid file type (must be .png, .jpg, or .jpeg)");
      return;
    }

    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    if (!file) {
      toast.error("No file selected");
      setIsUploading(false);
      return;
    }
    
    const formData = new FormData();
    formData.append("siteId", siteId);
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setIsUploading(false);  
        throw new Error("Upload failed");
      }
  

      const { url } = await res.json();
      setPreview(url);
      toast.success("Upload successful");
    } catch (error) {
      toast.error("Upload failed");
    }
    setIsUploading(false);
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <label
        htmlFor={`${name}-upload`}
        className={cn(
          "group relative mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50",
          aspectRatio,
          {
            "max-w-screen-md": aspectRatio === "aspect-video",
            "max-w-xs": aspectRatio === "aspect-square",
          },
        )}
      >
        <div
          className="absolute z-[5] h-full w-full rounded-md"
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFileChange(file);
          }}
        />
        <div
          className={`absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
            dragActive ? "border-2 border-black" : ""
          } ${
            preview
              ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md  p-12"
              : "bg-white opacity-100 hover:bg-gray-50  p-12"
          }`}
        >
          <svg
            className="h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M12 12v9"></path>
            <path d="m16 16-4-4-4 4"></path>
          </svg>
          <p className="mt-2 text-center text-sm text-gray-500">
            Drag and drop or click to upload.
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">Max file size: 50MB</p>
        </div>
        {preview && (
          <img src={preview} alt="Preview" className="h-full w-full rounded-md object-cover" />
        )}
      </label>
      <input
        id={`${name}-upload`}
        ref={inputRef}
        name={name}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
      />
      {/* <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Choose File
      </button> */}
      <Button
        type="submit"
      >
        {
          isUploading ?
          <Loader2Icon className="animate-spin" /> :
          "Upload"
        }
      </Button>
    </form>
  );
}

