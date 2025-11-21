import type { Handler } from "@netlify/functions";
import { openai } from "./_openai";
import { corsHeaders, preflight } from "./_cors";

const MODEL = "gpt-4o-mini";

export const handler: Handler = async (event) => {
  // CORS preflight
  const pf = preflight(event);
  if (pf) return pf;

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: "Method not allowed" };
  }

  try {
    const { imageUrl } = JSON.parse(event.body || "{}") as { imageUrl?: string };
    if (!imageUrl) {
      return { statusCode: 400, headers: corsHeaders, body: "Missing imageUrl" };
    }

    // Build Responses input (role + parts)
    const input = [
      {
        role: "system" as const,
        content: [
          {
            type: "input_text" as const,
            text:
              // Ask for pure JSON to avoid extra prose
              'Devuelve ÚNICAMENTE JSON con la forma {"tags": string[], "colors": string[]} ' +
              "sin texto adicional. Etiquetas: 1–5 palabras simples y útiles para un catálogo. " +
              "Colores: nombres comunes (p. ej., rosa, blanco, azul).",
          },
        ],
      },
      {
        role: "user" as const,
        content: [
          { type: "input_image" as const, image_url: imageUrl, detail: "low" as const },
        ],
      },
    ];

    const res = await openai.responses.create({
      model: MODEL,
      input,
      max_output_tokens: 200,
    });

    // Fallback-safe parsing
    const raw = (res.output_text || "").trim();
    let json: unknown = { tags: [], colors: [] as string[] };

    try {
      // If the model ever wraps code blocks, strip them:
      const cleaned = raw.replace(/^```json\s*|\s*```$/g, "");
      json = JSON.parse(cleaned);
      // Basic shape guard
      if (
        typeof (json as any) !== "object" ||
        !Array.isArray((json as any).tags) ||
        !Array.isArray((json as any).colors)
      ) {
        json = { tags: [], colors: [] };
      }
    } catch {
      json = { tags: [], colors: [] };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
      body: JSON.stringify(json),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, headers: corsHeaders, body: "photo-tags error" };
  }
};
