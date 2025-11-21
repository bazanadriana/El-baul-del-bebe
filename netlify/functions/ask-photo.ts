import type { Handler } from "@netlify/functions";
import { openai, systemPhotoQA } from "./_openai";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  try {
    const { imageUrl, question } = JSON.parse(event.body || "{}") as {
      imageUrl?: string; question?: string;
    };
    if (!imageUrl || !question) return { statusCode: 400, body: "Missing imageUrl or question" };

    const res = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: systemPhotoQA },
        {
          role: "user",
          content: [
            { type: "input_text", text: question },
            { type: "input_image", image_url: imageUrl, detail: "low" },
          ],
        },
      ],
      max_output_tokens: 240,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: (res.output_text || "").trim() }),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "ask-photo error" };
  }
};
