export type Product = {
  id: string;
  name: string;
  description: string;
  emoji?: string;
  badge?: string;
  images?: { src: string; alt?: string }[]; // NEW
};

export const products: Product[] = [
  {
    id: "algodon-organico",
    name: "Conjuntos de algodón orgánico",
    description:
      "Suaves, hipoalergénicos y lavables a máquina. Ideales para pieles sensibles.",
    badge: "0–12 meses",
    images: [
      { src: "/catalogo/algodon1.jpg", alt: "Conjunto algodón orgánico 1" },
      { src: "/catalogo/algodon2.jpg", alt: "Conjunto algodón orgánico 2" },
      { src: "/catalogo/algodon3.jpg", alt: "Conjunto algodón orgánico 3" },
    ],
  },

  {
    id: "set-sensorial-madera",
    name: "Set sensorial de madera",
    description: "Favorece motricidad fina y estimula la curiosidad con texturas seguras.",
    badge: "+6 meses",
    images: [
      { src: "/catalogo/madera/1.jpg", alt: "Set sensorial madera 1" },
      { src: "/catalogo/madera/2.jpg", alt: "Set sensorial madera 2" },
      { src: "/catalogo/madera/3.jpg", alt: "Set sensorial madera 3" },
    ],
  },
  {
    id: "muselinas-multiuso",
    name: "Muselinas multiuso",
    description: "Transpirables, ligeras y perfectas para paseos, siestas y lactancia.",
    badge: "Pack 3 piezas",
    images: [
      { src: "/catalogo/muselinas/1.jpg", alt: "Muselinas 1" },
      { src: "/catalogo/muselinas/2.jpg", alt: "Muselinas 2" },
      { src: "/catalogo/muselinas/3.jpg", alt: "Muselinas 3" },
    ],
  },
  {
    id: "mamelucos-estampados",
    name: "Mamelucos estampados",
    description: "Broches libres de níquel y telas resistentes para aventuras diarias.",
    badge: "6–24 meses",
    images: [
      { src: "/catalogo/mamelucos/1.jpg", alt: "Mamelucos 1" },
      { src: "/catalogo/mamelucos/2.jpg", alt: "Mamelucos 2" },
      { src: "/catalogo/mamelucos/3.jpg", alt: "Mamelucos 3" },
    ],
  },
  {
    id: "peluches-abrazables",
    name: "Peluches abrazables",
    description: "Relleno reciclado y costuras reforzadas. Acompañantes de dulces sueños.",
    badge: "Lavable",
    images: [
      { src: "/catalogo/peluches/1.jpg", alt: "Peluches 1" },
      { src: "/catalogo/peluches/2.jpg", alt: "Peluches 2" },
      { src: "/catalogo/peluches/3.jpg", alt: "Peluches 3" },
    ],
  },
  {
    id: "gorritos-baberos",
    name: "Gorritos y baberos",
    description: "Set coordinado para proteger del sol y de pequeñas babitas.",
    badge: "Edición colorida",
    images: [
      { src: "/catalogo/gorritos/1.jpg", alt: "Gorritos y baberos 1" },
      { src: "/catalogo/gorritos/2.jpg", alt: "Gorritos y baberos 2" },
      { src: "/catalogo/gorritos/3.jpg", alt: "Gorritos y baberos 3" },
    ],
  },
  
];

