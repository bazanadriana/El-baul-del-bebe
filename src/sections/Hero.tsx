// src/sections/Hero.tsx
import { useEffect, useRef, useState } from "react";
import Container from "../components/layout/Container";
import { pillAqua } from "../styles/cta";
import { Star, Book, Phone, Sparkles } from "lucide-react";

import hero1 from "../assets/hero-1.jpg";
import hero11 from "../assets/hero-11.jpg";
import hero111 from "../assets/hero-111.jpg";
import hero1111 from "../assets/hero-1111.jpg";
import hero2 from "../assets/hero-2.jpg";
import hero3 from "../assets/hero-3.jpg";
import hero4 from "../assets/hero-4.jpg";
import hero5 from "../assets/hero-5.jpg";
import hero6 from "../assets/hero-6.jpg";

type Slide = { src?: string; alt: string; caption?: string; bg?: string };

const slides: Slide[] = [
  { src: hero1, alt: "Ropita de bebé", caption: "Ropa suave y sostenible" },
  { src: hero11, alt: "Ropita de bebé", caption: "Ropa suave y sostenible" },
  { src: hero111, alt: "Ropita de bebé", caption: "Ropa suave y sostenible" },
  { src: hero1111, alt: "Ropita de bebé", caption: "Ropa suave y sostenible" },
  {
    src: hero5,
    alt: "Ropa formal infantil",
    caption: "Vestidos y trajes para ocasiones especiales",
  },
  { src: hero2, alt: "Accesorios y cuidado", caption: "Accesorios y mas" },
  { src: hero6, alt: "Accesorios y cuidado", caption: "Todo para su cuidado" },
  { src: hero3, alt: "Accesorios y cuidado", caption: "Todo para su cuidado" },
  { src: hero4, alt: "Accesorios y cuidado", caption: "Todo para su cuidado" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const scrollToIndex = (i: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const total = slides.length;
    const next = (i + total) % total;
    const x = next * vp.clientWidth;
    vp.scrollTo({ left: x, behavior: "smooth" });
    setIndex(next);
  };

  const onScroll = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    const w = vp.clientWidth || 1;
    const next = Math.round(vp.scrollLeft / w);
    if (next !== index) setIndex(next);
  };

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      scrollToIndex(index + 1);
    }, 5000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const pause = () => setPaused(true);
    const resume = () => setPaused(false);
    vp.addEventListener("mouseenter", pause);
    vp.addEventListener("mouseleave", resume);
    vp.addEventListener("focusin", pause);
    vp.addEventListener("focusout", resume);
    return () => {
      vp.removeEventListener("mouseenter", pause);
      vp.removeEventListener("mouseleave", resume);
      vp.removeEventListener("focusin", pause);
      vp.removeEventListener("focusout", resume);
    };
  }, []);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        setPaused((p) => (!visible ? true : p && false));
      },
      { root: null, threshold: 0.2 }
    );
    io.observe(vp);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="inicio"
      aria-label="Destacados"
      className="
        relative overflow-hidden scroll-mt-14 md:scroll-mt-16
        bg-gradient-to-b from-white via-white to-brand-50
      "
    >
      {/* AI glow background layers */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-0
          [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]
          before:absolute before:inset-[-20%] before:animate-[spin_12s_linear_infinite]
          before:bg-[conic-gradient(from_0deg,rgba(59,130,246,0.12),rgba(14,165,233,0.12),rgba(16,185,129,0.10),rgba(59,130,246,0.12))]
          before:blur-3xl before:content-['']
        "
      />

      {/* Soft animated ring covering the hero background */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-0
          flex items-center justify-center
        "
      >
        <div
          className="
            aspect-square w-[180%] max-w-[1400px]
            rounded-full
            border-[2px] border-brand-300/60
            shadow-[0_0_120px_30px_rgba(59,130,246,0.25)]
            bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.28),transparent_65%)]
            opacity-90
            animate-[spin_40s_linear_infinite]
          "
        />
      </div>

      <Container>
        {/* NOTE: z-10 so content is above the ring */}
        <div className="relative z-10 grid items-center gap-10 pt-8 pb-16 md:grid-cols-2 md:pt-14 md:pb-24">
          {/* Left column */}
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-stone-900/90 px-3 py-1 text-xs font-semibold tracking-wider text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_2px_rgba(59,130,246,0.6)]" />
              Hecho con amor para tu bebé
              <Sparkles className="ml-1 h-3.5 w-3.5 text-brand-300" />
            </p>

            <h1 className="font-logo text-4xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-5xl">
              Todo para los primeros años
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-sky-600 to-emerald-600">
                El baúl del bebé
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-stone-600">
              Ropita cómoda, juguetes seguros y accesorios prácticos. Calidad
              que abraza, diseños que encantan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalogo" className={pillAqua}>
                <Book className="mr-2 h-4 w-4" />
                Ver catálogo
              </a>
              <a href="#contacto" className={pillAqua}>
                <Phone className="mr-2 h-4 w-4" />
                Contáctanos
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 text-stone-600">
              <Star className="h-5 w-5 text-brand-700" />
              <p className="text-sm">
                Marcas responsables • Telas suaves • Juguetes lindos
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-ink-900/70">
              <span className="inline-flex items-center rounded-full bg-white px-2 py-1 ring-1 ring-black/5">
                ⭐⭐⭐⭐⭐ 4.9/5 clientes felices
              </span>
            </div>
          </div>

          {/* Right column — Carousel with animated “AI” border */}
          <div className="relative">
            {/* animated conic border */}
            <div
              className="pointer-events-none absolute -inset-[2px] -z-10 rounded-3xl
                            bg-[conic-gradient(at_50%_50%,rgba(59,130,246,.35),rgba(14,165,233,.35),rgba(16,185,129,.30),rgba(59,130,246,.35))]
                            blur-[2px] animate-[spin_10s_linear_infinite]"
            />
            <div
              ref={viewportRef}
              onScroll={onScroll}
              className="
                relative w-full overflow-x-auto overflow-y-hidden rounded-2xl
                ring-1 ring-brand-200/70 shadow-[0_15px_40px_-20px_rgba(14,165,233,0.45)]
                snap-x snap-mandatory bg-white
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              "
              aria-roledescription="carousel"
            >
              <div className="flex w-full">
                {slides.map((s, i) => (
                  <figure
                    key={i}
                    className="relative min-w-full snap-start"
                    aria-label={`${i + 1} de ${slides.length}`}
                  >
                    {s.src ? (
                      <img
                        src={s.src}
                        alt={s.alt}
                        className="h-72 w-full object-cover md:h-96"
                        draggable={false}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    ) : (
                      <div
                        className={`h-72 w-full md:h-96 bg-gradient-to-br ${
                          s.bg ??
                          "from-brand-300 via-brand-500 to-emerald-400"
                        }`}
                      />
                    )}
                    {s.caption && (
                      <figcaption className="absolute bottom-3 left-3 rounded-lg bg-black/40 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                        {s.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>

              {/* Prev / Next */}
              <button
                aria-label="Anterior"
                onClick={() => scrollToIndex(index - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                ‹
              </button>
              <button
                aria-label="Siguiente"
                onClick={() => scrollToIndex(index + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                ›
              </button>

              {/* Dots */}
              <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-2">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    role="button"
                    aria-label={`Ir a la diapositiva ${i + 1}`}
                    onClick={() => scrollToIndex(i)}
                    className={`pointer-events-auto h-2 w-2 rounded-full transition
                      ${
                        index === i
                          ? "bg-violet-600"
                          : "bg-white/70 ring-1 ring-black/10"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
