import OpenAI from "openai";
import dotenv from "dotenv";
import { getMarketData } from "./deepbook.js";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.freemodel.dev/v1"
});

export async function askAgent(userQuestion) {
  try {
    // Get real DeepBook market data
    const marketData = await getMarketData();
    
    const systemPrompt = `You are a helpful AI trading assistant for the Sui blockchain.
    You help users understand DeepBook market data and make smart trading decisions.
    
    Here is the current live DeepBook market data:
    ${JSON.stringify(marketData, null, 2)}
    
    Use this real data to answer questions about trading on Sui.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userQuestion
        }
      ]
    });

    console.log("Full response:", JSON.stringify(response, null, 2));
    
    const answer = response?.choices?.[0]?.message?.content;
    
    if (!answer) {
      return "Sorry, I could not generate a response. Please try again.";
    }
    
    return answer;
    
  } catch (error) {
    console.error("Agent error:", error.message);
    return "Error: " + error.message;
  }
}