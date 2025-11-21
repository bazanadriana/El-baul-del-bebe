import OpenAI from "openai";

const key = process.env.OPENAI_API_KEY;
if (!key) {
  console.warn("OPENAI_API_KEY is not set in environment.");
}

export const openai = new OpenAI({ apiKey: key });
export const systemPhotoQA =
  "Responde en español claro y corto. Si la imagen no es suficiente, pide más detalles.";
