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
      {/* AI glow background — same as Hero & Catalogo */}
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

      {/* Soft animated ring — same theme */}
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
        {/* bring real content above background */}
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
      </Container>
    </section>
  );
}
