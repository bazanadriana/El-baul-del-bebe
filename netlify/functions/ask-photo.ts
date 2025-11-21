// netlify/functions/ask-photo.ts
import type { Handler } from "@netlify/functions";
import { openai, MODEL, getResponseText } from "./_openai";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { imageUrl, question } = JSON.parse(event.body || "{}");
    if (!imageUrl || !question) {
      return { statusCode: 400, body: "Missing imageUrl or question" };
    }

    const res = await openai.responses.create({
      model: MODEL,
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: `Contesta en 1–2 oraciones, útil y específicas.` },
            { type: "input_text", text: String(question) },
            { type: "input_image", image_url: String(imageUrl), detail: "low" },
          ],
        },
      ],
      max_output_tokens: 200,
    } as any);

    const answer = getResponseText(res) || "Lo siento, no pude analizar la foto.";
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    };
  } catch (e: any) {
    // Helpful logs in Netlify CLI
    console.error("ask-photo error", e?.status ?? "", e?.message ?? e);
    const status = e?.status === 429 ? 429 : 500;
    return {
      statusCode: status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "ask-photo failed" }),
    };
  }
};
