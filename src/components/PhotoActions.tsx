// src/components/PhotoActions.tsx
import React, { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

type Props = {
  imageSrc: string;
  caption?: string;
  /** WhatsApp phone, e.g. "524432189261" (digits only) */
  whatsappNumber?: string;
};

const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

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

function digitsOnly(phone?: string) {
  return (phone || "").replace(/\D+/g, "");
}

export default function PhotoActions({ imageSrc, caption, whatsappNumber }: Props) {
  const [busy, setBusy] = useState(false);
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

  /** Mobile-safe: navigate immediately using wa.me (no window.open, no async wait) */
  async function handleClick() {
    if (busy) return;
    setBusy(true);

    // fast fallback message (works offline and on mobile)
    const fallback = cleanText(
      `¡Hola! Tengo algunas preguntas sobre el producto${caption ? ` "${caption}"` : ""}.`
    );

    const phone = digitsOnly(whatsappNumber || "524432189261");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(fallback)}`;

    // Navigate immediately in the same tab (Safari/iOS compatible)
    window.location.href = url;

    // Optional: if you later want AI text, you could fire-and-forget here:
    // try {
    //   const payload = { context: caption ? `Producto: ${caption}` : "", imageUrl: await imageForAI() };
    //   navigator.sendBeacon?.(
    //     "/.netlify/functions/make-copy",
    //     new Blob([JSON.stringify(payload)], { type: "application/json" })
    //   );
    // } catch {}

    // We’re navigating away; state change is mostly irrelevant after this line.
    setBusy(false);
  }

  return (
    <div
      className="
        relative mt-4 rounded-2xl border
        px-4 py-3
        bg-gradient-to-br from-white via-white to-brand-50
        ring-1 ring-brand-200
        shadow-[0_10px_25px_-10px_rgba(59,130,246,0.35)]
        before:absolute before:inset-0 before:-z-10 before:rounded-2xl
        before:bg-[radial-gradient(120px_120px_at_10%_10%,rgba(59,130,246,.25),transparent_60%),radial-gradient(150px_150px_at_90%_20%,rgba(14,165,233,.20),transparent_60%)]
        after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl
        after:ring-1 after:ring-inset after:ring-white/60
      "
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600/10">
          <Sparkles className="h-4 w-4 text-brand-700" />
        </span>
        <p className="text-sm font-semibold text-stone-800">
          Contacto por WhatsApp <span className="ml-1 inline-block rounded bg-brand-600/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-700">AI</span>
        </p>
      </div>

      {caption && (
        <p className="mb-3 text-sm text-stone-700">
          <span className="font-medium">Producto:</span> {caption}
        </p>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={busy || !abs}
        className="
          relative inline-flex items-center justify-center gap-2
          rounded-xl border px-3 py-2 text-sm font-semibold
          text-stone-800 bg-white hover:bg-brand-50
          ring-1 ring-brand-300 hover:ring-brand-400
          transition disabled:opacity-40
          shadow-[inset_0_0_0_1px_rgba(59,130,246,0.25),0_8px_20px_-12px_rgba(14,165,233,0.5)]
          before:absolute before:inset-[-1px] before:rounded-[12px]
          before:bg-[conic-gradient(from_180deg_at_50%_50%,rgba(59,130,246,0.35),rgba(14,165,233,0.35),rgba(59,130,246,0.35))]
          before:opacity-0 hover:before:opacity-100 before:transition-opacity
        "
      >
        {busy ? "Abriendo..." : "Generar mensaje WhatsApp"}
      </button>
    </div>
  );
}
