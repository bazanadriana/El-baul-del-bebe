import type { Handler } from "@netlify/functions";
import { openai, model } from "./_openai";

const systemPhotoQA =
  "Eres un asistente breve y útil. Responde en español con 1–3 oraciones. Si no es visible en la imagen, sugiere preguntar por WhatsApp.";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { imageUrl, question } = JSON.parse(event.body || "{}") as {
      imageUrl?: string;
      question?: string;
    };
    if (!imageUrl || !question) return { statusCode: 400, body: "Missing imageUrl/question" };

    const res = await openai.responses.create({
      model,
      input: [
        { role: "system", content: systemPhotoQA },
        {
          role: "user",
          content: [
            { type: "input_text", text: question },
            // send either URL or data URL; both work
            { type: "input_image", image_url: imageUrl, detail: "low" },
          ],
        },
      ],
      max_output_tokens: 200,
    });

    const answer = res.output_text || "Lo siento, no pude analizar la foto.";
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answer }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "ask-photo error" };
  }
};
