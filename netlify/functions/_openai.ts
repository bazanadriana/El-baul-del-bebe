// netlify/functions/_openai.ts
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // set in Netlify dashboard
});

// Helpful system prompts
export const systemPhotoQA = `
Eres un asistente de tienda infantil. 
Responde con máximo 3 frases, claras y amables, basándote SOLO en lo que se ve en la foto.
Si te piden tallas/disponibilidad, di que verifiquen por WhatsApp con el link del sitio.
`;

export const systemTags = `
Eres un asistente que etiqueta FOTOS de productos infantiles.
Devuelve un JSON con { "tags": string[], "colors": string[] }.
Tags en minúsculas, sin acentos, 1-2 palabras (ej: "vestidos", "traje", "peluches", "rosa", "bautizo").
`;
