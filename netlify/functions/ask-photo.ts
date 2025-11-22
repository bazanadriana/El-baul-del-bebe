import type { Handler } from "@netlify/functions";
import "dotenv/config";

const HF_API_KEY = process.env.HF_API_KEY!;
const HF_MODEL = "dandelin/vilt-b32-finetuned-vqa"; // public VQA model
const HF_TASK  = "visual-question-answering";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { imageUrl, question } = JSON.parse(event.body || "{}");
    if (!imageUrl || !question) return jerr(400, "Missing imageUrl or question");

    const imgRes = await fetch(String(imageUrl));
    if (!imgRes.ok) return jerr(400, `Failed to fetch image: ${imgRes.status} ${imgRes.statusText}`);
    const imgB64 = Buffer.from(await imgRes.arrayBuffer()).toString("base64");

    const prompt = `Contesta en 1–2 oraciones, útil y específicas. ${question}`;

    const hfRes = await fetch("https://router.huggingface.co/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "HF-Hub-Model": HF_MODEL,
        "HF-Target-Task": HF_TASK,            // 👈 required
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: { image: imgB64, question: prompt } }),
    });

    if (!hfRes.ok) return jerr(hfRes.status, `HF error: ${await hfRes.text()}`);

    const data = await hfRes.json(); // { answer: "..." } or [{generated_text: "..."}]
    const answer =
      data?.answer ??
      data?.[0]?.generated_text ??
      data?.generated_text ??
      "Lo siento, no pude analizar la foto.";
    return jok({ answer });
  } catch (e) {
    return jerr(500, e instanceof Error ? e.message : "ask-photo failed");
  }
};

function jok(body: unknown) { return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }; }
function jerr(status: number, error: string) { return { statusCode: status, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error }) }; }
