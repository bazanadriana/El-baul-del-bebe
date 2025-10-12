import { Clock, MapPin } from "lucide-react";
import Container from "../components/layout/Container";
import SectionTitle from "../components/common/SectionTitle";

export default function Visitanos() {
  return (
    <section id="visitanos" className="bg-white py-16 sm:py-20">
      <Container>
        <SectionTitle
          kicker="Visítanos"
          title="Nuestro rincón para peques y familias"
          subtitle="Pasa a conocernos, tocar las telas y descubrir nuevas ideas para tu bebé."
        />

        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <div className="card p-6">
            <div className="mb-4 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-brand-700" />
              <h4 className="text-lg font-semibold">Dirección</h4>
            </div>
            <p className="text-stone-700">Calle Ejemplo 123, Colonia Centro, CDMX</p>
            <a
              className="mt-3 inline-block text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
              href="https://maps.google.com/?q=Calle%20Ejemplo%20123%20CDMX"
              target="_blank"
              rel="noreferrer"
            >
              Abrir en Google Maps
            </a>

            <div className="mt-6 flex items-center gap-3">
              <Clock className="h-5 w-5 text-brand-700" />
              <div>
                <h4 className="text-lg font-semibold">Horarios</h4>
                <p className="text-stone-700">Lun–Sáb: 10:00–19:00 · Dom: 11:00–16:00</p>
              </div>
            </div>
          </div>

          <div aria-hidden className="card bg-gradient-to-tr from-brand-100 via-rose-100 to-sky-100 p-6 shadow-inner">
            <div className="grid h-full place-items-center text-8xl">🍼</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
