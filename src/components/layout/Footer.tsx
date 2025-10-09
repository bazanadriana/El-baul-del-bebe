// src/components/layout/Footer.tsx
import Container from "./Container";
import LogoElBaul from "../../assets/logo-elbaul.jpg";
import { scrollToId } from "../../lib/scroll";

export default function Footer() {
  const year = new Date().getFullYear();
  const nav = [
    { target: "visitanos", label: "Visítanos" },
    { target: "contacto",  label: "Contáctanos" },
    { target: "catalogo",  label: "Catálogo" },
  ];

  const pill =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold " +
    "bg-brand-100 text-brand-700 border border-brand-300 " +
    "shadow-sm hover:bg-brand-100/90 hover:border-brand-400 " +
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300/40";

  return (
    <footer className="relative z-40 border-t border-brand-200 bg-white/90 supports-[backdrop-filter]:bg-white/70 backdrop-blur py-8 sm:py-10 before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-brand-500 before:to-violet-600">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => scrollToId("inicio")}
            className="group flex items-center gap-3"
          >
            <img
              src={LogoElBaul}
              alt="El baúl del bebé — logo"
              className="h-8 w-8 rounded-xl object-cover ring-2 ring-violet-300/60 shadow-[0_10px_30px_-10px_rgba(124,58,237,0.35)] transition-transform duration-300 ease-out group-hover:scale-110 group-focus-visible:scale-110"
            />
            <div>
              <p className="text-sm font-extrabold tracking-tight text-stone-900">El baúl del bebé</p>
              <p className="text-xs text-stone-600">La ternura también se diseña. © {year}</p>
            </div>
          </button>

          <nav className="flex flex-wrap items-center gap-3 sm:gap-4">
            {nav.map((n) => (
              <button
                key={n.target}
                type="button"
                onClick={() => scrollToId(n.target)}
                className={pill}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
