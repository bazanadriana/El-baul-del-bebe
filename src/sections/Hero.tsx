import { useEffect, useRef, useState } from "react";
import Container from "../components/layout/Container";
import { pillAqua } from "../styles/cta";
import { Star, Book, Phone } from "lucide-react";

import hero1 from "../assets/hero-1.jpg";
import hero2 from "../assets/hero-2.jpg";
import hero3 from "../assets/hero-3.jpg";
import hero4 from "../assets/hero-4.jpg";
import hero5 from "../assets/hero-5.jpg";
import hero6 from "../assets/hero-6.jpg";

type Slide = { src?: string; alt: string; caption?: string; bg?: string };

const slides: Slide[] = [
  { src: hero1, alt: "Ropita de bebé", caption: "Ropa suave y sostenible" },
  { src: hero2, alt: "Juguetes educativos", caption: "Accesorios y mas" },
  { src: hero5, alt: "Ropa formal infantil", caption: "Vestidos y trajes para ocasiones especiales" },
  { src: hero6, alt: "Accesorios y cuidado", caption: "Todo para su cuidado" },
  { src: hero3, alt: "Accesorios y cuidado", caption: "Todo para su cuidado" },
  { src: hero4, alt: "Accesorios y cuidado", caption: "Todo para su cuidado" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  /** Scroll ONLY the carousel container (never the whole page). */
  const scrollToIndex = (i: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const total = slides.length;
    const next = (i + total) % total;
    const x = next * vp.clientWidth;
    vp.scrollTo({ left: x, behavior: "smooth" });
    setIndex(next);
  };

  /** Keep index in sync if the user swipes the carousel manually. */
  const onScroll = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    const w = vp.clientWidth || 1;
    const next = Math.round(vp.scrollLeft / w);
    if (next !== index) setIndex(next);
  };

  /** Autoplay: runs only when not paused and while the carousel is on screen. */
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      scrollToIndex(index + 1);
    }, 5000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  /** Pause on hover/focus, resume on leave. */
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

  /** Pause autoplay when the carousel is offscreen (prevents any page “jump”). */
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        setPaused((p) => (!visible ? true : p && false)); // pause when hidden; resume only if not hovered
      },
      { root: null, threshold: 0.2 }
    );
    io.observe(vp);
    return () => io.disconnect();
  }, []);

  return (
    <section id="inicio"
    className="relative overflow-hidden bg-white scroll-mt-14 md:scroll-mt-16"
      aria-label="Destacados"
    >
      <Container>
      <div className="grid items-center gap-10 pt-8 pb-16 md:grid-cols-2 md:pt-14 md:pb-24">
          {/* Left column */}
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold tracking-wider text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Hecho con amor para tu bebé
            </p>

            <h1 className="font-logo text-4xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-5xl">
              Todo para los primeros años
              <span className="block text-brand-600">El baúl del bebé</span>
            </h1>

            <p className="mt-4 max-w-xl text-stone-600">
              Ropita cómoda, juguetes seguros y accesorios prácticos. Calidad que abraza, diseños que encantan.
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
              <p className="text-sm">Marcas responsables • Telas suaves • Juguetes lindos</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-ink-900/70">
              <span className="inline-flex items-center rounded-full bg-white px-2 py-1">
                ⭐⭐⭐⭐⭐ 4.9/5 clientes felices
              </span>
            </div>
          </div>

          {/* Right column — Carousel */}
          <div
            ref={viewportRef}
            onScroll={onScroll}
            className="
              relative w-full overflow-x-auto overflow-y-hidden rounded-2xl
              ring-1 ring-black/5 shadow
              snap-x snap-mandatory
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
            aria-roledescription="carousel"
          >
            <div className="flex w-full">
              {slides.map((s, i) => (
                <figure key={i} className="relative min-w-full snap-start" aria-label={`${i + 1} de ${slides.length}`}>
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
                    <div className={`h-72 w-full md:h-96 bg-gradient-to-br ${s.bg ?? "from-brand-300 via-brand-500 to-emerald-400"}`} />
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
                    ${index === i ? "bg-violet-600" : "bg-white/70 ring-1 ring-black/10"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
