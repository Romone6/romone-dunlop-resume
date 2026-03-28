"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ImagePanelProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fallbackSrc?: string;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

const DEFAULT_FALLBACK = "/images/placeholder-card.svg";

export function ImagePanel({
  src,
  alt,
  className,
  imageClassName,
  fallbackSrc = DEFAULT_FALLBACK,
  fill = true,
  sizes = "(max-width: 768px) 100vw, 50vw",
  width = 1200,
  height = 800,
  priority = false,
}: ImagePanelProps) {
  const [resolvedSrc, setResolvedSrc] = useState(src);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50",
        className,
      )}
    >
      <Image
        src={resolvedSrc}
        alt={alt}
        onError={() => setResolvedSrc(fallbackSrc)}
        className={cn("object-cover", imageClassName)}
        fill={fill}
        sizes={sizes}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        priority={priority}
      />
    </div>
  );
}
