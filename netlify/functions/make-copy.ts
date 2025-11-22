import type { Handler } from "@netlify/functions";
import "dotenv/config";

const HF_API_KEY = process.env.HF_API_KEY!;
const TEXT_MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1";
const HF_TASK    = "text-generation";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    if (!HF_API_KEY) return jerr(500, "Missing HF_API_KEY env var");

    const { context } = JSON.parse(event.body || "{}");

    const prompt = [
      "Escribe un mensaje breve y amable para WhatsApp (1–2 oraciones).",
      "Pregunta disponibilidad y/o precio del producto.",
      "No uses emojis; texto plano y profesional.",
      context ? `Contexto: ${String(context)}` : "",
    ].filter(Boolean).join("\n");

    const hfRes = await fetch("https://router.huggingface.co/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "HF-Hub-Model": TEXT_MODEL,
        "HF-Target-Task": HF_TASK,            // 👈 required
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 100 } }),
    });

    if (!hfRes.ok) return jerr(hfRes.status, `HF error: ${await hfRes.text()}`);

    const data = await hfRes.json(); // [{generated_text: "..."}]
    const text =
      data?.[0]?.generated_text ??
      data?.generated_text ??
      "¡Hola! Tengo algunas preguntas sobre un artículo que vi en la página de tu tienda.";

    return jok({ text });
  } catch (e) {
    return jerr(500, e instanceof Error ? e.message : "make-copy failed");
  }
};

function jok(body: unknown) { return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }; }
function jerr(status: number, error: string) { return { statusCode: status, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error }) }; }
