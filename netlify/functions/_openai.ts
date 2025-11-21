// netlify/functions/_openai.ts
import OpenAI from "openai";

export const MODEL = "gpt-4o-mini";

// Read once; Netlify injects env for local & prod
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  // Fail fast with a clear message in function logs
  // (Frontend already shows a friendly hint.)
  console.error("OPENAI_API_KEY is missing");
}

export const openai = new OpenAI({ apiKey });

// Extract plain text from Responses API object, resilient to SDK changes
export function getResponseText(res: any): string {
  // New SDK often exposes `output_text`
  if (res?.output_text) return String(res.output_text).trim();

  // Fallback: walk `output[].content[].text.value`
  try {
    const chunks = (res?.output ?? [])
      .flatMap((p: any) => p?.content ?? [])
      .map((c: any) => c?.text?.value ?? "")
      .join("");
    return (chunks || "").trim();
  } catch {
    return "";
  }
}
