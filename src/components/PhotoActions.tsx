import React, { useMemo, useState } from "react";

type Props = {
  imageSrc: string;
  caption?: string;
  whatsappNumber?: string; // e.g. "524432189261"
};

const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

async function toDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  const reader = new FileReader();
  return await new Promise<string>((resolve, reject) => {
    reader.onerror = reject;
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}
function toAbsolute(url: string): string {
  if (!url) return url;
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
  try { return new URL(url, origin).href; } catch { return url; }
}
function cleanText(s: string) {
  return (s || "")
    .trim()
    .normalize("NFC")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\uFFFD/g, "")
    .replace(/\u200B/g, "");
}

export default function PhotoActions({ imageSrc, caption, whatsappNumber }: Props) {
  const [question, setQuestion] = useState("¿Cuánto cuesta?");
  const [answer, setAnswer] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loadingAsk, setLoadingAsk] = useState(false);
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abs = useMemo(() => toAbsolute(imageSrc), [imageSrc]);

  async function imageForAI(): Promise<string> {
    if (!abs) return "";
    if (isLocal && !abs.startsWith("data:")) {
      try { return await toDataUrl(abs); } catch { return abs; }
    }
    return abs;
  }

  async function askPhoto() {
    if (!question.trim()) return;
    setLoadingAsk(true); setAnswer(""); setError(null);
    try {
      const r = await fetch("/.netlify/functions/ask-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: await imageForAI(),
          question: caption ? `${question.trim()} (Producto: ${caption})` : question.trim(),
        }),
      });
      if (!r.ok) throw new Error(`ask-photo ${r.status}`);
      const j = await r.json();
      setAnswer(j.answer || "Lo siento, no pude analizar la foto.");
    } catch (e) {
      setError("No se pudo consultar la imagen (¿corriendo con `netlify dev`?).");
      setAnswer("Lo siento, no pude analizar la foto. Intenta de nuevo.");
      console.error(e);
    } finally {
      setLoadingAsk(false);
    }
  }

  async function genWhatsApp() {
    setLoadingCopy(true); setError(null);
    const fallback = cleanText(
      `¡Hola! Te presentamos nuestros montables para bebé. Perfectos para que tus peques se diviertan a lo grande. Ven y elige tu favorito. ¡Te esperamos!`
    );
    try {
      const r = await fetch("/.netlify/functions/make-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: caption ? `Producto: ${caption}` : "",
          imageUrl: await imageForAI(),
        }),
      });
      if (!r.ok) throw new Error(`make-copy ${r.status}`);
      const j = await r.json();
      openWhatsApp(cleanText(j.text || fallback));
    } catch (e) {
      setError("No se pudo generar el mensaje (revisa funciones/env).");
      console.error(e);
      openWhatsApp(fallback);
    } finally {
      setLoadingCopy(false);
    }
  }

  async function suggestTags() {
    setLoadingTags(true); setTags([]); setError(null);
    try {
      const r = await fetch("/.netlify/functions/photo-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: await imageForAI() }),
      });
      if (!r.ok) throw new Error(`photo-tags ${r.status}`);
      const j = await r.json();
      const t = Array.from(new Set([...(j.tags || []), ...(j.colors || [])])).slice(0, 8);
      setTags(t);
    } catch (e) {
      setError("No se pudieron sugerir etiquetas (revisa funciones/env).");
      console.error(e);
    } finally {
      setLoadingTags(false);
    }
  }

  function openWhatsApp(message: string) {
    const phone = whatsappNumber || "524432189261";
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="mt-4 rounded-2xl border px-4 py-3">
      <p className="mb-2 text-sm font-semibold text-stone-800">Pregúntale a la foto</p>

      <div className="flex gap-2">
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none ring-1 ring-brand-200 focus:ring-brand-400"
          placeholder="¿Qué te gustaría saber?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askPhoto()}
        />
        <button
          onClick={askPhoto}
          disabled={loadingAsk}
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-40"
        >
          {loadingAsk ? "..." : "Preguntar"}
        </button>
      </div>

      {answer && (
        <p className="mt-3 rounded-lg border bg-brand-50 p-3 text-sm text-brand-900">{answer}</p>
      )}
      {error && <p className="mt-2 text-sm font-medium text-brand-700">{error}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={genWhatsApp}
          disabled={loadingCopy}
          className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-brand-50 disabled:opacity-40"
        >
          {loadingCopy ? "Generando..." : "Generar mensaje WhatsApp"}
        </button>

        <button
          onClick={suggestTags}
          disabled={loadingTags}
          className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-brand-50 disabled:opacity-40"
        >
          {loadingTags ? "Analizando..." : "Sugerir etiquetas"}
        </button>
      </div>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-sm text-stone-500">Tags:</span>
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 ring-1 ring-brand-200"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
