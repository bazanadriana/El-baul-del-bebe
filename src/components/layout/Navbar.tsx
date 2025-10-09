import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "./Container";
import LogoElBaul from "../../assets/logo-elbaul.jpg";
import { scrollToId } from "../../lib/scroll";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const nav = [
    { target: "catalogo",  label: "Catálogo" },
    { target: "visitanos", label: "Visítanos" },
    { target: "contacto",  label: "Contáctanos" },
  ];

  const pill =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold " +
    "bg-brand-100 text-brand-700 border border-brand-300 " +
    "shadow-sm hover:bg-brand-100/90 hover:border-brand-400 " +
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300/40";

  return (
    <header className="sticky top-0 z-50 isolate bg-white/90 supports-[backdrop-filter]:bg-white/70 backdrop-blur border-b border-brand-200 relative after:content-[''] after:absolute after:inset-x-0 after:-bottom-px after:h-1 after:bg-gradient-to-r after:from-violet-600 after:to-brand-500">
      <Container>
      <div className="flex h-14 md:h-16 items-center justify-between">
          {/* Brand → button to top section */}
          <button
            type="button"
            onClick={() => scrollToId("inicio")}
            className="group flex items-center gap-2 font-extrabold tracking-tight"
          >
            <img
              src={LogoElBaul}
              alt="El baúl del bebé — logo"
              className="h-9 w-9 rounded-xl object-cover ring-2 ring-violet-300/60 shadow-[0_10px_30px_-10px_rgba(124,58,237,0.35)] transition-transform duration-300 ease-out group-hover:scale-110 group-focus-visible:scale-110"
            />
            <span className="font-logo text-[1.35rem] leading-none text-stone-900 drop-shadow-sm transition-colors group-hover:text-stone-950">
              El baúl del bebé
            </span>
          </button>

          {/* Desktop nav — pill buttons */}
          <nav className="hidden items-center gap-4 md:flex">
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

          {/* Mobile toggle */}
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex items-center rounded-lg p-2 text-stone-800 hover:bg-brand-100 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden">
            <nav className="space-y-2 pb-4">
              {nav.map((n) => (
                <button
                  key={n.target}
                  type="button"
                  onClick={() => {
                    scrollToId(n.target);
                    setOpen(false);
                  }}
                  className={`${pill} w-full`}
                >
                  {n.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
