// netlify/functions/make-copy.ts
import type { Handler } from "@netlify/functions";
import { openai, MODEL, getResponseText } from "./_openai";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { context, imageUrl } = JSON.parse(event.body || "{}");

    const prompt = [
      "Escribe un mensaje breve y amable para WhatsApp (1–2 oraciones).",
      "El mensaje pregunta disponibilidad/precio del producto.",
      "No uses emojis raros; mantén texto plano.",
      context ? `Contexto: ${context}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const res = await openai.responses.create({
      model: MODEL,
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            ...(imageUrl
              ? [{ type: "input_image", image_url: String(imageUrl), detail: "low" } as const]
              : []),
          ],
        },
      ],
      max_output_tokens: 120,
    } as any);

    const text =
      getResponseText(res) ||
      "¡Hola! Tengo algunas preguntas sobre un artículo que vi en la página de tu tienda.";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    };
  } catch (e: any) {
    console.error("make-copy error", e?.status ?? "", e?.message ?? e);
    const status = e?.status === 429 ? 429 : 500;
    return {
      statusCode: status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "make-copy failed" }),
    };
  }
};
