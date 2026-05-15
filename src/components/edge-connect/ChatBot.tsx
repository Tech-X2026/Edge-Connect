'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Trash2, Bot, User } from 'lucide-react';
import { useChatStore } from '@/lib/chat-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatBot() {
  const {
    messages,
    isOpen,
    isLoading,
    setIsOpen,
    toggleOpen,
    addMessage,
    setLoading,
    clearMessages,
  } = useChatStore();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Send message to API
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user' as const,
      content: input.trim(),
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.reply) {
        addMessage({
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date(),
        });
      } else if (data.error) {
        addMessage({
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again or contact our team directly.',
          timestamp: new Date(),
        });
      }
    } catch {
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again or reach out to us directly.',
        timestamp: new Date(),
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle keyboard submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleOpen}
        className="h-14 w-14 rounded-full bg-[#00B4D8] text-white shadow-lg shadow-[#00B4D8]/30
                   flex items-center justify-center hover:bg-[#0096c7] transition-colors"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pulse ring animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#00B4D8] animate-ping opacity-20" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-[380px] h-[520px] rounded-2xl
                       bg-[#023047]/95 backdrop-blur-xl border border-[#00B4D8]/20
                       shadow-2xl shadow-[#00B4D8]/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#00B4D8]/20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-[#00B4D8]/20 flex items-center justify-center">
                  <Bot className="h-4.5 w-4.5 text-[#00B4D8]" />
                </div>
                <div>
                  <span className="text-white font-semibold text-sm block leading-tight">
                    EDGE AI Assistant
                  </span>
                  <span className="text-[#00B4D8] text-xs leading-tight">
                    Always here to help
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearMessages}
                className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8"
                aria-label="Clear chat history"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 h-full">
              <div className="p-4 space-y-3">
                {/* Empty state / Welcome message */}
                {messages.length === 0 && (
                  <div className="text-center text-white/50 py-12">
                    <div className="h-16 w-16 rounded-full bg-[#00B4D8]/10 flex items-center justify-center mx-auto mb-4">
                      <Bot className="h-8 w-8 text-[#00B4D8]/60" />
                    </div>
                    <p className="text-white/70 font-medium text-sm">
                      Hi! I&apos;m EDGE AI Assistant.
                    </p>
                    <p className="text-xs mt-1.5 text-white/40">
                      Ask me about SEO, marketing, web design, or any of our services!
                    </p>
                    {/* Quick action suggestions */}
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      {[
                        'What services do you offer?',
                        'Tell me about SEO',
                        'Web design pricing',
                        'Performance marketing',
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            setInput(suggestion);
                          }}
                          className="text-xs bg-white/5 hover:bg-[#00B4D8]/20 border border-white/10
                                     hover:border-[#00B4D8]/30 rounded-full px-3 py-1.5
                                     text-white/60 hover:text-white transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message bubbles */}
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-2 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* Assistant avatar */}
                    {msg.role === 'assistant' && (
                      <div className="h-7 w-7 rounded-full bg-[#00B4D8]/20 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="h-3.5 w-3.5 text-[#00B4D8]" />
                      </div>
                    )}

                    {/* Message content */}
                    <div
                      className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#00B4D8] text-white rounded-br-md'
                          : 'bg-white/10 text-white/90 rounded-bl-md'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* User avatar */}
                    {msg.role === 'user' && (
                      <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                        <User className="h-3.5 w-3.5 text-white/70" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <div className="flex gap-2 items-start">
                    <div className="h-7 w-7 rounded-full bg-[#00B4D8]/20 flex items-center justify-center shrink-0">
                      <Bot className="h-3.5 w-3.5 text-[#00B4D8]" />
                    </div>
                    <div className="bg-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full bg-[#00B4D8] animate-bounce"
                          style={{ animationDelay: '0ms' }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-[#00B4D8] animate-bounce"
                          style={{ animationDelay: '150ms' }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-[#00B4D8] animate-bounce"
                          style={{ animationDelay: '300ms' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-3 border-t border-[#00B4D8]/20 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our services..."
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30
                             focus:border-[#00B4D8]/50 focus:ring-[#00B4D8]/20 rounded-xl h-10"
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-[#00B4D8] hover:bg-[#0096c7] rounded-xl px-3 h-10 shrink-0
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
