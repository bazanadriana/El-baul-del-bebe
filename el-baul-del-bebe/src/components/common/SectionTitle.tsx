import { Sparkles } from "lucide-react";

export default function SectionTitle({
  kicker,
  title,
  subtitle,
}: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8 text-center">
      {kicker && (
        <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-700">
          <Sparkles className="h-4 w-4" /> {kicker}
        </p>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-stone-600">{subtitle}</p>}
    </div>
  );
}
