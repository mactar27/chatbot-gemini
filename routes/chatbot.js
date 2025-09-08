import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


router.post("/message", async (req, res) => {
  const message = req.body?.message;
  if (!message) return res.status(400).json({ error: "Message requis" });

  try {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);

    res.json({ 
      userMessage: message, 
      botResponse: result.response.text() 
    });
  } catch (error) {
    console.error("Erreur Gemini DÉTAILLÉE:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
