// src/sections/Visitanos.tsx
import { Clock, MapPin, Info, Map, Earth } from "lucide-react";
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
    <section id="visitanos" className="relative bg-white py-16 sm:py-20 scroll-mt-14 md:scroll-mt-16">
      {/* removed background logo layer that caused watermark */}

      <Container>
        <SectionTitle
          kicker="Visítanos"
          title="Nuestro rincón para peques y familias"
          subtitle="Pasa a conocernos, tocar las telas y descubrir nuevas ideas para tu bebé."
        />

        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {/* Left: Address & info */}
          <div className="card p-6">
            <div className="mb-4 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-brand-700" />
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
              <span>Fachada color naranja (junto a la carnicería).</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Clock className="h-5 w-5 text-brand-700" />
              <div>
                <h4 className="text-lg font-semibold">Horarios</h4>
                <p className="text-stone-700">Lun–Sáb: 10:00–15:00 · Dom: 10:00–14:00</p>
              </div>
            </div>
          </div>

          {/* Right: Storefront photo */}
          <div className="card overflow-hidden">
            <img
              src={Storefront}
              alt="Fachada naranja de El baúl del bebé (junto a la carnicería)"
              className="h-[320px] w-full object-cover md:h-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
