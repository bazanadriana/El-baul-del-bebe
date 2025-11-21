import type { Handler } from "@netlify/functions";
import { openai, systemTags } from "./_openai";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { imageUrl } = JSON.parse(event.body || "{}") as { imageUrl?: string };
    if (!imageUrl) return { statusCode: 400, body: "Missing imageUrl" };

    const prompt = `${systemTags}\nDevuelve SOLO un JSON válido: {"tags":["..."],"colors":["..."]}`;

    const res = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: prompt },
        {
          role: "user",
          content: [
            { type: "input_image", image_url: imageUrl, detail: "low" },
          ],
        },
      ],
      max_output_tokens: 200,
    });

    const raw = res.output_text || `{"tags":[],"colors":[]}`;
    let data: any;
    try {
      data = JSON.parse(raw);
      if (!Array.isArray(data.tags)) data.tags = [];
      if (!Array.isArray(data.colors)) data.colors = [];
    } catch {
      data = { tags: [], colors: [] };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "photo-tags error" };
  }
};
