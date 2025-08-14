// /api/chat.js  (Node on Vercel)
// Env: OPENAI_API_KEY
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  // Basic CORS for browsers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) return res.status(400).json({ error: "messages[] required" });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",            // fast + cheap; swap if you prefer
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content:
            "You are a concise, friendly site assistant. Keep answers short, use bullet points when helpful, and avoid financial advice."
        },
        ...messages
      ]
    });

    const reply = completion.choices?.[0]?.message?.content ?? "Sorry, I couldn't answer that.";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "LLM error" });
  }
}
