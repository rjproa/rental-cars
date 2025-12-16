// components/Shared/ImageMagnifier/ImageMagnifier.tsx (versión simple)
"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageMagnifierProps {
  src: string;
  alt: string;
}

export function ImageMagnifier({ src, alt }: ImageMagnifierProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div
      className="relative w-full aspect-square max-h-[200px] flex items-center justify-center bg-transparent rounded-lg overflow-hidden cursor-zoom-in group"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`bg-transparent object-contain p-2 sm:p-4 transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"
          }`}
      />
    </div>
  );
}