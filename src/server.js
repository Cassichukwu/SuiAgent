import express from "express";
import cors from "cors";
import { askAgent } from "./agent.js";

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    const answer = await askAgent(question);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("✅ SuiAgent server running on http://localhost:3000");
});
