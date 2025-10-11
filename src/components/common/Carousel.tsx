import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt?: string };
type Props = {
  slides: Slide[];
  aspect?: string; // e.g. "aspect-[4/3]" | "aspect-square"
  rounded?: string; // e.g. "rounded-2xl"
  autoMs?: number | null; // e.g. 5000; null = no auto
};

export default function Carousel({
  slides,
  aspect = "aspect-[4/3]",
  rounded = "rounded-2xl",
  autoMs = 5000,
}: Props) {
  const [i, setI] = useState(0);
  const wrap = (n: number) => (n + slides.length) % slides.length;
  const go = (n: number) => setI((cur) => wrap(cur + n));
  const jump = (n: number) => setI(wrap(n));

  // auto-advance
  useEffect(() => {
    if (!autoMs) return;
    const t = setInterval(() => go(1), autoMs);
    return () => clearInterval(t);
  }, [autoMs]);

  // swipe
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const onMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 60) {
        go(dx > 0 ? -1 : 1);
        startX = e.touches[0].clientX + (dx > 0 ? 1000 : -1000); // prevent multi-fires
      }
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
    };
  }, []);

  if (!slides?.length) return null;

  return (
    <div className={`relative overflow-hidden ${rounded} bg-stone-100`} ref={ref} aria-roledescription="carousel">
      <div className={`${aspect} w-full`} />
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${i * 100}%)` }}
      >
        {slides.map((s, idx) => (
          <img
            key={idx}
            src={s.src}
            alt={s.alt ?? `Slide ${idx + 1}`}
            className="h-full w-full shrink-0 object-cover"
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>

      {/* controls */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-white/80 p-1.5 ring-1 ring-stone-200 hover:bg-white"
        onClick={() => go(-1)}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-white/80 p-1.5 ring-1 ring-stone-200 hover:bg-white"
        onClick={() => go(1)}
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* dots */}
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => jump(idx)}
            className={`h-2.5 w-2.5 rounded-full ring-1 ring-white/60 ${
              idx === i ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
