import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BotIcon, Send, Paperclip, X } from "lucide-react";

// Utility for combining class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Decorative background image with blur
const BackgroundImage = () => (
  <div
    className="fixed inset-0 w-full h-full z-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80')",
      filter: "blur(6px) brightness(0.8) contrast(1.1)",
    }}
    aria-hidden="true"
  />
);

// Floating "particle" animation layer
const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(14)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/25 ring-1 ring-white/20 shadow-lg"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 34 + 14}px`,
          height: `${Math.random() * 34 + 14}px`,
        }}
        animate={{ y: [0, -35, 0], x: [0, 25, 0], opacity: [0.7, 0.45, 0.7] }}
        transition={{
          duration: Math.random() * 7 + 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const MIN_HEIGHT = 48;
const MAX_HEIGHT = 164;

// Auto-resize logic for textarea
function useAutoResizeTextarea({ minHeight, maxHeight }) {
  const textareaRef = useRef(null);
  const adjustHeight = useCallback(
    (reset) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      textarea.style.height = `${minHeight}px`;
      textarea.style.height =
        Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight || Infinity)) + "px";
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) textarea.style.height = `${minHeight}px`;
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

// Message bubble for chat display
const Message = ({ content, isUser, timestamp }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={cn("flex flex-col w-full", isUser ? "items-end" : "items-start")}
  >
    <div
      className={cn(
        "rounded-2xl p-4 max-w-[85%] break-words shadow-md",
        isUser
          ? "bg-gradient-to-r from-[#ff3f17]/80 to-[#ff6a00]/90 text-white rounded-br-none"
          : "bg-white/30 dark:bg-[#181920]/80 rounded-bl-none border border-white/30 dark:border-white/10"
      )}
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <div className="flex items-start gap-3">
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#ff3f17] to-[#ff6a00] flex items-center justify-center">
            <BotIcon className="w-4 h-4 text-white" />
          </div>
        )}
        <div className="flex-1">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </div>
      <div className="text-xs opacity-70 mt-2 text-right">
        {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  </motion.div>
);

// Enhanced input area with w-full container as requested
const AiInput = ({ onSend }) => {
  const [value, setValue] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) fileInputRef.current.value = "";
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (value.trim() === "" && !imagePreview) return;
    onSend(value, imagePreview);
    setValue("");
    setImagePreview(null);
    adjustHeight(true);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <div className="w-full py-4">
      <div className="relative w-full rounded-2xl bg-white/20 dark:bg-[#20262e]/30 border border-white/20 backdrop-blur-xl shadow-lg">
        <FloatingParticles />
        <div className="p-2">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={value}
              placeholder="Message Gemini Ai..."
              className={cn(
                "w-full rounded-2xl px-4 py-3 text-base border-none",
                "text-black dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#ff6a00]/30",
                "shadow-md placeholder:text-gray-400 dark:placeholder:text-gray-400",
                "bg-white/10 dark:bg-white/10 focus:bg-white/20 dark:focus:bg-white/20 leading-[1.25] transition-all duration-200"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{ minHeight: MIN_HEIGHT, maxHeight: MAX_HEIGHT }}
              rows={1}
            />
          </div>
        </div>
        <div className="relative h-14 px-4 flex items-center border-t border-white/20 bg-white/10 dark:bg-[#16191e]/30 rounded-b-2xl">
          <label
            className={cn(
              "cursor-pointer group relative rounded-full p-2 transition",
              imagePreview
                ? "bg-[#ff3f17]/15 border border-[#ff3f17] text-[#ff3f17] shadow"
                : "bg-black/10 dark:bg-white/10 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
            )}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
            <Paperclip className={cn("w-4 h-4", imagePreview && "text-[#ff3f17]")} />
            <AnimatePresence>
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute w-[110px] h-[110px] left-0 top-14 shadow-xl"
                >
                  <div className="relative w-full h-full">
                    <img
                      className="object-cover rounded-xl w-full h-full border-2 border-[#ff3f17]/30 bg-white"
                      src={imagePreview}
                      alt="Attachment preview"
                    />
                    <button
                      onClick={handleClose}
                      className="bg-white text-[#ff3f17] absolute -top-2 -right-2 shadow-lg rounded-full w-6 h-6 flex items-center justify-center ring-1 ring-[#ff3f17]/40 hover:bg-[#fff] transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </label>
          <div className="ml-auto">
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={value.trim() === "" && !imagePreview}
              className={cn(
                "rounded-full p-2 transition-all shadow flex items-center justify-center",
                value || imagePreview
                  ? "bg-gradient-to-r from-[#ff3f17] to-[#ff6a00] text-white"
                  : "bg-black/10 dark:bg-white/10 text-black/40 dark:text-white/40"
              )}
              whileHover={value || imagePreview ? { scale: 1.08 } : {}}
              whileTap={value || imagePreview ? { scale: 0.95 } : {}}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function GeminiChatApp() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm Gemini Ai. How can I assist you today?",
      isUser: false,
      timestamp: Date.now() - 60000,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (content, image) => {
    if (!content.trim() && !image) return;
    const newUserMessage = {
      id: messages.length + 1,
      content: content.trim(),
      isUser: true,
      timestamp: Date.now(),
      image,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "I understand what you're asking. Here's a detailed response based on my knowledge.",
        "That's an interesting question! I've researched this topic and here's what I found...",
        "Thanks for sharing that. Based on my analysis, I'd suggest the following approach...",
        "I've processed your request. Here's the information you were looking for...",
        "Great question! After considering all factors, my recommendation would be...",
      ];
      const aiResponse = {
        id: messages.length + 2,
        content: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="relative w-full min-h-screen h-[100dvh] flex flex-col overflow-hidden">
      <BackgroundImage />
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#1b151c]/30 via-[#232345]/10 to-[#ff6a00]/5 backdrop-blur-lg" />
      <main className="relative z-10 flex-1 flex flex-col overflow-y-auto py-6 px-4 h-full">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col bg-white/5 dark:bg-black/10 border border-white/10 backdrop-blur-xl rounded-xl p-4">
          <div className="flex flex-col gap-6 flex-1">
            {messages.map((m) => (
              <Message key={m.id} content={m.content} isUser={m.isUser} timestamp={m.timestamp} />
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff3f17] to-[#ff6a00] flex items-center justify-center">
                  <BotIcon className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center gap-1 bg-white/90 dark:bg-[#1f2229]/80 backdrop-blur-md rounded-2xl p-4 rounded-bl-none shadow">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "200ms" }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "400ms" }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>
      <div className="relative z-10 pb-8 pt-2 px-4 border-t border-white/15 bg-white/40 dark:bg-[#181920]/70 backdrop-blur-xl">
        <AiInput onSend={handleSend} />
      </div>
    </div>
  );
}
