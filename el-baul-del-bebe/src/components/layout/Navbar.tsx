import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "./Container";
import LogoElBaul from "../../assets/logo-elbaul.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "#catalogo", label: "Catálogo" },
    { href: "#visitanos", label: "Visítanos" },
    { href: "#contacto", label: "Contáctanos" },
  ];

  return (
    <header
      className="
        sticky top-0 z-50 isolate
        border-b border-brand-200
        bg-brand-100/90 supports-[backdrop-filter]:bg-brand-100/70
        backdrop-blur
      "
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <a href="#inicio" className="flex items-center gap-2 font-extrabold tracking-tight">
            <img
              src={LogoElBaul}
              alt="El baúl del bebé — logo"
              className="h-8 w-8 rounded-lg object-cover ring-1 ring-black/10 shadow-sm"
            />
            <span className="text-stone-900">El baúl del bebé</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-stone-800 hover:text-stone-900"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex items-center rounded-lg p-2 text-stone-800 hover:bg-brand-200/60 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800/20"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden">
            <nav className="space-y-1 pb-4">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-stone-800 hover:bg-brand-200/60"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
