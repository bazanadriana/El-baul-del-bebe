import type { Handler } from "@netlify/functions";
import { openai } from "./_openai";

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
    const { caption } = JSON.parse(event.body || "{}") as { caption?: string };
    const ai = await openai.responses.create({
      model: MODEL,
      input: [
        {
          role: "system",
          content:
            "Escribe un mensaje corto y amable para WhatsApp (1–2 frases) invitando a pedir precio/disponibilidad.",
        },
        { role: "user", content: [{ type: "input_text", text: caption || "Producto" }] },
      ],
      max_output_tokens: 120,
    });

    const message =
      ai.output_text?.trim() ||
      "¡Hola! Si estás interesado, con gusto te comparto precios y disponibilidad.";
    return res(200, { message });
  } catch (e) {
    console.error("make-copy error", e);
    return res(500, { error: "make-copy error" });
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
