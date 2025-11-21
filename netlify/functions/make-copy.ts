import type { Handler } from "@netlify/functions";
import { openai } from "./_openai";

const MODEL = "gpt-4o-mini";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { context, imageUrl } = JSON.parse(event.body || "{}") as {
      context?: string;
      imageUrl?: string;
    };

    // ✅ Each item MUST have a role, and content MUST be parts (input_text / input_image)
    const input = [
      {
        role: "system" as const,
        content: [
          {
            type: "input_text" as const,
            text:
              "Escribe un texto corto (1–2 frases) para WhatsApp, amistoso y claro, en español neutro, sin emojis raros.",
          },
        ],
      },
      {
        role: "user" as const,
        content: [
          {
            type: "input_text" as const,
            text: context ? `Producto: ${context}` : "Producto de bebé",
          },
          ...(imageUrl
            ? [
                {
                  type: "input_image" as const,
                  image_url: imageUrl,
                  detail: "low" as const,
                },
              ]
            : []),
        ],
      },
    ];

    const res = await openai.responses.create({
      model: MODEL,
      input,
      max_output_tokens: 120,
    });

    const text =
      (res.output_text || "").trim() ||
      "Hola, ¿me ayudas con información y precio?";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "make-copy error" };
  }
};
