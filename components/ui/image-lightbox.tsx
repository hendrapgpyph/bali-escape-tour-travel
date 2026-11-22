"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    title?: string;
    description?: string;
  } | null;
}

export function ImageLightbox({ isOpen, onClose, image }: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close image preview"
          type="button"
        >
          <X size={20} />
        </button>
        <div className="lightbox-image-wrap">
          <img
            src={image.src}
            alt={image.title || "Preview"}
            className="lightbox-img"
          />
        </div>
        {(image.title || image.description) && (
          <div className="lightbox-caption">
            {image.title && <h4>{image.title}</h4>}
            {image.description && <p>{image.description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
