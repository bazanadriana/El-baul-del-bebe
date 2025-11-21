import type { Handler } from "@netlify/functions";
import { openai, systemPhotoQA } from "./_openai";
import { corsHeaders, preflight } from "./_cors";

const MODEL = "gpt-4o-mini";

export const handler: Handler = async (event) => {
  const pf = preflight(event);
  if (pf) return pf;
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: "Method not allowed" };
  }

  try {
    const { imageUrl, question } = JSON.parse(event.body || "{}") as {
      imageUrl?: string;
      question?: string;
    };
    if (!imageUrl || !question) {
      return { statusCode: 400, headers: corsHeaders, body: "Missing imageUrl or question" };
    }

    const input = [
      { role: "system" as const, content: [{ type: "input_text" as const, text: systemPhotoQA }] },
      {
        role: "user" as const,
        content: [
          { type: "input_text" as const, text: question },
          { type: "input_image" as const, image_url: imageUrl, detail: "low" as const },
        ],
      },
    ];

    const res = await openai.responses.create({ model: MODEL, input, max_output_tokens: 200 });
    const answer = (res.output_text || "").trim() || "Lo siento, no pude analizar la foto.";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
      body: JSON.stringify({ answer }),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, headers: corsHeaders, body: "ask-photo error" };
  }
};
