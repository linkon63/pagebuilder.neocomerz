"use client";

import React, { useState } from "react";
import { uploadImage } from "@/lib/upload";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

export function ImageUpload({ value, onChange }: { value?: string; onChange: (value: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border bg-muted/50 aspect-video">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={clearImage}
              className="p-2 bg-destructive text-destructive-foreground rounded-full hover:scale-110 transition-transform"
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors bg-muted/20">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <Loader2 className="w-8 h-8 mb-3 text-muted-foreground animate-spin" />
            ) : (
              <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
            )}
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground/60">Any image file up to 32MB</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
      
      {error && <p className="text-[10px] text-destructive font-medium">{error}</p>}
    </div>
  );
}
