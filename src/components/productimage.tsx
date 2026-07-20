"use client";

import { useState } from "react";

import { ImageOff } from "lucide-react";

const FALLBACK_IMG =
  "https://www.shutterstock.com/image-vector/no-image-available-icon-shadow-260nw-2753264483.jpg";

interface ProductImageProps {
  src?: string;
  alt?: string;
}

export default function ProductImage({
  src,
  alt,
}: ProductImageProps) {
  const [imgSrc] = useState<string>(src || FALLBACK_IMG);
  const [failed, setFailed] = useState<boolean>(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-100 text-gray-400">
        <ImageOff size={32} strokeWidth={1.5} />
        <span className="text-xs">No Image Available</span>
      </div>
    );
  }

  return (
    <img
  src={imgSrc}
  alt={alt || "Product image"}
  className="h-full w-full object-cover"
  loading="lazy"
  onError={() => setFailed(true)}
/>
  );
}