// src/components/common/Carousel.tsx
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type Img = { src: string; alt?: string };

type Props = {
  images: Img[];
  /** Tailwind className for wrapper */
  className?: string;
  /** Aspect ratio for the media box */
  aspectClass?: string; // e.g., "aspect-[4/3]"
  /** Rounded corners class for the visual box */
  radiusClass?: string; // e.g., "rounded-xl"
  /** If true, show small dot indicators */
  showDots?: boolean;
  /** If true, show prev/next buttons */
  showArrows?: boolean;
};

export default function Carousel({
  images,
  className,
  aspectClass = "aspect-[4/3]",
  radiusClass = "rounded-xl",
  showDots = true,
  showArrows = true,
}: Props) {
  const [i, setI] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const n = images.length;
  const clamp = (k: number) => (k + n) % n;

  const go = (k: number) => setI((cur) => clamp(cur + k));
  const goto = (k: number) => setI(clamp(k));

  // Keyboard navigation when focused
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  // Touch swipe
  const onTouchStart: React.TouchEventHandler = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd: React.TouchEventHandler = (e) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    // horizontal swipe w/ a little vertical tolerance
    if (Math.abs(dx) > 30 && Math.abs(dy) < 60) {
      go(dx > 0 ? -1 : 1);
    }
    touch.current = null;
  };

  if (!n) return null;

  return (
    <div
      ref={wrapRef}
      className={clsx("relative select-none outline-none", className)}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Galería de imágenes del producto"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* viewport */}
      <div className="w-full overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full shrink-0">
              {/* gradient placeholder + aspect ratio box */}
              <div
                className={clsx(
                  "relative w-full overflow-hidden",
                  aspectClass,
                  radiusClass,
                  // soft placeholder so it never looks empty
                  "bg-gradient-to-br from-brand-50 via-sky-50 to-emerald-50"
                )}
              >
                <img
                  src={img.src}
                  alt={img.alt ?? `Imagen ${idx + 1}`}
                  className={clsx(
                    "absolute inset-0 h-full w-full object-cover",
                    radiusClass
                  )}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showArrows && n > 1 && (
        <>
          <button
            type="button"
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
            onClick={() => go(-1)}
          >
            <ChevronLeft className="h-5 w-5 text-stone-700" />
          </button>
          <button
            type="button"
            aria-label="Siguiente imagen"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
            onClick={() => go(1)}
          >
            <ChevronRight className="h-5 w-5 text-stone-700" />
          </button>
        </>
      )}

      {showDots && n > 1 && (
        <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Ir a la imagen ${idx + 1}`}
              className={clsx(
                "h-2 w-2 rounded-full ring-1 ring-black/10",
                idx === i ? "bg-white" : "bg-white/60"
              )}
              onClick={() => goto(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
