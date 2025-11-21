// netlify/functions/_openai.ts
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // set in Netlify dashboard
});

// Helpful system prompts
export const systemPhotoQA = `
Eres asistente de una tienda infantil. Responde en español en 1–2 oraciones, claras y cortas.
Basado SOLO en la foto, da tu mejor estimación práctica (p. ej., rango de edad por tamaño/forma).
Si algo no puede saberse por la foto, dilo brevemente, y termina con un CTA amable:
"Si te interesa, te paso el WhatsApp para confirmar tallas y precio."
Evita respuestas largas o genéricas. No inventes materiales ni marcas.
`;


export const systemTags = `
Eres un asistente que etiqueta FOTOS de productos infantiles.
Devuelve un JSON con { "tags": string[], "colors": string[] }.
Tags en minúsculas, sin acentos, 1-2 palabras (ej: "vestidos", "traje", "peluches", "rosa", "bautizo").
`;
