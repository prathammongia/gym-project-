import { useState, useRef, useEffect } from 'react';
import './GymChatbot.css';

export const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // ✅ Correct Gemini endpoint + API key from Vite
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              ...messages.map((msg) => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
              })),
              { role: 'user', parts: [{ text: input }] },
            ],
          }),
        }
      );

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        '⚠️ No response from Gemini API.';

      const geminiMessage = { sender: 'gemini', text: reply };
      setMessages((prev) => [...prev, geminiMessage]);
    } catch (error) {
      console.error('❌ Gemini API Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'gemini', text: '⚠️ Error contacting Gemini API.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="gemini-heading">💪 Gym Chatbot (Gemini)</h3>
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              {msg.text}
              <span
                className="copy-icon"
                onClick={() => navigator.clipboard.writeText(msg.text)}
                title="Copy to clipboard"
              >
                📋
              </span>
            </div>
          ))}
          <div ref={chatEndRef}>{loading ? <p>Thinking...</p> : null}</div>
        </div>

        <form className="input-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your gym or diet question..."
          />
          <button type="submit" disabled={loading}>
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};
