import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    });

    const text = response.choices[0].message.content;
    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({ message: "Error generating text" });
  }
}
