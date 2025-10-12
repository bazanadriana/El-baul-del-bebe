import { Gift, Leaf, Shirt } from "lucide-react";
import Container from "../components/layout/Container";
import SectionTitle from "../components/common/SectionTitle";
import Badge from "../components/common/Badge";
import { products } from "../data/products";

export default function Catalogo() {
  const categories = [
    { key: "Ropa", label: "Ropa", icon: <Shirt className="h-5 w-5" /> },
    { key: "Juguetes", label: "Juguetes", icon: <Gift className="h-5 w-5" /> },
    { key: "Accesorios", label: "Accesorios", icon: <Leaf className="h-5 w-5" /> },
  ];

  return (
    <section id="catalogo" className="bg-white py-16 sm:py-20">
      <Container>
        <SectionTitle
          kicker="Catálogo"
          title="Ropa, juguetes y accesorios"
          subtitle="Mira algunas de nuestras piezas favoritas. Escríbenos para conocer disponibilidad y tallas."
        />

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <span key={c.key} className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-medium text-stone-700">
              {c.icon}
              {c.label}
            </span>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.id} className="group card overflow-hidden transition hover:shadow-lg">
              <div className="flex items-start gap-4 p-5">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-100 to-stone-100 text-3xl">
                  <span aria-hidden>{p.emoji}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">{p.name}</h3>
                  <p className="mt-1 text-sm text-stone-600">{p.description}</p>
                  {p.badge && (
                    <div className="mt-2">
                      <Badge>{p.badge}</Badge>
                    </div>
                  )}
                  <div className="mt-4">
                    <a href="#contacto" className="text-sm font-semibold text-brand-700 underline-offset-4 hover:underline">
                      Pide información
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
