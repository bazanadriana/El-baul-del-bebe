import type { Handler } from "@netlify/functions";
import "dotenv/config";

const HF_API_KEY = process.env.HF_API_KEY!;
const HF_MODEL = "Salesforce/blip-image-captioning-large"; // public
const HF_TASK  = "image-to-text";                           // 👈 required

export const handler: Handler = async (event) => {
  try {
    if (!HF_API_KEY) return resp(500, { error: "Missing HF_API_KEY env var" });

    const { imageUrl } = JSON.parse(event.body || "{}");
    if (!imageUrl) return resp(400, { error: "Missing imageUrl in request body" });

    // fetch image bytes
    const imgRes = await fetch(String(imageUrl));
    if (!imgRes.ok) return resp(400, { error: `Failed to fetch image: ${imgRes.status} ${imgRes.statusText}` });
    const imgBuf = Buffer.from(await imgRes.arrayBuffer());

    // Router call
    const hfRes = await fetch("https://router.huggingface.co/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "HF-Hub-Model": HF_MODEL,
        "HF-Target-Task": HF_TASK,              // 👈 tell Router which pipeline
        "Content-Type": "application/octet-stream",
      },
      body: imgBuf,
    });

    if (!hfRes.ok) return resp(hfRes.status, { error: `HF error: ${await hfRes.text()}` });

    const data = await hfRes.json(); // [{ generated_text: "..." }]
    const caption = data?.[0]?.generated_text ?? data?.generated_text ?? "No caption generated";
    return resp(200, { caption });
  } catch (e) {
    return resp(500, { error: e instanceof Error ? e.message : String(e) });
  }
};

function resp(statusCode: number, body: unknown) {
  return { statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}
