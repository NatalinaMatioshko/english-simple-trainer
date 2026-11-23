import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/** Full-screen image viewer (Escape / backdrop / × to close). */
export function ImageLightbox({
  src,
  alt,
  open,
  onClose,
}: {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="l31-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="l31-lightbox-close"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <img
        src={src}
        alt={alt}
        className="l31-lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  );
}
