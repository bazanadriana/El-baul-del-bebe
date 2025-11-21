import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompts
export const systemPhotoQA =
  "Responde en 1–2 oraciones, útil y concisa. Si puedes, da un rango de edad estimado basado en la foto. Si la imagen no es clara o no es accesible, dilo brevemente.";

export const systemTags =
  "Devuelve etiquetas cortas y colores principales para la imagen. Mantén 3–6 tags máximo.";
