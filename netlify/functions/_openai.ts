import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
export const MODEL = "gpt-4o-mini";

export async function withBackoff<T>(fn: () => Promise<T>) {
  const started = Date.now();
  try {
    return await fn();
  } catch (err: any) {
    // If not a rate limit, surface immediately
    const code = err?.error?.code || err?.status;
    const is429 = code === "rate_limit_exceeded" || code === 429;
    if (!is429) throw err;

    // Respect Retry-After when possible, else wait ~1s
    const hdr = err?.response?.headers || err?.headers;
    const retryAfter = Number(hdr?.get?.("retry-after") ?? hdr?.["retry-after"] ?? 1) * 1000 || 1000;

    // Keep hard cap so we don't hit Netlify 30s ceiling
    if (Date.now() - started + retryAfter > 25_000) {
      const friendly = new Error("Límite de solicitudes alcanzado. Intenta de nuevo en unos segundos.");
      (friendly as any).statusCode = 429;
      throw friendly;
    }
    await new Promise(r => setTimeout(r, Math.min(retryAfter, 5_000)));
    return await fn();
  }
}
