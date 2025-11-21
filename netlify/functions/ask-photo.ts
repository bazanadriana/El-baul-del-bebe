import type { Handler } from "@netlify/functions";
import { openai, systemPhotoQA } from "./_openai";

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
    const { imageUrl, question } = JSON.parse(event.body || "{}") as {
      imageUrl?: string;
      question?: string;
    };

    if (!question) {
      return res(400, { error: "Missing question" });
    }

    // If image is not publicly reachable (e.g., localhost), answer without image.
    const userContent =
      imageUrl && isProbablyPublic(imageUrl)
        ? [
            { type: "input_text" as const, text: question },
            { type: "input_image" as const, image_url: imageUrl, detail: "low" as const },
          ]
        : [{ type: "input_text" as const, text: question }];

    const ai = await openai.responses.create({
      model: MODEL,
      input: [
        { role: "system", content: systemPhotoQA },
        { role: "user", content: userContent },
      ],
      max_output_tokens: 200,
    });

    const text = ai.output_text?.trim() || "Lo siento, no pude analizar la foto. Intenta de nuevo.";
    return res(200, { answer: text });
  } catch (e: any) {
    console.error("ask-photo error", e);
    return res(500, { error: "ask-photo error" });
  }
};

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
