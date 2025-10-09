import { useEffect, useRef, useState } from "react";
import Container from "../components/layout/Container";
import { pillAqua } from "../styles/cta";
import { Star, Book, Phone } from "lucide-react";
import { smoothScrollTo } from "../lib/scroll";

// Images
import hero1 from "../assets/hero-1.jpg";
import hero2 from "../assets/hero-2.jpg";
import hero3 from "../assets/hero-3.jpg";

type Slide = {
  src?: string;
  alt: string;
  caption?: string;
  bg?: string;
};

const slides: Slide[] = [
  { src: hero1, alt: "Ropita de bebé", caption: "Ropa suave y sostenible" },
  { src: hero2, alt: "Juguetes educativos", caption: "Juguetes que inspiran" },
  { src: hero3, alt: "Accesorios y cuidado", caption: "Todo para su cuidado" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // Helper: scroll the viewport to a given slide index
  const scrollToIndex = (i: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const child = vp.children[i] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  // Keep DOM in sync when index changes (e.g., via dots or autoplay)
  useEffect(() => {
    scrollToIndex(index);
  }, [index]);

  // Autoplay once on mount; pause on hover/focus over the carousel
  useEffect(() => {
    const start = () => {
      if (timerRef.current) return;
      timerRef.current = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    };

    const stop = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const vp = viewportRef.current;
    start();
    vp?.addEventListener("mouseenter", stop);
    vp?.addEventListener("mouseleave", start);
    vp?.addEventListener("focusin", stop);
    vp?.addEventListener("focusout", start);

    return () => {
      stop();
      vp?.removeEventListener("mouseenter", stop);
      vp?.removeEventListener("mouseleave", start);
      vp?.removeEventListener("focusin", stop);
      vp?.removeEventListener("focusout", start);
    };
  }, []);

  // Update index when the user manually scrolls / swipes
  const onScroll = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    const w = vp.clientWidth;
    const next = Math.round(vp.scrollLeft / w);
    if (next !== index) setIndex(next);
  };

  const goTo = (i: number) => {
    const total = slides.length;
    const next = (i + total) % total;
    setIndex(next);
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-white" 
      aria-label="Destacados"
    >
      <Container>
        <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          {/* Left column: copy + CTAs */}
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
              {/* was <a href="#catalogo"> */}
              <button className={pillAqua} onClick={() => smoothScrollTo("catalogo")}>
                <Book className="mr-2 h-4 w-4" />
                Ver catálogo
              </button>

              {/* was <a href="#contacto"> */}
              <button className={pillAqua} onClick={() => smoothScrollTo("contacto")}>
                <Phone className="mr-2 h-4 w-4" />
                Contáctanos
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-stone-600">
              <Star className="h-5 w-5 text-brand-700" />
              <p className="text-sm">Marcas responsables • Telas suaves • Juguetes sin tóxicos</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-stone-900/70">
              <span className="inline-flex items-center rounded-full bg-white px-2 py-1">
                ⭐⭐⭐⭐⭐ 4.9/5 clientes felices
              </span>
            </div>
          </div>

          {/* Right column: Carousel */}
          <div
            ref={viewportRef}
            onScroll={onScroll}
            className="
              relative w-full overflow-x-auto overflow-y-hidden rounded-2xl
              ring-1 ring-black/5 shadow-sm
              scroll-smooth
              snap-x snap-mandatory
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
            aria-roledescription="carrusel"
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
                      className={`h-72 w-full md:h-96 bg-gradient-to-br ${s.bg ?? "from-brand-300 via-brand-500 to-emerald-400"}`}
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
              onClick={() => goTo(index - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              ‹
            </button>
            <button
              aria-label="Siguiente"
              onClick={() => goTo(index + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Ir a la diapositiva ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition ${
                    index === i ? "bg-violet-600" : "bg-white/70 ring-1 ring-black/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
