import type { Handler } from "@netlify/functions";
import { openai } from "./_openai";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { context, imageUrl } = JSON.parse(event.body || "{}") as {
      context?: string; imageUrl?: string;
    };

    const prompt = `Escribe un mensaje breve (<= 200 caracteres), amable, para WhatsApp.
Incluye el nombre del producto si se proporciona y una pregunta clara (talla/precio/disponibilidad).
Sin hashtags, sin comillas, sin caracteres raros.`;

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
    const raw = (r.output_text || "").trim();

    // 2) Sanitize output to avoid � diamonds
    const clean = (s: string) =>
      s
        .normalize("NFC")
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/\uFFFD/g, "")          // strip replacement char
        .replace(/\u200B/g, "");         // zero-width space, just in case
    
    const text = clean(raw);
    
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
