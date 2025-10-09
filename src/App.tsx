// src/App.tsx
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./sections/Hero";
import Catalogo from "./sections/Catalogo";
import Features from "./sections/Features";
import Visitanos from "./sections/Visitanos";
import Contacto from "./sections/Contacto";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Keep content clear of the sticky navbar (h-16) */}
      <main className="relative z-[2] pt-16">
        <Hero />
        <Catalogo />
        <Features />
        <Visitanos />
        <Contacto />
      </main>

      <Footer />
    </div>
  );
}
