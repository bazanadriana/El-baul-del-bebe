// src/sections/Features.tsx
import { Heart, Leaf, Shirt, Sparkles } from "lucide-react";
import Container from "../components/layout/Container";
import SectionTitle from "../components/common/SectionTitle";
import Feature from "../components/common/Feature";

export default function Features() {
  return (
    <section
      id="confianza"
      className="
        relative py-16 sm:py-20 overflow-hidden
        bg-gradient-to-b from-white via-white to-brand-50
      "
    >
      {/* AI glow background — same theme as Hero, Catalogo, Contacto, Visitanos */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-0
          [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]
          before:absolute before:inset-[-20%]
          before:animate-[spin_12s_linear_infinite]
          before:bg-[conic-gradient(from_0deg,rgba(59,130,246,0.12),rgba(14,165,233,0.12),rgba(16,185,129,0.10),rgba(59,130,246,0.12))]
          before:blur-3xl before:content-['']
        "
      />

      <Container>
        <div className="relative z-10">
          <SectionTitle
            kicker={
              <span className="inline-flex items-center gap-2">
                Confianza
                <Sparkles className="h-4 w-4 text-sky-400 animate-pulse" />
              </span>
            }
            title="Pequeños detalles que hacen la diferencia"
            subtitle="Seleccionamos con cariño cada prenda y juguete para ofrecer seguridad, comodidad y estilo."
            centered
          />

          {/* Shared conic glow halo behind all three feature cards */}
          <div className="relative mt-10">
            <div
              aria-hidden
              className="
                pointer-events-none absolute -inset-[2px] -z-10 rounded-3xl
                bg-[conic-gradient(at_50%_50%,rgba(59,130,246,.35),rgba(14,165,233,.35),rgba(16,185,129,.30),rgba(59,130,246,.35))]
                blur-[2px] animate-[spin_10s_linear_infinite]
              "
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Feature
                icon={
                  <Heart className="h-6 w-6 text-pink-500 drop-shadow-[0_0_6px_rgba(236,72,153,0.4)]" />
                }
                title="Seguro para bebés"
                text="Materiales libres de BPA y broches sin níquel."
              />

              <Feature
                icon={
                  <Leaf className="h-6 w-6 text-emerald-500 drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
                }
                title="Materiales responsables"
                text="Algodón orgánico y empaques reciclables."
              />

              <Feature
                icon={
                  <Shirt className="h-6 w-6 text-sky-500 drop-shadow-[0_0_6px_rgba(14,165,233,0.4)]" />
                }
                title="Comodidad real"
                text="Telas suaves, lavables y duraderas para el día a día."
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
