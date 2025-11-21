import type { Handler } from "@netlify/functions";
import { openai, MODEL, withBackoff } from "./_openai";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { caption = "", imageUrl } = JSON.parse(event.body || "{}");

    const res = await withBackoff(() =>
      openai.responses.create({
        model: MODEL,
        input: [
          { role: "system", content: "Escribe un saludo breve para WhatsApp (1–2 oraciones, cordial y natural)." },
          {
            role: "user",
            content: [
              { type: "input_text", text: `Contexto: ${caption}`.trim() },
              ...(imageUrl ? [{ type: "input_image" as const, image_url: imageUrl, detail: "low" as const }] : []),
            ],
          },
        ],
        max_output_tokens: 120,
      })
    );

    const text =
      res.output_text?.trim() ||
      "¡Hola! Tengo algunas preguntas sobre un artículo que vi en su tienda. ¿Me apoyas con precio y disponibilidad?";

    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) };
  } catch (e: any) {
    const status = e?.statusCode || 500;
    return { statusCode: status, body: "make-copy error" };
  }
};
