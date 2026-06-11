import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, X, MessageCircle, Trash2, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// n8n can reply with { output } / { message } / { text }, a bare string,
// or any of those wrapped in an array — accept them all
function extractBotReply(data: unknown): string | undefined {
  if (typeof data === 'string') return data;
  if (Array.isArray(data)) return extractBotReply(data[0]);
  if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    for (const key of ['output', 'message', 'text', 'reply']) {
      if (typeof obj[key] === 'string' && obj[key]) return obj[key] as string;
    }
  }
  return undefined;
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

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
      const webhookUrl =
        import.meta.env.VITE_N8N_WEBHOOK_URL ||
        'https://triggerandflow.in/webhook/16b35e59-8e87-4bdd-aa59-e6609e16599f/chat';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatInput: input,
          sessionId: localStorage.getItem('chatSessionId') || Date.now().toString(),
        }),
      });

      let botReply = 'Sorry, I encountered an error. Please try again.';

      if (response.ok) {
        const data = await response.json();
        botReply = extractBotReply(data) ?? botReply;
        if (data && typeof data === 'object' && !Array.isArray(data) && typeof data.sessionId === 'string') {
          localStorage.setItem('chatSessionId', data.sessionId);
        }
      } else {
        botReply = `Error ${response.status}. Please try again later.`;
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: botReply, sender: 'bot', timestamp: new Date() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'Connection error. Please check your internet connection.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Floating bubble button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-black dark:bg-white shadow-2xl ring-1 ring-white/10 transition-all duration-300 hover:scale-110 hover:shadow-black/40"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-black dark:bg-white animate-ping opacity-20" />
          <MessageCircle className="h-6 w-6 text-white dark:text-black transition-transform duration-300 group-hover:scale-110" />
          {/* Sparkle badge */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-black shadow ring-1 ring-black/10 dark:ring-white/10">
            <Sparkles className="h-3 w-3 text-black dark:text-white" />
          </span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="flex flex-col w-[370px] h-[580px] rounded-2xl overflow-hidden shadow-2xl border border-border bg-background animate-in slide-in-from-bottom-5 fade-in duration-300">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black dark:bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-9 w-9 border-2 border-white/20 dark:border-black/20">
                  <AvatarFallback className="bg-white/10 dark:bg-black/10">
                    <Bot className="h-4 w-4 text-white dark:text-black" />
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-black dark:border-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white dark:text-black leading-tight">Chat with Yash</p>
                <Badge className="text-[10px] h-4 px-1.5 bg-white/15 dark:bg-black/15 text-white dark:text-black border-0 hover:bg-white/15 gap-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  AI Assistant · Online
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg text-white/60 dark:text-black/60 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                aria-label="Clear chat"
                title="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/60 dark:text-black/60 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1" ref={scrollAreaRef} data-lenis-prevent>
            <div className="flex flex-col gap-4 px-4 py-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 animate-in slide-in-from-bottom-2 duration-200 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className="h-7 w-7 mt-0.5 flex-shrink-0">
                    <AvatarFallback className={msg.sender === 'bot' ? 'bg-black dark:bg-white' : 'bg-muted'}>
                      {msg.sender === 'bot' ? (
                        <Bot className="h-3.5 w-3.5 text-white dark:text-black" />
                      ) : (
                        <User className="h-3.5 w-3.5 text-foreground" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className={`flex flex-col gap-1 max-w-[78%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-black dark:bg-white text-white dark:text-black rounded-tr-sm'
                          : 'bg-muted text-foreground rounded-tl-sm'
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        // User input stays plain text — never parsed as markdown/HTML
                        <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      ) : (
                        <div className="[&_a]:text-primary [&_a]:underline [&_code]:bg-background [&_strong]:font-semibold">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                            components={{
                              ul: ({ ...props }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5" {...props} />,
                              ol: ({ ...props }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5" {...props} />,
                              p: ({ ...props }) => <p className="mb-1.5 last:mb-0" {...props} />,
                              a: ({ ...props }) => <a className="underline hover:no-underline break-all" target="_blank" rel="noopener noreferrer" {...props} />,
                              code: ({ ...props }) => <code className="px-1 py-0.5 rounded text-xs font-mono" {...props} />,
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
                  <Avatar className="h-7 w-7 mt-0.5 flex-shrink-0">
                    <AvatarFallback className="bg-black dark:bg-white">
                      <Bot className="h-3.5 w-3.5 text-white dark:text-black" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-3 border-t border-border bg-background"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 transition-colors focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="rounded-full h-9 w-9 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 flex-shrink-0 border-0"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>

          <p className="text-[10px] text-muted-foreground text-center py-1.5 bg-background border-t border-border/50 flex-shrink-0">
            Powered by n8n & AI · May produce inaccurate info
          </p>
        </div>
      )}
    </div>
  );
}
