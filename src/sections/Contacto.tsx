import Container from "../components/layout/Container";
import SectionTitle from "../components/common/SectionTitle";
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa6";

type Tile = {
  title: string;
  href?: string; // if missing or '#', we'll render a button (no navigation)
  kind: "whatsapp" | "facebook" | "instagram" | "email";
};

const tiles: Tile[] = [
  { title: "WhatsApp",  href: "https://wa.me/524432189261", kind: "whatsapp" },
  { title: "Facebook",  href: "https://www.facebook.com/share/1B18Aepeam/?mibextid=wwXIfr", kind: "facebook" },
  { title: "Instagram", href: undefined,                     kind: "instagram" }, // placeholder: no jump
  { title: "Email",     href: "mailto:maryang050422@outlook.com", kind: "email" },
];

function tileBg(kind: Tile["kind"]) {
  return kind === "facebook"
    ? "bg-[linear-gradient(135deg,#2EA0FF_0%,#1877F2_100%)]"
    : kind === "instagram"
    ? "bg-[linear-gradient(135deg,#FFDC80_0%,#FCAF45_18%,#F56040_36%,#D62976_54%,#962FBF_72%,#4F5BD5_100%)]"
    : kind === "whatsapp"
    ? "bg-[linear-gradient(135deg,#7BFF7D_0%,#25D366_58%,#0E9F61_100%)]"
    : "bg-[linear-gradient(135deg,#62D4FF_0%,#1E90FF_55%,#0B6BFF_100%)]"; // email
}

function TileIcon({ kind }: { kind: Tile["kind"] }) {
  const iconSize = "h-7 w-7 sm:h-8 sm:w-8";
  if (kind === "facebook")  return <FaFacebook  className={`${iconSize} text-white drop-shadow-[0_0_1px_rgba(0,0,0,0.25)]`} />;
  if (kind === "instagram") return <FaInstagram className={`${iconSize} text-white drop-shadow-[0_0_1px_rgba(0,0,0,0.25)]`} />;
  if (kind === "whatsapp")  return <FaWhatsapp  className={`${iconSize} text-white drop-shadow-[0_0_1px_rgba(0,0,0,0.25)]`} />;
  return <FaEnvelope className={`${iconSize} text-white drop-shadow-[0_0_1px_rgba(0,0,0,0.25)]`} />;
}

function TileLink({ t }: { t: Tile }) {
  const base =
    "relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl " +
    "ring-1 ring-black/10 shadow-[0_6px_14px_rgba(0,0,0,0.15)] " +
    "transition-[transform,box-shadow,ring-width,ring-color] duration-200 " +
    "group-hover:scale-105 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.18)] group-hover:ring-2 group-hover:ring-brand-300";

  const glossy = "pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_35%)]";

  // If there is no usable href, render a button to avoid hash navigation
  if (!t.href || t.href === "#") {
    return (
      <button type="button" className="group grid place-items-center" aria-label={`${t.title} (próximamente)`}>
        <div className={`${tileBg(t.kind)} ${base}`}>
          <span className={glossy} />
          <TileIcon kind={t.kind} />
        </div>
      </button>
    );
  }

  // Prevent re-targeting to the same hash (which can cause a jump)
  const onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    try {
      const url = new URL(t.href!, window.location.href);
      const hash = url.hash || (t.href!.startsWith("#") ? t.href! : "");
      if (hash && hash === window.location.hash) e.preventDefault();
    } catch {
      // Non-URL (mailto/tel) will throw; ignore
    }
  };

  return (
    <a
      href={t.href}
      onClick={onClick}
      className="group grid place-items-center"
      target={t.href.startsWith("http") ? "_blank" : undefined}
      rel={t.href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <div className={`${tileBg(t.kind)} ${base}`}>
        <span className={glossy} />
        <TileIcon kind={t.kind} />
      </div>
    </a>
  );
}

export default function Contacto() {
  return (
    <section id="contacto" className="relative bg-white py-16 sm:py-20 scroll-mt-14 md:scroll-mt-16">
      <Container>
        <SectionTitle
          kicker="Contáctanos"
          title="¿Hablamos?"
          subtitle="Escríbenos para cotizaciones, tallas, colores o cualquier duda. ¡Estamos para ayudarte!"
        />
        <div className="relative mx-auto grid max-w-3xl grid-cols-4 gap-10 sm:gap-12">
          {tiles.map((t) => (
            <TileLink key={t.title} t={t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
