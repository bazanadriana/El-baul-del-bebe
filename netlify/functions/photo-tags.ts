import type { Handler } from "@netlify/functions";
import { openai, systemTags } from "./_openai";

const MODEL = "gpt-4o-mini";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: cors(),
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { imageUrl } = JSON.parse(event.body || "{}") as { imageUrl?: string };

    if (!imageUrl || !isProbablyPublic(imageUrl)) {
      // Local dev or bad URL → return a gentle hint
      return res(200, { tags: [], colors: [], note: "Imagen no pública (local). Sube/usa deploy." });
    }

    const ai = await openai.responses.create({
      model: MODEL,
      input: [
        { role: "system", content: systemTags },
        {
          role: "user",
          content: [
            { type: "input_text", text: "Genera 3–6 etiquetas y colores dominantes." },
            { type: "input_image", image_url: imageUrl, detail: "low" },
          ],
        },
      ],
      max_output_tokens: 200,
    });

    // Ask for plain text, then do a tiny, safe parse
    const raw = ai.output_text?.trim() || "";
    const parsed = pickTagsAndColors(raw);

    return res(200, parsed);
  } catch (e: any) {
    console.error("photo-tags error", e);
    return res(500, { error: "photo-tags error" });
  }
};

function pickTagsAndColors(s: string) {
  // Very permissive: split commas/lines, keep short lowercase words
  const parts = s
    .split(/[\n,]+/g)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  const tags = parts.filter((t) => t.length <= 20).slice(0, 6);
  const colors = parts.filter((t) => /(blanco|negro|gris|rosa|azul|rojo|verde|amarillo|morado|café|beige)/.test(t)).slice(0, 4);
  return { tags, colors };
}

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
}
function res(code: number, body: any) {
  return { statusCode: code, headers: cors(), body: JSON.stringify(body) };
}
function isProbablyPublic(u: string) {
  try {
    const url = new URL(u);
    return /^https?:$/.test(url.protocol) && !/localhost|127\.0\.0\.1/.test(url.host);
  } catch {
    return false;
  }
}
