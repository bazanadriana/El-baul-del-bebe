// src/sections/Catalogo.tsx
import { Gift, Leaf, Shirt, Baby, Sparkles } from "lucide-react";
import Container from "../components/layout/Container";
import SectionTitle from "../components/common/SectionTitle";
import Badge from "../components/common/Badge";
import { products } from "../data/products";
import Carousel from "../components/common/Carousel";
import PhotoActions from "../components/PhotoActions";

export default function Catalogo() {
  const categories = [
    { key: "Ropa", label: "Ropa", icon: <Shirt className="h-5 w-5 text-brand-600" /> },
    { key: "Juguetes", label: "Juguetes", icon: <Gift className="h-5 w-5 text-brand-600" /> },
    { key: "Accesorios", label: "Accesorios", icon: <Leaf className="h-5 w-5 text-brand-600" /> },
    {
      key: "Todo para tu bebé",
      label: "Todo para tu bebé",
      icon: <Baby className="h-5 w-5 text-brand-600" />,
    },
  ];

  const toAbs = (u?: string) => {
    if (!u) return "";
    if (/^https?:\/\//i.test(u) || u.startsWith("data:")) return u;
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "http://localhost";
      return new URL(u, origin).href;
    } catch {
      return u;
    }
  };

  return (
    <section
      id="catalogo"
      className="
        relative py-16 sm:py-20 scroll-mt-14 md:scroll-mt-16
        bg-gradient-to-b from-white via-white to-brand-50 overflow-hidden
      "
    >
      {/* AI glow background layers – same as Hero */}
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

      {/* Soft animated ring – same as Hero */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-0
          flex items-center justify-center
        "
      >
        <div
          className="
            aspect-square w-[150%] max-w-[1200px]
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
        {/* lift content above background animations */}
        <div className="relative z-10">
          <SectionTitle
            kicker={
              <span className="inline-flex items-center gap-2">
                Catálogo
                <Sparkles className="h-4 w-4 text-sky-400 animate-pulse" />
              </span>
            }
            title="Ropa, juguetes y accesorios"
            subtitle="Mira algunas de nuestras piezas favoritas. Escríbenos para conocer disponibilidad y tallas."
          />

          {/* Category chips */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            {categories.map((c) => (
              <span
                key={c.key}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold
                           bg-gradient-to-r from-sky-50 via-brand-50 to-emerald-50
                           text-brand-700 ring-1 ring-inset ring-brand-200
                           hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:bg-white transition"
              >
                {c.icon}
                {c.label}
              </span>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const imgs = (product.images ?? []).map((im) => ({
                src: toAbs(im.src),
                alt: im.alt ?? product.name,
              }));
              const hasImages = imgs.length > 0;

              return (
                <article
                  key={product.id}
                  className="
                    relative rounded-3xl border border-brand-100/70 bg-white/80 p-4 shadow-lg
                    hover:shadow-[0_0_25px_rgba(14,165,233,0.3)] transition-all
                    group
                  "
                >
                  {/* animated AI border */}
                  <div
                    className="pointer-events-none absolute -inset-[2px] -z-10 rounded-3xl
                               bg-[conic-gradient(at_50%_50%,rgba(59,130,246,.25),rgba(14,165,233,.25),rgba(16,185,129,.20),rgba(59,130,246,.25))]
                               blur-[2px] opacity-0 group-hover:opacity-100 animate-[spin_12s_linear_infinite]"
                  />

                  {/* Cover: Carousel or emoji fallback */}
                  {hasImages ? (
                    <Carousel
                      images={imgs}
                      className="mb-3"
                      aspectClass="aspect-[4/3]"
                      radiusClass="rounded-xl"
                      showDots
                      showArrows
                    />
                  ) : (
                    <div className="mb-3 grid aspect-[4/3] w-full place-items-center rounded-xl bg-gradient-to-br from-brand-100 to-stone-100 text-5xl">
                      <span aria-hidden>{product.emoji ?? "🧸"}</span>
                    </div>
                  )}

                  {/* Body */}
                  <div className="flex items-start gap-4">
                    <div className="w-full">
                      <h3 className="text-lg font-semibold text-stone-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-stone-600">
                        {product.description}
                      </p>

                      {product.badge && (
                        <div className="mt-2">
                          <Badge>{product.badge}</Badge>
                        </div>
                      )}

                      <div className="mt-4">
                        <a
                          href="#contacto"
                          className="text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
                        >
                          Pide información
                        </a>
                      </div>

                      {/* WhatsApp only */}
                      {hasImages && (
                        <PhotoActions
                          imageSrc={imgs[0].src}
                          caption={product.name}
                          whatsappNumber="524432189261"
                        />
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
