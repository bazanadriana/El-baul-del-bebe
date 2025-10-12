import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white py-10">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-stone-900">El baúl del bebé</p>
            <p className="text-sm text-stone-600">
              La ternura también se diseña. © {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#visitanos" className="text-stone-600 hover:text-stone-900">Visítanos</a>
            <a href="#contacto" className="text-stone-600 hover:text-stone-900">Contáctanos</a>
            <a href="#catalogo" className="text-stone-600 hover:text-stone-900">Catálogo</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
