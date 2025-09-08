import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import chatbotRoutes from "./routes/chatbot.js";
import leadRoutes from "./routes/lead.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Servir le front-end depuis le dossier "public"
app.use(express.static('public'));

// Routes API
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/lead", leadRoutes);

// Route racine (optionnelle)
app.get("/", (req, res) => {
  res.send("Chatbot Gemini API is running...");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
