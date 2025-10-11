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
      { src: "/catalogo/algodon/1.jpg", alt: "Conjunto algodón orgánico 1" },
      { src: "/catalogo/algodon/2.jpg", alt: "Conjunto algodón orgánico 2" },
      { src: "/catalogo/algodon/3.jpg", alt: "Conjunto algodón orgánico 3" },
    ],
  },
  // ...the rest; each can have its own images
];
