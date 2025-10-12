import { Gift, Mail, Phone } from "lucide-react";
import Container from "../components/layout/Container";
import SectionTitle from "../components/common/SectionTitle";

export default function Contacto() {
  return (
    <section id="contacto" className="bg-stone-50 py-16 sm:py-20">
      <Container>
        <SectionTitle
          kicker="Contáctanos"
          title="¿Hablamos?"
          subtitle="Escríbenos para cotizaciones, tallas, colores o cualquier duda. ¡Estamos para ayudarte!"
        />

        <div className="grid gap-6 md:grid-cols-3">
          <a href="mailto:hola@elbauldelbebe.mx" className="card flex items-center gap-4 p-5 hover:shadow-md">
            <div className="rounded-xl bg-brand-100 p-2 text-brand-700">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-stone-600">Correo</p>
              <p className="font-semibold">hola@elbauldelbebe.mx</p>
            </div>
          </a>

          <a
            href="https://wa.me/5215555555555?text=Hola%20EL%20BAUL%20DEL%20BEBE!%20Quiero%20m%C3%A1s%20informaci%C3%B3n."
            target="_blank"
            rel="noreferrer"
            className="card flex items-center gap-4 p-5 hover:shadow-md"
          >
            <div className="rounded-xl bg-brand-100 p-2 text-brand-700">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-stone-600">WhatsApp</p>
              <p className="font-semibold">+52 1 55 5555 5555</p>
            </div>
          </a>

          <div className="card flex items-center gap-4 p-5">
            <div className="rounded-xl bg-brand-100 p-2 text-brand-700">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-stone-600">Eventos</p>
              <p className="font-semibold">Mesas de regalo y baby showers</p>
            </div>
          </div>
        </div>

        {/* Mini formulario mailto (sin backend) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget as HTMLFormElement);
            const nombre = String(data.get("nombre") || "");
            const mensaje = encodeURIComponent(String(data.get("mensaje") || ""));
            window.location.href =
              `mailto:hola@elbauldelbebe.mx?subject=Consulta%20de%20${encodeURIComponent(nombre)}&body=${mensaje}`;
          }}
          className="card mx-auto mt-8 max-w-2xl space-y-3 p-6"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" required
                className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none ring-brand-200 placeholder:text-stone-400 focus:ring-2"
                placeholder="Tu nombre" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required
                className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none ring-brand-200 placeholder:text-stone-400 focus:ring-2"
                placeholder="tucorreo@ejemplo.com" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" name="mensaje" rows={4} required
              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none ring-brand-200 placeholder:text-stone-400 focus:ring-2"
              placeholder="Cuéntanos qué estás buscando…" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-brand">Enviar mensaje</button>
          </div>
        </form>
      </Container>
    </section>
  );
}
