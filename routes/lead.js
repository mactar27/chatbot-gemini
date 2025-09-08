import express from "express";

const router = express.Router();
const leads = [];

router.post("/", (req, res) => {
  const { sessionId, name, email, phone, topic } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Nom et email requis" });

  leads.push({ sessionId, name, email, phone, topic, createdAt: new Date() });
  console.log("Lead enregistré :", { sessionId, name, email, phone, topic });
  res.json({ success: true });
});

export default router;
