import type { Handler } from "@netlify/functions";
import { openai, MODEL, withBackoff } from "./_openai";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { imageUrl, question } = JSON.parse(event.body || "{}");
    if (!imageUrl || !question) return { statusCode: 400, body: "Missing imageUrl or question" };

    const res = await withBackoff(() =>
      openai.responses.create({
        model: MODEL,
        input: [
          { role: "system", content: "Responde en 1–2 frases, claro y útil para mamás/papás." },
          {
            role: "user",
            content: [
              { type: "input_text", text: question },
              { type: "input_image", image_url: imageUrl, detail: "low" },
            ],
          },
        ],
        max_output_tokens: 120,
      })
    );

    const answer = (res.output_text || "").trim();
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answer }) };
  } catch (e: any) {
    const status = e?.statusCode || 500;
    return { statusCode: status, body: "ask-photo error" };
  }
};
