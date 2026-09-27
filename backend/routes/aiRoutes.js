const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        message: "Please enter a question.",
      });
    }

    const response = await openai.responses.create({
      model: "gpt-6-astra",
      instructions:
        "You are SOLARIS AI, a friendly astronomy and space-learning assistant. Answer questions about the Solar System, planets, moons, the Sun, asteroids, comets, space missions, telescopes, and astronomy. Explain concepts clearly and accurately. If a question is unrelated to astronomy or space, politely say that SOLARIS AI is focused on astronomy and space topics.",
      input: question.trim(),
    });

    res.json({
      answer: response.output_text,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      message: "Could not generate an AI response.",
    });
  }
});

module.exports = router;