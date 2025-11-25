// src/sections/Visitanos.tsx
import { Clock, MapPin, Info, Map, Earth, Sparkles } from "lucide-react";
import Container from "../components/layout/Container";
import SectionTitle from "../components/common/SectionTitle";
import Storefront from "../assets/fachada-elbaul.png";
import { pillAqua } from "../styles/cta";

export default function Visitanos() {
  const LAT = 20.0035;
  const LNG = -101.4122019;

  const mapsPlace = `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`;
  const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

  return (
    <section
      id="visitanos"
      className="
        relative py-16 sm:py-20 scroll-mt-14 md:scroll-mt-16
        bg-gradient-to-b from-white via-white to-brand-50 overflow-hidden
      "
    >
      {/* AI glow background — same theme as Hero/Catálogo/Features */}
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

      {/* Soft animated ring — same global background ring */}
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
        {/* content above animated background */}
        <div className="relative z-10">
          <SectionTitle
            kicker={
              <span className="inline-flex items-center gap-2">
                Visítanos
                <Sparkles className="h-4 w-4 text-sky-400 animate-pulse" />
              </span>
            }
            title="Nuestro rincón para peques y familias"
            subtitle="Pasa a conocernos, tocar las telas y descubrir nuevas ideas para tu bebé."
            centered
          />

          <div className="grid items-stretch gap-8 md:grid-cols-2">
            {/* Left: Address & info */}
            <div
              className="
                relative rounded-3xl border border-brand-100/70 bg-white/80 p-6 shadow-lg
                hover:shadow-[0_0_25px_rgba(14,165,233,0.3)] transition-all
                group overflow-hidden
              "
            >
              {/* subtle animated ring on card hover */}
              <div
                className="pointer-events-none absolute -inset-[2px] -z-10 rounded-3xl
                           bg-[conic-gradient(at_50%_50%,rgba(59,130,246,.25),rgba(14,165,233,.25),rgba(16,185,129,.20),rgba(59,130,246,.25))]
                           blur-[2px] opacity-0 group-hover:opacity-100 animate-[spin_14s_linear_infinite]"
              />

              <div className="mb-4 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-brand-700 drop-shadow-[0_0_6px_rgba(14,165,233,0.4)]" />
                <h4 className="text-lg font-semibold">Dirección</h4>
              </div>

              <p className="text-stone-700">
                1 C. Galeana Sur 2A, Centro, Villa Morelos, Michoacán
                <br />
                <span className="text-stone-600">C.P. 58800</span>
              </p>

              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  className={pillAqua}
                  href={mapsPlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir ubicación en Google Maps"
                >
                  <Earth className="mr-2 h-4 w-4" />
                  Abrir en Google Maps
                </a>
                <a
                  className={pillAqua}
                  href={mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Cómo llegar con Google Maps"
                >
                  <Map className="mr-2 h-4 w-4" />
                  Cómo llegar
                </a>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-sm text-brand-800 ring-1 ring-inset ring-brand-200">
                <Info className="h-4 w-4 text-brand-700" />
                <span>Fachada color naranja (junto a la panadería).</span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Clock className="h-5 w-5 text-brand-700" />
                <div>
                  <h4 className="text-lg font-semibold">Horarios</h4>
                  <p className="text-stone-700">
                    Lun–Sáb: 10:00–15:00 · Dom: 10:00–14:00
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Storefront photo */}
            <div
              className="
                relative overflow-hidden rounded-3xl border border-brand-100/70 shadow-lg
                hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all group
              "
            >
              <div
                className="pointer-events-none absolute -inset-[2px] -z-10 rounded-3xl
                           bg-[conic-gradient(at_50%_50%,rgba(59,130,246,.25),rgba(14,165,233,.25),rgba(16,185,129,.20),rgba(59,130,246,.25))]
                           blur-[2px] opacity-0 group-hover:opacity-100 animate-[spin_18s_linear_infinite]"
              />
              <img
                src={Storefront}
                alt="Fachada naranja de El baúl del bebé (junto a la panadería)"
                className="h-[320px] w-full object-cover md:h-full"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
