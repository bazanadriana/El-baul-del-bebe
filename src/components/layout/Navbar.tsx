// src/components/layout/Navbar.tsx
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import Container from "./Container";
import LogoElBaul from "../../assets/logo-elbaul.jpg";
import { scrollToId } from "../../lib/scroll";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nav = [
    { target: "catalogo", label: "Catálogo" },
    { target: "visitanos", label: "Visítanos" },
    { target: "contacto", label: "Contáctanos" },
  ];

  const pill =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition-all " +
    "bg-brand-100/80 text-brand-700 border border-brand-300 shadow-sm hover:bg-brand-100/95 hover:border-brand-400 " +
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300/40 hover:shadow-[0_0_15px_rgba(14,165,233,0.25)]";

  return (
    <header
      className="
        sticky top-0 z-50 isolate overflow-hidden
        border-b border-brand-200
        bg-gradient-to-b from-white/90 via-white/80 to-brand-50/80
        supports-[backdrop-filter]:backdrop-blur
      "
    >
      {/* Animated conic halo background (desktop + mobile, Safari-safe) */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -z-10
          [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]
          [-webkit-mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]
          before:absolute before:inset-[-25%]
          before:animate-[spin_24s_linear_infinite]
          before:bg-[conic-gradient(from_0deg,rgba(59,130,246,0.08),rgba(14,165,233,0.08),rgba(124,58,237,0.08),rgba(59,130,246,0.08))]
          before:blur-3xl before:content-['']
        "
      />

      {/* Top gradient line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-sky-500 to-brand-500"
      />

      <Container>
        <div className="flex h-14 md:h-16 items-center justify-between">
          {/* Brand */}
          <button
            type="button"
            onClick={() => scrollToId("inicio")}
            className="group relative flex items-center gap-2 font-extrabold tracking-tight"
            aria-label="Ir al inicio"
          >
            {/* halo behind logo — ALWAYS visible (stronger on hover) */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute -inset-2 -z-10 rounded-2xl
                bg-[conic-gradient(at_50%_50%,rgba(59,130,246,.35),rgba(14,165,233,.35),rgba(124,58,237,.35),rgba(59,130,246,.35))]
                blur-[10px] opacity-85 group-hover:opacity-100 animate-[spin_18s_linear_infinite]
              "
            />
            <img
              src={LogoElBaul}
              alt="El baúl del bebé — logo"
              className="
                h-9 w-9 rounded-xl object-cover
                ring-2 ring-violet-300/60 shadow-[0_10px_30px_-10px_rgba(124,58,237,0.35)]
                transition-transform duration-300 ease-out
                group-hover:scale-110 group-focus-visible:scale-110
              "
            />
            <span className="font-logo text-[1.35rem] leading-none text-stone-900 drop-shadow-sm transition-colors group-hover:text-stone-950">
              El baúl del bebé
            </span>
          </button>

          {/* Desktop nav */}
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
            className="
              inline-flex items-center rounded-lg p-2 text-stone-800 hover:bg-brand-100
              md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400
            "
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-6 w-6 text-brand-700" />
            ) : (
              <Menu className="h-6 w-6 text-brand-700" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-2">
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

      {/* Sparkles accent (desktop only) */}
      <div
        aria-hidden
        className="
          absolute right-4 top-1/2 hidden md:flex items-center gap-1 text-sky-400 animate-pulse
        "
      >
        <Sparkles className="h-4 w-4" />
      </div>
    </header>
  );
}
