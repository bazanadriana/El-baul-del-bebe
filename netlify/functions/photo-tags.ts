import type { Handler } from "@netlify/functions";
import { openai, model } from "./_openai";

const systemTagger =
  "Analiza la imagen y devuelve un JSON MUY corto con 'tags' (3–6 sustantivos simples) y 'colors' (2–3 colores principales). Solo responde JSON.";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { imageUrl } = JSON.parse(event.body || "{}") as { imageUrl?: string };
    if (!imageUrl) return { statusCode: 400, body: "Missing imageUrl" };

    const res = await openai.responses.create({
      model,
      input: [
        { role: "system", content: systemTagger },
        {
          role: "user",
          content: [{ type: "input_image", image_url: imageUrl, detail: "low" }],
        },
      ],
      max_output_tokens: 200,
    });

    let json = { tags: [] as string[], colors: [] as string[] };
    try {
      // The model outputs text; we asked for JSON text
      json = JSON.parse(res.output_text || "{}");
    } catch (_) {
      /* fallback stays empty */
    }

    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "photo-tags error" };
  }
};
