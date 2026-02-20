import React, { useEffect, useRef, useState } from "react";

const suggestions = [
  "🔥 Spicy items",
  "🥗 Veg food",
  "⭐ Top rated",
  "💸 Under ₹150",
  "🍔 Burgers",
];

const ChefAssistantSheet = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      setMessages([
        {
          sender: "chef",
          text: "👋 Hello! I’m your personal Chef.\nWhat would you love to eat today?",
        },
      ]);
    }
  }, [open]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text },
      {
        sender: "chef",
        text: "😋 Got it! Let me find something delicious for you…",
      },
    ]);
    setInput("");
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50
        bg-white/90 backdrop-blur-xl
        rounded-t-[28px] shadow-[0_-10px_40px_rgba(0,0,0,0.15)]
        h-[78%] flex flex-col
        animate-[slideUp_0.35s_ease-out]"
      >
        {/* Drag Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3" />

        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-3 border-b">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
            <span className="text-xl text-white">👨‍🍳</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Chef Assistant</p>
            <p className="text-[11px] text-gray-500">
              Your personal food guide
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed
              rounded-2xl shadow-sm
              ${
                msg.sender === "chef"
                  ? "bg-gray-100 text-gray-800 rounded-tl-sm"
                  : "bg-gradient-to-br from-orange-500 to-red-500 text-white ml-auto rounded-tr-sm"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestions */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="shrink-0 px-4 py-2 rounded-full
              bg-white border border-gray-200
              text-xs font-semibold text-gray-700
              shadow-sm hover:shadow-md hover:scale-105
              transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white/80 backdrop-blur">
          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 shadow-inner">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me your craving…"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
            <button
              onClick={() => sendMessage(input)}
              className="w-10 h-10 rounded-full
              bg-gradient-to-br from-orange-500 to-red-500
              text-white font-bold
              flex items-center justify-center
              shadow-md hover:scale-105 transition"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChefAssistantSheet;
