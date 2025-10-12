export default function Feature({
    icon,
    title,
    text,
  }: { icon: React.ReactNode; title: string; text: string }) {
    return (
      <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="rounded-xl bg-brand-100 p-2 text-brand-700">{icon}</div>
        <div>
          <h4 className="font-semibold text-stone-900">{title}</h4>
          <p className="text-sm text-stone-600">{text}</p>
        </div>
      </div>
    );
  }
  