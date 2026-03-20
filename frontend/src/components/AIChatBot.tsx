"use client";
// @ts-nocheck

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = (useChat as any)({
    api: '/api/chat',
    maxSteps: 5,
    onError: (e: any) => alert("Chatbot Error: " + e.message)
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-[#007185] text-white rounded-full shadow-lg hover:bg-[#005d6e] transition-transform duration-300 z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-[380px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-[#232F3E] text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <Bot size={24} className="text-[#F3A847]" />
            <div>
              <h3 className="font-bold text-sm">Amazon AI Assistant</h3>
              <p className="text-[10px] text-gray-300">Powered by Llama 3 on Groq</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 text-sm mt-10">
              <Bot size={40} className="mx-auto text-gray-300 mb-2" />
              <p>Hello! I can search the store for you.</p>
              <p className="mt-1">Try asking: "Find a graphics card under $800"</p>
            </div>
          )}

          {messages.map((m: any) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-[#007185] text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
              >
                {/* Text Content */}
                {m.content && (
                   <p className="whitespace-pre-wrap">{m.content}</p>
                )}
                
                {/* Tool Invocations (shows loading state while DB is queried) */}
                {m.toolInvocations?.map((t: any) => (
                  <div key={t.toolCallId} className="flex items-center gap-2 text-xs text-gray-400 italic mt-1">
                    {t.state === 'result' ? (
                       <span>✓ Searched for "{t.args?.searchTerm}"</span>
                    ) : (
                       <>
                         <Loader2 size={12} className="animate-spin" />
                         Searching database for "{t.args?.searchTerm}"...
                       </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
             <div className="flex justify-start">
               <div className="bg-white text-gray-800 border border-gray-100 p-3 rounded-2xl rounded-tl-none text-sm shadow-sm flex items-center gap-2">
                 <Loader2 size={14} className="animate-spin text-[#007185]" />
                 Thinking...
               </div>
             </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-200 rounded-b-2xl">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask the AI assistant..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F3A847] focus:border-transparent transition-all shadow-inner bg-gray-50"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input?.trim()}
              className="bg-[#FEBD69] p-2 rounded-full text-gray-800 hover:bg-[#F3A847] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center min-w-[40px]"
            >
              <Send size={18} />
            </button>
          </form>
          <div className="text-center mt-2">
             <span className="text-[10px] text-gray-400">Rate Limit: 5 queries per minute</span>
          </div>
        </div>
      </div>
    </>
  );
}
