// netlify/functions/photo-tags.ts
import type { Handler } from "@netlify/functions";
import { openai, MODEL, getResponseText } from "./_openai";

const SYSTEM = `Eres un asistente que devuelve etiquetas en JSON.
Responde SOLO JSON con la forma: {"tags": string[], "colors": string[]}.`;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { imageUrl } = JSON.parse(event.body || "{}");
    if (!imageUrl) return { statusCode: 400, body: "Missing imageUrl" };

    const res = await openai.responses.create({
      model: MODEL,
      input: [
        { role: "system", content: [{ type: "input_text", text: SYSTEM }] },
        {
          role: "user",
          content: [
            { type: "input_text", text: "Analiza la imagen y devuelve JSON." },
            { type: "input_image", image_url: String(imageUrl), detail: "low" },
          ],
        },
      ],
      max_output_tokens: 200,
    } as any);

    const text = getResponseText(res);
    let json: { tags: string[]; colors: string[] } = { tags: [], colors: [] };
    try {
      json = JSON.parse(text);
      if (!Array.isArray(json.tags)) json.tags = [];
      if (!Array.isArray(json.colors)) json.colors = [];
    } catch {
      // best-effort fallback: empty
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    };
  } catch (e: any) {
    console.error("photo-tags error", e?.status ?? "", e?.message ?? e);
    const status = e?.status === 429 ? 429 : 500;
    return {
      statusCode: status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "photo-tags failed" }),
    };
  }
};
