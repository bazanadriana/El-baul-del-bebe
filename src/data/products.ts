export type Product = {
  id: string;
  name: string;
  description: string;
  emoji?: string;
  badge?: string;
  images?: { src: string; alt?: string }[];
};

// Helper to resolve files in src/assets with Vite
const a = (p: string) => new URL(`../assets/${p}`, import.meta.url).href;

export const products: Product[] = [
  {
    id: "algodon-organico",
    name: "Conjuntos de algodón orgánico",
    description:
      "Suaves, hipoalergénicos y lavables a máquina. Ideales para pieles sensibles.",
    badge: "0–12 meses",
    images: [
      { src: a("catalogo/algodon/algodon-1.jpg"), alt: "Conjunto algodón orgánico 1" },
      { src: a("catalogo/algodon/algodon-2.jpg"), alt: "Conjunto algodón orgánico 2" },
      { src: a("catalogo/algodon/algodon-3.jpg"), alt: "Conjunto algodón orgánico 3" },
    ],
  },

  {
    id: "set-sensorial-madera",
    name: "Set sensorial de madera",
    description:
      "Favorece motricidad fina y estimula la curiosidad con texturas seguras.",
    badge: "+6 meses",
    images: [
      { src: a("catalogo/madera/1.jpg"), alt: "Set sensorial madera 1" },
      { src: a("catalogo/madera/2.jpg"), alt: "Set sensorial madera 2" },
      { src: a("catalogo/madera/3.jpg"), alt: "Set sensorial madera 3" },
    ],
  },

  {
    id: "muselinas-multiuso",
    name: "Muselinas multiuso",
    description:
      "Transpirables, ligeras y perfectas para paseos, siestas y lactancia.",
    badge: "Pack 3 piezas",
    images: [
      { src: a("catalogo/muselinas/1.jpg"), alt: "Muselinas 1" },
      { src: a("catalogo/muselinas/2.jpg"), alt: "Muselinas 2" },
      { src: a("catalogo/muselinas/3.jpg"), alt: "Muselinas 3" },
    ],
  },

  {
    id: "mamelucos-estampados",
    name: "Mamelucos estampados",
    description:
      "Broches libres de níquel y telas resistentes para aventuras diarias.",
    badge: "6–24 meses",
    images: [
      { src: a("catalogo/mamelucos/1.jpg"), alt: "Mamelucos 1" },
      { src: a("catalogo/mamelucos/2.jpg"), alt: "Mamelucos 2" },
      { src: a("catalogo/mamelucos/3.jpg"), alt: "Mamelucos 3" },
    ],
  },

  {
    id: "peluches-abrazables",
    name: "Peluches abrazables",
    description:
      "Relleno reciclado y costuras reforzadas. Acompañantes de dulces sueños.",
    badge: "Lavable",
    images: [
      { src: a("catalogo/peluches/1.jpg"), alt: "Peluches 1" },
      { src: a("catalogo/peluches/2.jpg"), alt: "Peluches 2" },
      { src: a("catalogo/peluches/3.jpg"), alt: "Peluches 3" },
    ],
  },

  {
    id: "gorritos-baberos",
    name: "Gorritos y baberos",
    description:
      "Set coordinado para proteger del sol y de pequeñas babitas.",
    badge: "Edición colorida",
    images: [
      { src: a("catalogo/algodon/algodon-1.jpg"), alt: "Conjunto algodón orgánico 1" },
      { src: a("catalogo/algodon/algodon-2.jpg"), alt: "Conjunto algodón orgánico 2" },
      { src: a("catalogo/algodon/algodon-3.jpg"), alt: "Conjunto algodón orgánico 3" },
    ],
  },
];
