import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import diaraChatVideo from '../../assets/Diara/ChatWithus/Diarachatwithus.mp4';
import './DiaraChatWidget.css';

export default function DiaraChatWidget() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Check scroll position: show when scrolled past hero section (~450px)
  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.75;
      if (window.scrollY > heroThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        // Automatically close chat window if scrolled back to Hero Section
        setIsChatOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const isArabic = (i18n.language || '').toLowerCase() === 'ar';

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none select-none">
          
          {/* Chat Window Modal (Placeholder Box) */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`w-[320px] sm:w-[360px] bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl shadow-[0_20px_50px_rgba(14,165,233,0.2)] mb-4 overflow-hidden pointer-events-auto ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                {/* Chat Box Header */}
                <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-4 text-white flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/80 bg-white shrink-0">
                      <video
                        src={diaraChatVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain p-0.5"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-tight">Diara AI Assistant</h4>
                      <span className="flex items-center space-x-1 rtl:space-x-reverse text-[11px] text-sky-100">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Online</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer text-white/90 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Chat Box Body / Messages */}
                <div className="p-4 h-[220px] overflow-y-auto space-y-3 bg-slate-50/50">
                  <div className="flex items-start space-x-2 rtl:space-x-reverse">
                    <div className="p-1.5 rounded-lg bg-sky-100 text-sky-600 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-3 text-xs text-slate-700 shadow-sm max-w-[85%] leading-relaxed">
                      {isArabic
                        ? 'مرحباً! أنا ديارا. كيف يمكنني مساعدتك في مشروعك اليوم؟'
                        : isRTL 
                        ? 'سلام! من دیارا هستم. چطور می‌توانم در ساخت یا ارتقای وب‌سایت شما کمکتان کنم؟'
                        : i18n.language === 'sv'
                        ? 'Hej! Jag är Diara. Hur kan jag hjälpa dig med ditt projekt idag?'
                        : 'Hi! I am Diara. How can I assist you with your project today?'
                      }
                    </div>
                  </div>
                </div>

                {/* Chat Input Placeholder */}
                <div className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isArabic ? 'اكتب رسالتك هنا...' : isRTL ? 'پیام خود را بنویسید...' : 'Type a message...'}
                    className="flex-grow bg-slate-100 text-slate-800 text-xs px-3.5 py-2.5 rounded-full border border-transparent focus:border-sky-400 focus:bg-white outline-none transition-all"
                  />
                  <button className="p-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white transition-all shadow-md active:scale-95 cursor-pointer shrink-0">
                    <Send className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Video Avatar Button (Bottom-Right) */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="pointer-events-auto"
          >
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="group relative flex items-center justify-center cursor-pointer outline-none focus:outline-none"
              title="Chat with Diara"
            >
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 group-hover:scale-105 animate-pulse" />

              {/* Inner Video Container (20% Larger & Clean) */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-0.5 bg-gradient-to-br from-sky-400 via-blue-500 to-sky-300 shadow-2xl overflow-hidden border-2 border-white transition-transform duration-300 group-hover:scale-105">
                <video
                  src={diaraChatVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain p-0.5 bg-white rounded-full"
                />
              </div>

              {/* Hover Badge Label */}
              <span className="absolute right-full mr-3 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {isArabic ? 'محادثة مع ديارا' : isRTL ? 'گفتگو با دیارا' : i18n.language === 'sv' ? 'Chatta med Diara' : 'Chat with Diara'}
              </span>
            </button>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
