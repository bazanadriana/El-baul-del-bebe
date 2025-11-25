// src/sections/Contacto.tsx
import { Sparkles } from "lucide-react";
import Container from "../components/layout/Container";
import SectionTitle from "../components/common/SectionTitle";
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa6";

type Tile = {
  title: string;
  href?: string;
  kind: "whatsapp" | "facebook" | "instagram" | "email";
};

const tiles: Tile[] = [
  { title: "WhatsApp", href: "https://wa.me/524432189261", kind: "whatsapp" },
  {
    title: "Facebook",
    href: "https://www.facebook.com/share/1B18Aepeam/?mibextid=wwXIfr",
    kind: "facebook",
  },
  { title: "Instagram", href: undefined, kind: "instagram" },
  { title: "Email", href: "mailto:maryang050422@outlook.com", kind: "email" },
];

function tileBg(kind: Tile["kind"]) {
  return kind === "facebook"
    ? "bg-[linear-gradient(135deg,#2EA0FF_0%,#1877F2_100%)]"
    : kind === "instagram"
    ? "bg-[linear-gradient(135deg,#FFDC80_0%,#FCAF45_18%,#F56040_36%,#D62976_54%,#962FBF_72%,#4F5BD5_100%)]"
    : kind === "whatsapp"
    ? "bg-[linear-gradient(135deg,#7BFF7D_0%,#25D366_58%,#0E9F61_100%)]"
    : "bg-[linear-gradient(135deg,#62D4FF_0%,#1E90FF_55%,#0B6BFF_100%)]";
}

function TileIcon({ kind }: { kind: Tile["kind"] }) {
  const iconSize = "h-7 w-7 sm:h-8 sm:w-8";
  if (kind === "facebook")
    return (
      <FaFacebook
        className={`${iconSize} text-white drop-shadow-[0_0_6px_rgba(24,119,242,0.5)]`}
      />
    );
  if (kind === "instagram")
    return (
      <FaInstagram
        className={`${iconSize} text-white drop-shadow-[0_0_6px_rgba(214,41,118,0.5)]`}
      />
    );
  if (kind === "whatsapp")
    return (
      <FaWhatsapp
        className={`${iconSize} text-white drop-shadow-[0_0_6px_rgba(37,211,102,0.5)]`}
      />
    );
  return (
    <FaEnvelope
      className={`${iconSize} text-white drop-shadow-[0_0_6px_rgba(30,144,255,0.5)]`}
    />
  );
}

function TileLink({ t }: { t: Tile }) {
  const base =
    "relative grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-2xl transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]";

  const glossy =
    "pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_35%)]";

  if (!t.href || t.href === "#") {
    return (
      <button
        type="button"
        className="group relative grid place-items-center"
        aria-label={`${t.title} (próximamente)`}
      >
        <div className={`${tileBg(t.kind)} ${base} ring-1 ring-white/20`}>
          <span className={glossy} />
          <TileIcon kind={t.kind} />
        </div>
      </button>
    );
  }

  return (
    <a
      href={t.href}
      target={t.href.startsWith("http") ? "_blank" : undefined}
      rel={t.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative grid place-items-center"
    >
      <div
        className={`${tileBg(t.kind)} ${base} ring-1 ring-white/20 hover:ring-2 hover:ring-brand-200`}
      >
        <span className={glossy} />
        <TileIcon kind={t.kind} />
      </div>
    </a>
  );
}

export default function Contacto() {
  return (
    <section
      id="contacto"
      className="
        relative py-16 sm:py-20 scroll-mt-14 md:scroll-mt-16
        bg-gradient-to-b from-white via-white to-brand-50 overflow-hidden
      "
    >
      {/* AI glow background — unified across all sections */}
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
                Contáctanos
                <Sparkles className="h-4 w-4 text-sky-400 animate-pulse" />
              </span>
            }
            title="¿Hablamos?"
            subtitle="Escríbenos para cotizaciones, tallas, colores o cualquier duda. ¡Estamos para ayudarte!"
            centered
          />

          {/* Shared conic glow behind all contact tiles */}
          <div className="relative mx-auto mt-8 max-w-3xl">
            <div
              aria-hidden
              className="
                pointer-events-none absolute -inset-[2px] -z-10 rounded-3xl
                bg-[conic-gradient(at_50%_50%,rgba(59,130,246,.35),rgba(14,165,233,.35),rgba(16,185,129,.30),rgba(59,130,246,.35))]
                blur-[2px] animate-[spin_10s_linear_infinite]
              "
            />

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-12">
              {tiles.map((t) => (
                <TileLink key={t.title} t={t} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
