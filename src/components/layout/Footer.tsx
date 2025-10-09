import Container from "./Container";
import LogoElBaul from "../../assets/logo-elbaul.jpg";
import { scrollToId } from "../../lib/scroll";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-40 border-t border-brand-200 bg-white/90 supports-[backdrop-filter]:bg-white/70 backdrop-blur py-8 sm:py-10 before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-brand-500 before:to-violet-600">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <button
            type="button"
            onClick={() => scrollToId("inicio")}
            className="group inline-flex items-center gap-3"
            aria-label="Ir al inicio"
          >
            <img
              src={LogoElBaul}
              alt="El baúl del bebé — logo"
              className="h-12 w-12 rounded-2xl object-cover ring-2 ring-violet-300/60 shadow-[0_10px_30px_-10px_rgba(124,58,237,0.35)] transition-transform duration-300 ease-out group-hover:scale-110 group-focus-visible:scale-110"
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
