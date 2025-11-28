import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Trash2, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: "Hey there! 👋 I'm Yash's AI assistant. Ask me about Quality Assurance, test automation, or his projects!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://triggerandflow.in/webhook/16b35e59-8e87-4bdd-aa59-e6609e16599f/chat';

      const response = await fetch(
        webhookUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chatInput: input,
            sessionId: localStorage.getItem('chatSessionId') || Date.now().toString(),
          }),
        }
      );

      let botReply = 'Sorry, I encountered an error. Please try again.';

      if (response.ok) {
        const data = await response.json();

        // Handle different response formats from n8n
        if (data.output) {
          botReply = data.output;
        } else if (data.message) {
          botReply = data.message;
        } else if (typeof data === 'string') {
          botReply = data;
        } else if (data.text) {
          botReply = data.text;
        }

        // Save session ID if provided
        if (data.sessionId) {
          localStorage.setItem('chatSessionId', data.sessionId);
        }
      } else {
        console.error('Webhook error:', response.status);
        botReply = `Error: ${response.status}. Please check your n8n workflow.`;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Connection error. Please check your internet connection.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: "Chat cleared! How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    localStorage.removeItem('chatSessionId');
  };

  return (
    <>
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-40 animate-bounce-subtle"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-full sm:w-96 max-w-[calc(100vw-32px)] h-[600px] max-h-[calc(100vh-32px)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 dark:border-slate-800 animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Chat with Yash</h3>
                <p className="text-xs opacity-90 font-medium">AI Assistant • Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                title="Clear chat"
                aria-label="Clear chat"
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-700">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-slate-700'
                    }`}
                >
                  <div className={`text-sm ${msg.sender === 'user' ? 'text-white' : 'text-gray-800 dark:text-gray-100'}`}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                        li: ({ node, ...props }) => <li className="" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                        a: ({ node, ...props }) => <a className={`underline hover:no-underline break-all ${msg.sender === 'user' ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} target="_blank" rel="noopener noreferrer" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                        code: ({ node, ...props }) => <code className={`px-1 py-0.5 rounded text-xs font-mono ${msg.sender === 'user' ? 'bg-white/20' : 'bg-gray-100 dark:bg-slate-700'}`} {...props} />,
                        pre: ({ node, ...props }) => <pre className={`p-2 rounded-lg overflow-x-auto mb-2 text-xs ${msg.sender === 'user' ? 'bg-black/20' : 'bg-gray-100 dark:bg-slate-900'}`} {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-slate-700">
                  <div className="flex space-x-2 items-center h-5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
            <div className="flex gap-2 items-end">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-all resize-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-3 rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
              >
                {isLoading ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-gray-400 dark:text-slate-500">
                Powered by n8n & AI • May produce inaccurate info
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
