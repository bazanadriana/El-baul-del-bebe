import type { Handler } from "@netlify/functions";
import { openai, MODEL, withBackoff } from "./_openai";

const system = `Extrae de la foto 3–8 etiquetas simples (nombres cortos) y 0–4 colores dominantes. Responde JSON:
{"tags":[],"colors":[]}`;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { imageUrl } = JSON.parse(event.body || "{}");
    if (!imageUrl) return { statusCode: 400, body: "Missing imageUrl" };

    const res = await withBackoff(() =>
      openai.responses.create({
        model: MODEL,
        input: [
          { role: "system", content: system },
          {
            role: "user",
            content: [{ type: "input_image", image_url: imageUrl, detail: "low" }],
          },
        ],
        max_output_tokens: 200,
      })
    );

    // Best-effort parse
    let json = { tags: [] as string[], colors: [] as string[] };
    try { json = JSON.parse(res.output_text || "{}"); } catch {}

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    };
  } catch (e: any) {
    const status = e?.statusCode || 500;
    return { statusCode: status, body: "photo-tags error" };
  }
};
