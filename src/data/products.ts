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
    id: "carreolas",
    name: "Carreolas",
    description:
      "Ligeras, seguras y fáciles de maniobrar. Ideales para paseos diarios y viajes.",
    badge: "0–36 meses",
    images: [
      { src: a("catalogo/carreolas/1.jpg"), alt: "Carreola 1" },
      { src: a("catalogo/carreolas/2.jpg"), alt: "Carreola 2" },
      { src: a("catalogo/carreolas/3.jpg"), alt: "Carreola 3" },
    ],
  },
  

  {
    id: "accesorios-de-bano", 
    name: "Accesorios de baño",
    description:
      "Bañeras (rígidas y plegables), cojines de soporte, orinales y asientos reductores para cada etapa.",
    badge: "Higiene",
    images: [
      { src: a("catalogo/bano/1.jpg"), alt: "Bañera para bebé" },
      { src: a("catalogo/bano/2.jpg"), alt: "Bañera plegable con soporte" },
      { src: a("catalogo/bano/3.jpg"), alt: "Orinales y asientos reductores" },
    ],
  },

  {
    id: "cunitas",
    name: "Cunitas",
    description:
      "Opciones seguras y cómodas: portátiles, de madera y con acabados no tóxicos.",
    badge: "Recién nacidos",
    images: [
      { src: a("catalogo/cunas/1.jpg"), alt: "Cunita portátil 1" },
      { src: a("catalogo/cunas/2.jpg"), alt: "Cunita portátil 2" },
      { src: a("catalogo/cunas/3.jpg"), alt: "Cunita portátil 3" },
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
    id: "silla-alta",
    name: "Silla alta para bebé",
    description:
      "Silla para comer con bandeja desmontable, cinturón y fácil de limpiar.",
    badge: "Alimentación",
    images: [
      { src: a("catalogo/sillas/1.jpg"), alt: "Silla alta para bebé - vista lateral" },
      { src: a("catalogo/sillas/2.jpg"), alt: "Silla alta para bebé - bandeja y asiento" },
      { src: a("catalogo/sillas/3.jpg"), alt: "Silla alta para bebé - detalle" },
    ],
  },

  {
    id: "juegos-de-cuna",
    name: "Juegos de cuna",
    description:
      "Sets de 5 piezas con edredón, sábanas y cojines decorativos para la habitación.",
    badge: "Cama/cuna",
    images: [
      { src: a("catalogo/juegos-cuna/1.jpg"), alt: "Juego de cuna perrito" },
      { src: a("catalogo/juegos-cuna/2.jpg"), alt: "Juego de cuna bosque" },
      { src: a("catalogo/juegos-cuna/3.jpg"), alt: "Juego de cuna elefante" },
    ],
  },
  
  {
    id: "andadores",
    name: "Andadores",
    description:
      "Andadores con charola de juego y altura ajustable para los primeros pasos.",
    badge: "6–18 meses",
    images: [
      { src: a("catalogo/andadores/1.jpg"), alt: "Andador azul" },
      { src: a("catalogo/andadores/2.jpg"), alt: "Andador rosa" },
      { src: a("catalogo/andadores/3.jpg"), alt: "Detalle charola" },
    ],
  },
  
  {
    id: "montables",
    name: "Montables para bebé",
    description:
      "Motos, scooter y correpasillos resistentes para juego activo y seguro.",
    badge: "18–48 meses",
    images: [
      { src: a("catalogo/montables/1.jpg"), alt: "Moto infantil" },
      { src: a("catalogo/montables/2.jpg"), alt: "Scooter infantil" },
      { src: a("catalogo/montables/3.jpg"), alt: "Correpasillos tipo auto" },
    ],
  },
  
  
];
