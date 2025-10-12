import Container from "../components/layout/Container";
import { Star } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-white">
      <Container>
        <div className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold tracking-wider text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Hecho con amor para tu bebé
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-5xl">
              Todo para los primeros años
              <span className="block text-brand-600">EL BAUL DEL BEBE</span>
            </h1>
            <p className="mt-4 max-w-xl text-stone-600">
              Ropita cómoda, juguetes seguros y accesorios prácticos. Calidad que abraza, diseños que encantan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalogo" className="btn-brand">Ver catálogo</a>
              <a href="#contacto" className="btn-outline">Contáctanos</a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-stone-600">
              <Star className="h-5 w-5 text-brand-600" />
              <p className="text-sm">Marcas responsables • Telas suaves • Juguetes sin tóxicos</p>
            </div>
          </div>

          <div aria-hidden className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-tr from-brand-100 via-amber-100 to-rose-100 shadow-inner">
            <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-white/60 blur-2xl" />
            <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/50 blur-2xl" />
            <div className="absolute inset-0 grid place-items-center text-7xl">🧸</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
