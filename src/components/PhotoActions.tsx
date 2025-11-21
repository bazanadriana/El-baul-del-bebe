// src/components/PhotoActions.tsx
import React, { useMemo, useState } from "react";

type Props = {
  imageSrc: string;
  caption?: string;
  /** WhatsApp phone, e.g. "524432189261" */
  whatsappNumber?: string;
};

// Are we running locally?
const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

/** Delay helper */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** fetch JSON with timeout + light retry for 429/5xx */
async function fetchJSON<T>(
  url: string,
  body: unknown,
  opts: { timeout?: number; retries?: number } = {}
): Promise<T> {
  const { timeout = 28000, retries = 1 } = opts;
  let attempt = 0;

  while (true) {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), timeout);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: ac.signal,
      });
      clearTimeout(t);

      if (!res.ok) {
        // retry on common transient errors
        if ((res.status === 429 || res.status >= 500) && attempt < retries) {
          attempt += 1;
          await sleep(600 * attempt); // backoff: 600ms, 1200ms, ...
          continue;
        }
        const text = await res.text().catch(() => "");
        throw new Error(`${url} ${res.status} ${text}`);
      }
      return (await res.json()) as T;
    } catch (err: any) {
      clearTimeout(t);
      // retry on abort/network once
      if ((err?.name === "AbortError" || err?.message?.includes("Network")) && attempt < retries) {
        attempt += 1;
        await sleep(600 * attempt);
        continue;
      }
      throw err;
    }
  }
}

/** Turn a remote image into a data: URL (useful for local dev where the URL isn’t public) */
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

/** Ensure the image URL is absolute (or already data:) so the function/OpenAI can fetch it */
function toAbsolute(url: string): string {
  if (!url) return url;
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost";
  try {
    return new URL(url, origin).href;
  } catch {
    return url;
  }
}

/** Normalize/sanitize text for WhatsApp (avoid weird diamonds �) */
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
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loadingAsk, setLoadingAsk] = useState(false);
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abs = useMemo(() => toAbsolute(imageSrc), [imageSrc]);

  /** Image string to send to functions:
   * - local dev: convert to data: URL so OpenAI can fetch it
   * - prod: use absolute https URL
   */
  async function imageForAI(): Promise<string> {
    if (!abs) return "";
    if (isLocal && !abs.startsWith("data:")) {
      try {
        return await toDataUrl(abs);
      } catch {
        return abs; // fall back
      }
    }
    return abs;
  }

  async function askPhoto() {
    if (!question.trim()) return;
    setLoadingAsk(true);
    setAnswer("");
    setError(null);

    try {
      const payload = {
        imageUrl: await imageForAI(),
        question: caption ? `${question.trim()} (Producto: ${caption})` : question.trim(),
      };
      const j = await fetchJSON<{ answer?: string }>(
        "/.netlify/functions/ask-photo",
        payload,
        { retries: 2 }
      );
      setAnswer(j.answer || "Lo siento, no pude analizar la foto.");
    } catch (e) {
      console.error(e);
      setError(
        "No se pudo consultar la imagen (posible límite o URL no pública)."
      );
      setAnswer("Lo siento, no pude analizar la foto. Intenta de nuevo.");
    } finally {
      setLoadingAsk(false);
    }
  }

  async function genWhatsApp() {
    setLoadingCopy(true);
    setError(null);
    const fallback = cleanText(
      "¡Hola! Tengo algunas preguntas sobre un artículo que vi en la página de tu tienda."
    );

    try {
      const payload = {
        context: caption ? `Producto: ${caption}` : "",
        imageUrl: await imageForAI(),
      };
      const j = await fetchJSON<{ text?: string }>(
        "/.netlify/functions/make-copy",
        payload,
        { retries: 2 }
      );
      openWhatsApp(cleanText(j.text || fallback));
    } catch (e) {
      console.error(e);
      setError("No se pudo generar el mensaje (revisa funciones/env).");
      openWhatsApp(fallback);
    } finally {
      setLoadingCopy(false);
    }
  }

  async function suggestTags() {
    setLoadingTags(true);
    setTags([]);
    setError(null);

    try {
      const payload = { imageUrl: await imageForAI() };
      const j = await fetchJSON<{ tags?: string[]; colors?: string[] }>(
        "/.netlify/functions/photo-tags",
        payload,
        { retries: 2 }
      );
      const t = Array.from(new Set([...(j.tags || []), ...(j.colors || [])])).slice(0, 8);
      setTags(t);
    } catch (e) {
      console.error(e);
      setError("No se pudieron sugerir etiquetas (revisa funciones/env).");
    } finally {
      setLoadingTags(false);
    }
  }

  function openWhatsApp(message: string) {
    const phone = whatsappNumber || "524432189261";
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      phone
    )}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
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
          onKeyDown={(e) => e.key === "Enter" && !loadingAsk && askPhoto()}
          disabled={loadingAsk}
        />
        <button
          type="button"
          onClick={askPhoto}
          disabled={loadingAsk || !abs}
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-40"
        >
          {loadingAsk ? "..." : "Preguntar"}
        </button>
      </div>

      {answer && (
        <p className="mt-3 rounded-lg border bg-brand-50 p-3 text-sm text-brand-900">
          {answer}
        </p>
      )}
      {error && (
        <p className="mt-2 text-sm font-medium text-brand-700">
          {error}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={genWhatsApp}
          disabled={loadingCopy || !abs}
          className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-brand-50 disabled:opacity-40"
        >
          {loadingCopy ? "Generando..." : "Generar mensaje WhatsApp"}
        </button>

        <button
          type="button"
          onClick={suggestTags}
          disabled={loadingTags || !abs}
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
