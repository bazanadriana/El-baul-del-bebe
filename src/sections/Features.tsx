import { Heart, Leaf, Shirt } from "lucide-react";
import Container from "../components/layout/Container";
import SectionTitle from "../components/common/SectionTitle";
import Feature from "../components/common/Feature";

export default function Features() {
  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <Container>
        <SectionTitle
          kicker="Confianza"
          title="Pequeños detalles que hacen la diferencia"
          subtitle="Seleccionamos con cariño cada prenda y juguete para ofrecer seguridad, comodidad y estilo."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Feature icon={<Heart className="h-5 w-5" />} title="Seguro para bebés" text="Materiales libres de BPA y broches sin níquel." />
          <Feature icon={<Leaf className="h-5 w-5" />} title="Materiales responsables" text="Algodón orgánico y empaques reciclables." />
          <Feature icon={<Shirt className="h-5 w-5" />} title="Comodidad real" text="Telas suaves, lavables y duraderas para el día a día." />
        </div>
      </Container>
    </section>
  );
}
