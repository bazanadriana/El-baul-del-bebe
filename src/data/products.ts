import type { Product } from "../types";

export const products: Product[] = [
  { id: "ropa-algodon", name: "Conjuntos de algodón orgánico",
    description: "Suaves, hipoalergénicos y lavables a máquina. Ideales para pieles sensibles.",
    badge: "0–12 meses", emoji: "👕", category: "Ropa" },
  { id: "juguete-sensorial", name: "Set sensorial de madera",
    description: "Favorece motricidad fina y estimula la curiosidad con texturas seguras.",
    badge: "+6 meses", emoji: "🧩", category: "Juguetes" },
  { id: "accesorio-muselina", name: "Muselinas multiuso",
    description: "Transpirables, ligeras y perfectas para paseos, siestas y lactancia.",
    badge: "Pack 3 piezas", emoji: "🪄", category: "Accesorios" },
  { id: "ropa-mameluco", name: "Mamelucos estampados",
    description: "Broches libres de níquel y telas resistentes para aventuras diarias.",
    badge: "6–24 meses", emoji: "🧸", category: "Ropa" },
  { id: "juguete-peluche", name: "Peluches abrazables",
    description: "Relleno reciclado y costuras reforzadas. Acompañantes de dulces sueños.",
    badge: "Lavable", emoji: "🐻", category: "Juguetes" },
  { id: "accesorio-gorrito", name: "Gorritos y baberos",
    description: "Set coordinado para proteger del sol y de pequeñas babitas.",
    badge: "Edición colorida", emoji: "🎀", category: "Accesorios" },
];
