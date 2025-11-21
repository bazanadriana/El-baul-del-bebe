import type { Handler } from "@netlify/functions";
import { openai } from "./_openai";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { context, imageUrl } = JSON.parse(event.body || "{}") as {
      context?: string; imageUrl?: string;
    };

    const prompt = `Genera un mensaje breve para WhatsApp (<=220 caracteres) en español, amable y claro.
Sin hashtags. Si hay foto, describe brevemente lo que se ve.`;

    const content: any[] = [{ type: "input_text", text: `${prompt}\nContexto: ${context ?? ""}` }];
    if (imageUrl) content.push({ type: "input_image", image_url: imageUrl, detail: "low" });

    const r = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: "Eres asistente de venta para tienda infantil." },
        { role: "user", content },
      ],
      max_output_tokens: 140,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: (r.output_text || "").trim() }),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "make-copy error" };
  }
};
