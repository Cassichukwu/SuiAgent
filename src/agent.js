import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.freemodel.dev/v1"
});

export async function askAgent(userQuestion) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content: `You are a helpful AI trading assistant for the Sui blockchain. 
        You help users understand DeepBook market data and make smart trading decisions.`
      },
      {
        role: "user",
        content: userQuestion
      }
    ]
  });

  console.log("Full response:", JSON.stringify(response, null, 2));
  return response?.choices?.[0]?.message?.content;
}