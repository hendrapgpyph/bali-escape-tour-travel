"use client";

import { useState } from "react";
import { ImageOff, Palmtree } from "lucide-react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  fallbackText?: string;
}

export function LazyImage({
  src,
  alt = "",
  className = "",
  wrapperClassName = "",
  fallbackText,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`lazy-image-wrapper ${wrapperClassName}`}>
      {/* Skeleton Shimmer Placeholder */}
      {!isLoaded && !hasError && (
        <div className="skeleton-placeholder" aria-hidden="true">
          <div className="skeleton-shimmer" />
          <Palmtree className="skeleton-icon" size={24} />
        </div>
      )}

      {/* Fallback state when image failed to load */}
      {hasError ? (
        <div className="lazy-image-error" role="img" aria-label={alt || "Image preview unavailable"}>
          <ImageOff size={24} />
          <span>{fallbackText || alt || "Image unavailable"}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`lazy-image-element ${isLoaded ? "is-loaded" : "is-loading"} ${className}`}
          {...props}
        />
      )}
    </div>
  );
}
