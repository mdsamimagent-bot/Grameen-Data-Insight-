
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Bot, User } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { SiteConfig } from '../types';

interface ChatBotProps {
  config: SiteConfig;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hello! I am the GDI Assistant. How can I help you with your market research needs in Bangladesh today?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `
        You are the official AI Assistant for Grameen Data Insight (GDI). 
        GDI is a professional market research and survey firm operating in Bangladesh.
        
        STRICT GUIDELINES:
        1. Only discuss topics related to GDI, market research, data collection, and surveys.
        2. If a user asks about anything unrelated to GDI or market research, politely inform them that you are only programmed to assist with GDI's business and research inquiries.
        3. Always refer to the company as "Grameen Data Insight (GDI)" or simply "GDI".
        4. Be professional, polite, and persuasively present GDI as the best choice for research in Bangladesh.
        5. Provide contact details when asked: 
           - Phone: ${config.contactPhone}
           - WhatsApp: ${config.contactWhatsapp}
           - Email: ${config.contactEmail}
           - Address: ${config.contactAddress}
           - Facebook Page: ${config.contactFacebookName}
           - Facebook Link: ${config.contactFacebookLink}
        6. Use the following real-time statistics when asked about GDI's reach:
           - Households Surveyed: ${config.householdCount}
           - Active Agent Network: ${config.activeAgentsCount}
           - District Coverage: ${config.districtCount} (All 64 districts)
           - Data Accuracy Rate: ${config.accuracyRate}
        7. If asked about costs or starting a project, explain that GDI offers custom pricing based on project scope and encourage them to use the "Start Project" button or contact the team directly for a detailed proposal. GDI covers all aspects from project design to data analysis.
        8. Mention that GDI works across all sectors: NGOs, Corporate, Startups, and Government.
        9. Do NOT share information about any other persons, companies, or entities not associated with GDI.
        10. Your tone should be that of a helpful, high-level business consultant representing the GDI brand with excellence.
      `;

      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      const botText = response.text || "I'm sorry, I couldn't process that. Please contact our support team.";
      
      setMessages(prev => [...prev, { role: 'model', text: botText }]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly via phone or WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white overflow-hidden group"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, rotateX: -20 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 flex flex-col overflow-hidden perspective-1000"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-green-600 to-green-700 text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-outfit font-bold text-lg">GDI Assistant</h3>
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-green-200">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  Official Representative
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-br-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-green-600" />
                    <span className="text-xs text-slate-400 font-bold uppercase">GDI is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about GDI services..."
                  className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 bottom-2 w-10 bg-green-600 text-white rounded-xl flex items-center justify-center hover:bg-green-700 transition-all disabled:opacity-50 active:scale-95 shadow-lg"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="mt-2 text-[9px] text-center text-slate-400 font-bold uppercase tracking-wider">
                Powered by GDI Intelligent Research System
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
