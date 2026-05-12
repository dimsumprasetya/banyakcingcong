import { Message } from "../types";

const OPENROUTER_API_KEY = "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";

export async function getCharacterResponse(
  systemInstruction: string,
  history: Message[],
  userMessage: string
) {
  try {
    const formattedHistory = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ai.studio",
        "X-Title": "AI Studio App"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `${systemInstruction}\n\nATURAN MUTLAK: 100% ROLEPLAY! Jawablah pertanyaan user dengan NYAMBUNG dan TEPAT SASARAN, TETAPI tetap gunakan gaya bahasa LEBAY, SUPER SERU, atau SANGAT DRAMATIS sesuai karaktermu! Keluarkan jargon, catchphrase, dan logat andalanmu. WAJIB SINGKAT MAKSIMAL 1-2 KALIMAT PENDEK ala nge-chat WA! Kasih emoji asik!`,
          },
          ...formattedHistory,
          { role: "user", content: userMessage },
        ],
        temperature: 0.85,
        top_p: 0.95,
        max_tokens: 300,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API Error:", data);
      throw new Error(
        `OpenRouter Error: ${data.error?.message || JSON.stringify(data)}`
      );
    }

    return data.choices[0].message.content;
  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error(error.message || "Maaf, sepertinya sambungan batin sedang terganggu. Coba lagi nanti ya.");
  }
}
