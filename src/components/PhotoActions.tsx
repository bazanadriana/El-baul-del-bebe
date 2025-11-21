import React, { useMemo, useState } from "react";

type Props = {
  imageSrc: string;            // absolute url or relative (we'll handle)
  caption?: string;            // product name to include in prompts
  whatsappNumber?: string;     // e.g. "524432189261" (no +)
};

const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

/** Convert an image URL into a data URL (works for localhost dev) */
async function toDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  const reader = new FileReader();
  return await new Promise<string>((resolve, reject) => {
    reader.onerror = reject;
    reader.onloadend = () => resolve(reader.result as string); // data:image/jpeg;base64,...
    reader.readAsDataURL(blob);
  });
}

/** Make sure image path is absolute for prod (Netlify) */
function toAbsolute(url: string): string {
  if (!url) return url;
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
  try {
    return new URL(url, origin).href;
  } catch {
    return url;
  }
}

/** Scrub weird glyphs that sometimes appear in WhatsApp text */
function cleanText(s: string) {
  return (s || "")
    .trim()
    .normalize("NFC")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\uFFFD/g, "") // replacement char
    .replace(/\u200B/g, ""); // zero-width space
}

export default function PhotoActions({ imageSrc, caption, whatsappNumber }: Props) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const abs = useMemo(() => toAbsolute(imageSrc), [imageSrc]);

  /** Choose the right payload for the functions (data URL in local dev) */
  async function imageForAI(): Promise<string> {
    if (!abs) return "";
    if (isLocal && !abs.startsWith("data:")) {
      try {
        return await toDataUrl(abs);
      } catch {
        // If conversion fails, still send the absolute URL; server may handle it
        return abs;
      }
    }
    return abs;
  }

  async function askPhoto() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const payload = {
        imageUrl: await imageForAI(),
        question: caption ? `${question.trim()} (Producto: ${caption})` : question.trim(),
      };
      const r = await fetch("/.netlify/functions/ask-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json();
      setAnswer(j.answer || "Lo siento, no pude analizar la foto. Intenta de nuevo.");
    } catch {
      setAnswer("Lo siento, no pude analizar la foto. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function suggestTags() {
    setTags([]);
    try {
      const r = await fetch("/.netlify/functions/photo-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: await imageForAI() }),
      });
      const j = await r.json();
      const t = Array.from(new Set([...(j.tags || []), ...(j.colors || [])])).slice(0, 8);
      setTags(t);
    } catch {
      setTags([]);
    }
  }

  async function genWhatsApp() {
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
      const j = await r.json();
      const text = cleanText(j.text || fallback);
      openWhatsApp(text);
    } catch {
      openWhatsApp(fallback);
    }
  }

  function openWhatsApp(message: string) {
    const phone = whatsappNumber || "524432189261";
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      phone
    )}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="mt-4 rounded-2xl border px-4 py-3">
      <p className="mb-2 text-sm font-semibold text-stone-800">Pregúntale a la foto</p>

      <div className="flex gap-2">
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none ring-1 ring-stone-200 focus:ring-brand-400"
          placeholder="¿Qué te gustaría saber?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") askPhoto();
          }}
        />
        <button
          onClick={askPhoto}
          disabled={loading || !question.trim()}
          className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          {loading ? "..." : "Preguntar"}
        </button>
      </div>

      {answer && (
        <p className="mt-3 rounded-lg border bg-stone-50 p-3 text-sm text-stone-700">
          {answer}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={genWhatsApp}
          className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-stone-50"
        >
          Generar mensaje WhatsApp
        </button>

        <button
          onClick={suggestTags}
          className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-stone-50"
        >
          Sugerir etiquetas
        </button>
      </div>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-sm text-stone-500">Tags:</span>
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
