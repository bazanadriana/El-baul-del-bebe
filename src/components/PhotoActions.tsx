// src/components/PhotoActions.tsx
import React, { useMemo, useState } from "react";

type Props = {
  imageSrc: string;
  caption?: string;
  whatsappNumber?: string; // e.g. "524432189261"
};

const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
        if ((res.status === 429 || res.status >= 500) && attempt < retries) {
          attempt += 1;
          await sleep(600 * attempt);
          continue;
        }
        const text = await res.text().catch(() => "");
        throw new Error(`${url} ${res.status} ${text}`);
      }
      return (await res.json()) as T;
    } catch (err: any) {
      clearTimeout(t);
      if ((err?.name === "AbortError" || err?.message?.includes("Network")) && attempt < retries) {
        attempt += 1;
        await sleep(600 * attempt);
        continue;
      }
      throw err;
    }
  }
}

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
  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost";
  try {
    return new URL(url, origin).href;
  } catch {
    return url;
  }
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
  const [loadingCopy, setLoadingCopy] = useState(false);
  const abs = useMemo(() => toAbsolute(imageSrc), [imageSrc]);

  async function imageForAI(): Promise<string> {
    if (!abs) return "";
    if (isLocal && !abs.startsWith("data:")) {
      try {
        return await toDataUrl(abs);
      } catch {
        return abs;
      }
    }
    return abs;
  }

  async function genWhatsApp() {
    setLoadingCopy(true);

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
      // stay silent in UI; still open WhatsApp with fallback
      console.warn("make-copy failed; using fallback message", e);
      openWhatsApp(fallback);
    } finally {
      setLoadingCopy(false);
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
      <p className="mb-2 text-sm font-semibold text-stone-800">Contacto por WhatsApp</p>

      {caption && (
        <p className="mb-3 text-sm text-stone-600">
          <span className="font-medium">Producto:</span> {caption}
        </p>
      )}

      <button
        type="button"
        onClick={genWhatsApp}
        disabled={loadingCopy || !abs}
        className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-brand-50 disabled:opacity-40"
      >
        {loadingCopy ? "Generando..." : "Generar mensaje WhatsApp"}
      </button>
    </div>
  );
}
