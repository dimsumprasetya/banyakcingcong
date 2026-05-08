import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Loader2, User, Bot, RefreshCw, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Character, Message } from "../types";
import { getCharacterResponse } from "../services/geminiService";

interface ChatInterfaceProps {
  character: Character;
}

export default function ChatInterface({ character }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        role: 'model',
        content: character.greeting,
        timestamp: Date.now()
      }
    ]);
  }, [character]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getCharacterResponse(
        character.prompt,
        messages,
        input
      );

      const aiMessage: Message = {
        role: 'model',
        content: response || "...",
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'model',
        content: error instanceof Error ? error.message : "Terjadi kesalahan...",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'model',
        content: character.greeting,
        timestamp: Date.now()
      }
    ]);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sim-yellow/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sim-yellow/10 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none" />

      {/* Header */}
      <header className="bg-sim-yellow shadow-md border-b-2 border-sim-black px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <img
            src={character.avatar}
            alt={character.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full object-cover border-2 border-sim-black bg-white shadow-sm"
          />
          <div>
            <h2 className="font-bold text-sim-black text-xl leading-tight drop-shadow-sm">{character.name}</h2>
            <p className="text-xs text-sim-black font-bold flex items-center gap-1 opacity-70">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse border border-sim-black" />
              Online lho!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            id="info-toggle-btn"
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-full transition-colors border-2 border-sim-black shadow-sm ${showInfo ? 'bg-sim-black text-white' : 'bg-white text-sim-black hover:bg-slate-50'}`}
            title="Info Tokoh"
          >
            <Info size={20} />
          </button>
          <button 
            id="clear-chat-btn"
            onClick={clearChat}
            className="p-2 bg-white text-sim-black border-2 border-sim-black hover:bg-slate-50 rounded-full transition-colors shadow-sm"
            title="Mulai Ulang Percakapan"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </header>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b border-slate-200 overflow-hidden z-10 shadow-inner"
          >
            <div className="p-6 flex gap-4">
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tentang {character.name}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{character.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] rounded font-bold uppercase">{character.role}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar z-0"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              id={`msg-${idx}`}
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex items-center gap-2 mb-1 px-1 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`p-1 rounded-full border border-sim-black ${msg.role === 'user' ? 'bg-sim-yellow text-sim-black' : 'bg-white text-sim-black'}`}>
                  {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                </div>
                <span className="text-[10px] font-bold text-sim-black uppercase tracking-tighter">
                  {msg.role === 'user' ? 'Me' : character.name}
                </span>
              </div>
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <div className="p-1 rounded-full bg-slate-100 text-slate-400">
                  <Bot size={12} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {character.name} sedang mengetik...
                </span>
              </div>
              <div className="chat-bubble-ai flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-indo-red" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Form */}
      <div className="p-6 bg-transparent z-10">
        <form 
          onSubmit={handleSend}
          className="max-w-4xl mx-auto flex items-center gap-3 bg-white p-2 pl-4 rounded-full shadow-lg border border-slate-200 focus-within:ring-2 focus-within:ring-indo-red/20 transition-all"
        >
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ketik pesan untuk ${character.name}...`}
            className="flex-1 bg-transparent border-none outline-none text-slate-800 text-sm py-2"
          />
          <button
            id="send-btn"
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-sim-yellow text-sim-black p-4 rounded-full hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0_rgba(0,0,0,1)] border-2 border-sim-black active:translate-y-1 active:shadow-none"
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-[0.2em] font-medium">
          Ditenagai oleh <Sparkles size={10} className="inline mb-0.5" /> AI Studio
        </p>
      </div>
    </div>
  );
}
