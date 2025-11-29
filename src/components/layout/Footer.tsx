// src/components/layout/Footer.tsx
import Container from "./Container";
import LogoElBaul from "../../assets/logo-elbaul.jpg";
import { scrollToId } from "../../lib/scroll";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        relative z-40 overflow-hidden
        border-t border-brand-200
        bg-gradient-to-b from-white/90 via-white/85 to-brand-50/90
        supports-[backdrop-filter]:backdrop-blur
        py-8 sm:py-10
      "
    >
      {/* top glow bar */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-x-0 top-0 h-1
          bg-gradient-to-r from-brand-500 via-sky-500 to-violet-600
        "
      />

      {/* AI conic glow background */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -z-10
          [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]
          [-webkit-mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]
          before:absolute before:inset-[-25%]
          before:animate-[spin_22s_linear_infinite]
          before:bg-[conic-gradient(from_0deg,rgba(59,130,246,0.10),rgba(14,165,233,0.10),rgba(124,58,237,0.10),rgba(59,130,246,0.10))]
          before:blur-3xl before:content-['']
        "
      />

      <Container>
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <button
            type="button"
            onClick={() => scrollToId("inicio")}
            className="group relative inline-flex items-center gap-3"
            aria-label="Ir al inicio"
          >
            {/* animated halo behind logo — always visible, brighter on hover */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute -inset-2 -z-10 rounded-3xl
                bg-[conic-gradient(at_50%_50%,rgba(59,130,246,.35),rgba(14,165,233,.35),rgba(124,58,237,.35),rgba(59,130,246,.35))]
                blur-[10px] opacity-85 group-hover:opacity-100
                animate-[spin_14s_linear_infinite]
              "
            />
            <img
              src={LogoElBaul}
              alt="El baúl del bebé — logo"
              className="
                h-12 w-12 rounded-2xl object-cover
                ring-2 ring-violet-300/60
                shadow-[0_10px_30px_-10px_rgba(124,58,237,0.35)]
                transition-transform duration-300 ease-out
                group-hover:scale-110 group-focus-visible:scale-110
              "
            />
            <div className="text-left">
              <p className="text-base font-extrabold tracking-tight text-stone-900">
                El baúl del bebé
              </p>
              <p className="text-sm text-stone-600">
                La ternura también se diseña. © {year}
              </p>
            </div>
          </button>
        </div>
      </Container>
    </footer>
  );
}
