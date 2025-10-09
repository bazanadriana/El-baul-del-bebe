import { useEffect, useRef, useState } from "react";
import Container from "../components/layout/Container";
import { pillAqua } from "../styles/cta";
import { Star, Book, Phone } from "lucide-react";

import hero1 from "../assets/hero-1.jpg";
import hero2 from "../assets/hero-2.jpg";
import hero3 from "../assets/hero-3.jpg";

type Slide = { src: string; alt: string; caption?: string; };

const slides: Slide[] = [
  { src: hero1, alt: "Ropita de bebé", caption: "Ropa suave y sostenible" },
  { src: hero2, alt: "Juguetes educativos", caption: "Juguetes que inspiran" },
  { src: hero3, alt: "Accesorios y cuidado", caption: "Todo para su cuidado" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const goTo = (i: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const total = slides.length;
    const next = (i + total) % total;
    const child = vp.children[next] as HTMLElement | undefined;
    if (child) {
      child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setIndex(next);
    }
  };

  // keep index in sync with manual swipe/scroll
  const onScroll = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    const w = vp.clientWidth || 1;
    const next = Math.round(vp.scrollLeft / w);
    if (next !== index) setIndex(next);
  };

  // autoplay that *does not* fight page scroll + honors reduced motion & tab visibility
  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;                 // disable autoplay

    const stop = () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
    const start = () => {
      stop();
      if (paused || document.hidden) return;
      timerRef.current = window.setInterval(() => goTo(index + 1), 5000);
    };

    start();

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const vp = viewportRef.current;
    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);

    vp?.addEventListener("mouseenter", onEnter);
    vp?.addEventListener("mouseleave", onLeave);
    vp?.addEventListener("touchstart", onEnter, { passive: true });
    vp?.addEventListener("touchend", onLeave, { passive: true });

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      vp?.removeEventListener("mouseenter", onEnter);
      vp?.removeEventListener("mouseleave", onLeave);
      vp?.removeEventListener("touchstart", onEnter);
      vp?.removeEventListener("touchend", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white" aria-label="Destacados">
      <Container>
        <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          {/* left column (unchanged copy/buttons) */}
          {/* ... */}

          {/* Right column — improved carousel container */}
          <div
            ref={viewportRef}
            onScroll={onScroll}
            aria-roledescription="carrusel"
            className="
              relative w-full overflow-x-auto overflow-y-hidden
              snap-x snap-mandatory scroll-smooth
              overscroll-x-contain touch-pan-y
              rounded-2xl ring-1 ring-black/5 shadow-pop
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex w-full">
              {slides.map((s, i) => (
                <figure key={i} className="relative min-w-full snap-start" aria-label={`${i + 1} de ${slides.length}`}>
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="h-72 w-full object-cover md:h-96"
                    draggable={false}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  {s.caption && (
                    <figcaption className="absolute bottom-3 left-3 rounded-lg bg-black/40 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                      {s.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>

            {/* controls & dots unchanged, but ensure 44px min via padding */}
            <button
              aria-label="Anterior"
              onClick={() => goTo(index - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              ‹
            </button>
            <button
              aria-label="Siguiente"
              onClick={() => goTo(index + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              ›
            </button>

            <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  role="button"
                  aria-label={`Ir a la diapositiva ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`pointer-events-auto h-2 w-2 rounded-full transition ${index === i ? "bg-violet-600" : "bg-white/70 ring-1 ring-black/10"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
