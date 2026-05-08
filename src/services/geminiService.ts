import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export async function getCharacterResponse(
  systemInstruction: string,
  history: Message[],
  userMessage: string
) {
  try {
    const chat = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [
        ...history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        })),
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ],
      config: {
        systemInstruction: `${systemInstruction}\n\nATURAN PENTING: Bermain peranlah (roleplay) 100% sebagai karakter ini dengan SUPER SERU dan EKSPRESIF! Gunakan ciri khas bicara, jargon, logat yang pas. TAPI WAJIB SINGKAT: MAKSIMAL 1-2 KALIMAT PENDEK saja seperti balasan chat WA cepat namun sangat asik dan ngena! Boleh pakai emoji.`,
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
      }
    });

    return chat.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Maaf, sepertinya sambungan batin sedang terganggu. Coba lagi nanti ya.");
  }
}
