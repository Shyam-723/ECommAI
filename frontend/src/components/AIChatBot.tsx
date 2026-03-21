'use client';

import { useChat } from '@ai-sdk/react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState('');
  const { messages, sendMessage, isLoading, status } = useChat() as any;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleLocalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInput(e.target.value);
  };

  const handleLocalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim()) return;
    
    const val = localInput;
    setLocalInput('');
    await sendMessage({ text: val });
  };

  useEffect(() => {
    console.log('Current Messages:', messages);
  }, [messages]);

  const getMessageContent = (m: any) => {
    let text = m.content || m.text || '';
    if (!text && Array.isArray(m.parts)) {
      text = m.parts
        .filter((p: any) => p.type === 'text')
        .map((p: any) => p.text)
        .join('');
    }
    
    // Fallback to displaying tool results if no text was generated
    if (!text && m.toolInvocations && m.toolInvocations.length > 0) {
      const tool = m.toolInvocations[0];
      if (tool.toolName === 'searchProducts') {
        if ('result' in tool) {
          const results = tool.result;
          if (results && results.length > 0) {
            text = `Here is what I found:\n` + results.map((p: any) => `- **${p.title}** ($${p.price}): ${p.description}`).join('\n');
          } else {
            text = `I couldn't find any matching products.`;
          }
        } else {
          text = `*(Searching catalog...)*`;
        }
      }
    }
    
    return text;
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#232F3E] to-[#37475A] text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Shopping Assistant</h3>
                <span className="text-[10px] text-gray-300 uppercase tracking-wider">AI Powered</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-1 rounded-md transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/30">
            {messages.length === 0 && (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 font-medium">Hello! How can I help you today?</p>
                <p className="text-xs text-gray-400 mt-1">Try asking for specific items or prices.</p>
              </div>
            )}
            
            {messages.map((m: any) => (
              <div 
                key={m.id} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-[#FFD814] text-gray-900 rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 opacity-60 text-[10px] font-bold uppercase tracking-tighter">
                    {m.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                    {m.role === 'user' ? 'You' : 'Assistant'}
                  </div>
                  <div className="prose prose-sm max-w-none prose-headings:text-sm prose-p:leading-relaxed">
                    <ReactMarkdown>{getMessageContent(m)}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl text-sm border border-gray-100 rounded-bl-none shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-[#37475A]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleLocalSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              className="flex-grow p-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#FFD814] outline-none transition-all placeholder:text-gray-400"
              value={localInput}
              placeholder="Ask about products..."
              onChange={handleLocalInputChange}
            />
            <button 
              type="submit" 
              disabled={isLoading || !localInput.trim()}
              className="p-2.5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <Send size={18} strokeWidth={2.5} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-white text-gray-800' : 'bg-[#232F3E] text-white'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD814] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FFD814]"></span>
          </span>
        )}
      </button>
    </div>
  );
}
