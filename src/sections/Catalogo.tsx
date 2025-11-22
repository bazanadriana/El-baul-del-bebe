// imports...
import { Gift, Leaf, Shirt, Baby } from "lucide-react";
import Container from "../components/layout/Container";
import SectionTitle from "../components/common/SectionTitle";
import Badge from "../components/common/Badge";
import { products } from "../data/products";
import Carousel from "../components/common/Carousel"; // ✅ re-enabled
import PhotoActions from "../components/PhotoActions";

export default function Catalogo() {
  const categories = [
    { key: "Ropa", label: "Ropa", icon: <Shirt className="h-5 w-5 text-brand-600" /> },
    { key: "Juguetes", label: "Juguetes", icon: <Gift className="h-5 w-5 text-brand-600" /> },
    { key: "Accesorios", label: "Accesorios", icon: <Leaf className="h-5 w-5 text-brand-600" /> },
    { key: "Todo para tu bebé", label: "Todo para tu bebé", icon: <Baby className="h-5 w-5 text-brand-600" /> },
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
    <section id="catalogo" className="relative bg-white py-16 sm:py-20 scroll-mt-14 md:scroll-mt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" />

      <Container>
        <SectionTitle
          kicker="Catálogo"
          title="Ropa, juguetes y accesorios"
          subtitle="Mira algunas de nuestras piezas favoritas. Escríbenos para conocer disponibilidad y tallas."
        />

        {/* Category chips */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {categories.map((c) => (
            <span
              key={c.key}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold
                         bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200
                         hover:bg-brand-100 hover:ring-brand-300 transition"
            >
              {c.icon}
              {c.label}
            </span>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const imgs = (product.images ?? []).map((im) => ({
              src: toAbs(im.src),
              alt: im.alt ?? product.name,
            }));
            const hasImages = imgs.length > 0;

            return (
              <article key={product.id} className="rounded-2xl border p-4 bg-white/80">
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
                    <h3 className="text-lg font-semibold text-stone-900">{product.name}</h3>
                    <p className="mt-1 text-sm text-stone-600">{product.description}</p>

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
                        imageSrc={imgs[0].src} // first image used to craft the message
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
      </Container>
    </section>
  );
}
