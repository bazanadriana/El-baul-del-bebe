import React, { useState } from "react";

type Props = {
  imageSrc: string;         // absolute or vite-resolved URL
  caption?: string;
  whatsappNumber?: string;  // e.g., "524432189261"
};

export default function PhotoActions({ imageSrc, caption, whatsappNumber = "524432189261" }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[] | null>(null);

  const askPhoto = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    try {
      const r = await fetch("/.netlify/functions/ask-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: imageSrc, question }),
      });
      const data = await r.json();
      setAnswer(data.answer);
    } catch {
      setAnswer("Lo siento, no pude analizar la foto. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const getTags = async () => {
    setLoading(true);
    try {
      const r = await fetch("/.netlify/functions/photo-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: imageSrc }),
      });
      const data = await r.json();
      setTags(data.tags || []);
    } catch {
      setTags([]);
    } finally {
      setLoading(false);
    }
  };

  const genWhatsApp = async () => {
    const r = await fetch("/.netlify/functions/make-copy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        context: caption ? `Foto: ${caption}` : "Foto del catálogo",
        imageUrl: imageSrc,
      }),
    });
    const { text } = await r.json();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mt-3 space-y-2">
      {/* Q&A */}
      <div className="rounded-xl border p-3 bg-white/60">
        <label className="text-sm font-medium">Pregúntale a la foto</label>
        <div className="mt-2 flex gap-2">
          <input
            className="flex-1 rounded-lg border px-3 py-2 text-sm"
            placeholder="¿Este vestido viene en talla 12 m?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={askPhoto}
            className="rounded-lg bg-black text-white px-3 py-2 text-sm disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Analizando..." : "Preguntar"}
          </button>
        </div>
        {answer && <p className="mt-2 text-sm text-gray-700">{answer}</p>}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={genWhatsApp}
          className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
          title="Genera un mensaje breve para WhatsApp"
        >
          Generar mensaje WhatsApp
        </button>

        <button
          onClick={getTags}
          className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
          title="Etiquetas sugeridas por IA"
        >
          Sugerir etiquetas
        </button>
      </div>

      {tags && tags.length > 0 && (
        <div className="text-xs text-gray-600">
          <span className="mr-1 font-medium">Tags:</span>
          {tags.map((t) => (
            <span key={t} className="mr-1 rounded bg-gray-100 px-2 py-0.5">{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
