import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, MessageSquare, X, Loader } from "lucide-react";

type Message = {
  role: "user" | "bot";
  text: string;
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`http://localhost:5000/api/chat`, {
        message: newMessage.text,
      });

      const reply =
        res.data.reply ||
        "Sorry, I didn’t get that. Try asking about the stock or related market topics!";
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Oops! I ran into an error. Please try again or check the server status.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white rounded-full p-4 shadow-2xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
          aria-label="Open Chatbot"
        >
          <MessageSquare size={24} />
        </button>
      )}

      <div
        className={`bg-gray-800 border border-gray-700 rounded-xl shadow-2xl transition-all duration-300 ${
          isOpen
            ? "w-80 h-96 opacity-100 pointer-events-auto"
            : "w-0 h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900 rounded-t-xl">
            <h3 className="text-lg font-bold text-indigo-400 flex items-center">
              <MessageSquare size={18} className="mr-2" /> Stock Assistant
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition duration-200 p-1 rounded-full hover:bg-gray-700 focus:outline-none"
              aria-label="Close Chatbot"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 p-4 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 italic mt-8">
                <p>
                  Hello! Ask me about the current stock, market trends, or
                  financial terms.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 text-sm rounded-xl max-w-[85%] shadow-md ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-md"
                        : "bg-gray-700 text-gray-200 rounded-tl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-400 px-3 py-2 text-sm rounded-xl rounded-tl-md flex items-center">
                  <Loader size={16} className="animate-spin mr-2" /> Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your question..."
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className={`text-white px-3 py-2 rounded-lg transition duration-200 ${
                  loading || !input.trim()
                    ? "bg-gray-600 opacity-70 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                aria-label="Send Message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
