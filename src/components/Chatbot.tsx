// import React, { useState } from "react";
// import axios from "axios";

// type Message = {
//   role: "user" | "bot";
//   text: string;
// };

// const ChatBot: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessage: Message = { role: "user", text: input };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.post(`http://localhost:5000/api/chat`, {
//         message: newMessage.text,
//       });

//       const reply = res.data.reply || "Sorry, I didn’t get that.";
//       setMessages((prev) => [...prev, { role: "bot", text: reply }]);
//     } catch (err) {
//       console.error("Chat error:", err);
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", text: "Oops! Something went wrong. Try again." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 p-4">
//       <div className="flex-1 overflow-y-auto space-y-4 mb-4 bg-white rounded-2xl shadow p-4">
//         {messages.length > 0 ? (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.role === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-xl max-w-[75%] ${
//                   msg.role === "user"
//                     ? "bg-blue-600 text-white rounded-br-none"
//                     : "bg-gray-200 text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))
//         ) : (
//           <h1>Start Asking</h1>
//         )}
//         {loading && (
//           <div className="text-gray-500 italic text-sm">Thinking...</div>
//         )}
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Ask me anything..."
//           className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={sendMessage}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;


import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, MessageSquare, X, Loader } from "lucide-react"; // Assuming you have lucide-react or similar icon library

type Message = {
  role: "user" | "bot";
  text: string;
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // New state for toggling the chat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
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
      // NOTE: Using a relative path is often better, but keeping the absolute URL for consistency with original code
      const res = await axios.post(`http://localhost:5000/api/chat`, {
        message: newMessage.text,
      });

      const reply = res.data.reply || "Sorry, I didn’t get that. Try asking about the stock or related market topics!";
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Oops! I ran into an error. Please try again or check the server status." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Fixed container for the entire chatbot widget
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white rounded-full p-4 shadow-2xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
          aria-label="Open Chatbot"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      <div
        className={`bg-gray-800 border border-gray-700 rounded-xl shadow-2xl transition-all duration-300 ${
          isOpen
            ? "w-80 h-96 opacity-100 pointer-events-auto" // Open state
            : "w-0 h-0 opacity-0 pointer-events-none" // Closed state
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
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

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 italic mt-8">
                <p>Hello! Ask me about the current stock, market trends, or financial terms.</p>
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

          {/* Input Area */}
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


// import React, { useState, useRef, useEffect, useCallback } from "react";
// import axios from "axios";
// import { Send, MessageSquare, X, Loader, Move } from "lucide-react";

// type Message = {
//   role: "user" | "bot";
//   text: string;
// };

// // Define initial position for the draggable widget
// const INITIAL_POSITION = { x: 300, y: 300 }; // Default offset from bottom-right (for a w-80 h-96 size)

// const ChatBot: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Dragging states
//   const [position, setPosition] = useState(INITIAL_POSITION);
//   const [isDragging, setIsDragging] = useState(false);
//   const dragStartPos = useRef({ x: 0, y: 0 });
//   const chatRef = useRef<HTMLDivElement>(null);

//   // --- Drag Logic Handlers ---

//   const handleMouseDown = useCallback((e: React.MouseEvent) => {
//     setIsDragging(true);
//     // Store the starting mouse position
//     dragStartPos.current = {
//       x: e.clientX - position.x,
//       y: e.clientY - position.y,
//     };
//   }, [position]);

//   const handleMouseMove = useCallback((e: MouseEvent) => {
//     if (!isDragging) return;
//     // Calculate new position based on mouse movement
//     let newX = e.clientX - dragStartPos.current.x;
//     let newY = e.clientY - dragStartPos.current.y;
    
//     // Simple boundary check (optional, but good practice)
//     const chatElement = chatRef.current;
//     if (chatElement) {
//       const parentWidth = window.innerWidth;
//       const parentHeight = window.innerHeight;
//       const chatWidth = chatElement.offsetWidth;
//       const chatHeight = chatElement.offsetHeight;

//       newX = Math.max(0, Math.min(newX, parentWidth - chatWidth));
//       newY = Math.max(0, Math.min(newY, parentHeight - chatHeight));
//     }

//     setPosition({ x: newX, y: newY });
//   }, [isDragging]);

//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//   }, []);

//   // Attach/detach global mouse listeners
//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     } else {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     }

//     // Cleanup function
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, handleMouseMove, handleMouseUp]);
  
//   // --- End Drag Logic ---


//   // Auto-scroll to the latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const newMessage: Message = { role: "user", text: input };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.post(`http://localhost:5000/api/chat`, {
//         message: newMessage.text,
//       });

//       const reply = res.data.reply || "Sorry, I didn’t get that. Try asking about the stock or related market topics!";
//       setMessages((prev) => [...prev, { role: "bot", text: reply }]);
//     } catch (err) {
//       console.error("Chat error:", err);
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", text: "Oops! I ran into an error. Please try again or check the server status." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // Fixed container for the entire chatbot widget
//     <div className="fixed bottom-0 right-0 z-50">
//       {/* Chat Toggle Button */}
//       {!isOpen && (
//         <button
//           onClick={() => {
//             setIsOpen(true);
//             // On open, reset to the default position if it hasn't been dragged far
//             if (position.x === INITIAL_POSITION.x && position.y === INITIAL_POSITION.y) {
//                  setPosition({ x: window.innerWidth - 320, y: window.innerHeight - 440 }); // Initial position to keep it floating above bottom-right
//             }
//           }}
//           className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-2xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
//           aria-label="Open Stock Assistant"
//         >
//           <MessageSquare size={24} />
//         </button>
//       )}

//       {/* Chat Window */}
//       <div
//         ref={chatRef}
//         className={`fixed bg-gray-800 border border-gray-700 rounded-xl shadow-2xl transition-all duration-300 ${
//           isOpen
//             ? "w-80 h-96 opacity-100 pointer-events-auto"
//             : "w-0 h-0 opacity-0 pointer-events-none"
//         }`}
//         style={{
//           transform: `translate(${position.x}px, ${position.y}px)`,
//           // If we are dragging, we don't want the transition
//           transition: isDragging ? 'none' : 'opacity 0.3s, transform 0.3s',
//         }}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header (Drag Handle) */}
//           <div
//             className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900 rounded-t-xl cursor-move select-none"
//             onMouseDown={handleMouseDown}
//           >
//             <h3 className="text-lg font-bold text-indigo-400 flex items-center">
//               <Move size={18} className="mr-2 text-gray-400" /> Stock Assistant
//             </h3>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-gray-400 hover:text-white transition duration-200 p-1 rounded-full hover:bg-gray-700 focus:outline-none"
//               aria-label="Close Chatbot"
//               onMouseDown={(e) => e.stopPropagation()} // Prevent closing click from triggering drag
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* Messages Area */}
//           <div className="flex-1 overflow-y-auto space-y-4 p-4 custom-scrollbar">
//             {messages.length === 0 ? (
//               <div className="text-center text-gray-500 italic mt-8">
//                 <p>Hello! Ask me about this stock, market trends, or financial terms.</p>
//               </div>
//             ) : (
//               messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${
//                     msg.role === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`px-3 py-2 text-sm rounded-xl max-w-[85%] shadow-md ${
//                       msg.role === "user"
//                         ? "bg-indigo-600 text-white rounded-br-md"
//                         : "bg-gray-700 text-gray-200 rounded-tl-md"
//                     }`}
//                   >
//                     {msg.text}
//                   </div>
//                 </div>
//               ))
//             )}
//             {loading && (
//               <div className="flex justify-start">
//                 <div className="bg-gray-700 text-gray-400 px-3 py-2 text-sm rounded-xl rounded-tl-md flex items-center">
//                   <Loader size={16} className="animate-spin mr-2" /> Thinking...
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Area */}
//           <div className="p-4 border-t border-gray-700">
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder="Type your question..."
//                 disabled={loading}
//                 className="flex-1 px-4 py-2 border border-gray-600 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
//               />
//               <button
//                 onClick={sendMessage}
//                 disabled={loading || !input.trim()}
//                 className={`text-white px-3 py-2 rounded-lg transition duration-200 ${
//                   loading || !input.trim()
//                     ? "bg-gray-600 opacity-70 cursor-not-allowed"
//                     : "bg-indigo-600 hover:bg-indigo-700"
//                 }`}
//                 aria-label="Send Message"
//               >
//                 <Send size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;