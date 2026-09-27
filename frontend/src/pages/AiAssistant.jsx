import { useState } from "react";

function AiAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! 👋 I'm SOLARIS AI. Ask me anything about the Solar System, planets, moons, the Sun, space missions, or astronomy.",
    },
  ]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) return;

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text: trimmedQuestion,
    },
    {
      role: "assistant",
      text: "🚀 Thinking...",
    },
  ]);

  setQuestion("");

  try {
    const response = await fetch(
      "http://localhost:5000/api/ai/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedQuestion,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Could not get AI response."
      );
    }

    setMessages((prev) => [
      ...prev.slice(0, -1),
      {
        role: "assistant",
        text: data.answer,
      },
    ]);
  } catch (error) {
    console.error("AI REQUEST ERROR:", error);

    setMessages((prev) => [
      ...prev.slice(0, -1),
      {
        role: "assistant",
        text: "❌ Sorry, I couldn't connect to SOLARIS AI. Please try again.",
      },
    ]);
  }
};

  return (
    <main className="ai-assistant-page">
      <section className="ai-assistant-container">
        <div className="ai-assistant-heading">
          <p>SOLARIS INTELLIGENCE</p>

          <h1>AI Assistant</h1>

          <span>
            Ask anything about the Solar System
          </span>
        </div>

        <div className="ai-chat-box">
          <div className="ai-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`ai-message ${
                  message.role === "user"
                    ? "user-message"
                    : "assistant-message"
                }`}
              >
                <div className="ai-message-label">
                  {message.role === "user"
                    ? "YOU"
                    : "SOLARIS AI"}
                </div>

                <div className="ai-message-text">
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form
            className="ai-input-area"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about the Solar System..."
            />

            <button type="submit">
              Send 🚀
            </button>
          </form>
        </div>

        <div className="ai-suggestions">
          <button
            onClick={() =>
              setQuestion("Why is Mars red?")
            }
          >
            Why is Mars red?
          </button>

          <button
            onClick={() =>
              setQuestion(
                "Why does the Moon orbit Earth?"
              )
            }
          >
            Why does the Moon orbit Earth?
          </button>

          <button
            onClick={() =>
              setQuestion(
                "Which planet has the strongest winds?"
              )
            }
          >
            Strongest planetary winds?
          </button>

          <button
            onClick={() =>
              setQuestion(
                "Tell me about Saturn's rings."
              )
            }
          >
            Tell me about Saturn's rings
          </button>
        </div>
      </section>
    </main>
  );
}

export default AiAssistant;