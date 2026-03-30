import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, X, MessageCircle, Trash2, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

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
        if (data.output) botReply = data.output;
        else if (data.message) botReply = data.message;
        else if (typeof data === 'string') botReply = data;
        else if (data.text) botReply = data.text;

        if (data.sessionId) localStorage.setItem('chatSessionId', data.sessionId);
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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bubble button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="relative h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-br from-blue-600 to-cyan-500 text-white border-0"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-600 items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </span>
          </span>
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className="w-[380px] h-[580px] flex flex-col shadow-2xl border-2 animate-in slide-in-from-bottom-5 duration-300 p-0 gap-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-blue-600/10 via-cyan-500/5 to-background flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-blue-500/20">
                  <AvatarFallback className="bg-blue-500/10">
                    <Bot className="h-5 w-5 text-blue-600" />
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Chat with Yash</h3>
                <Badge variant="secondary" className="text-xs h-5 px-1.5">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  Online
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                className="h-8 w-8 rounded-full"
                title="Clear chat"
                aria-label="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-4 py-3" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 animate-in slide-in-from-bottom-2 duration-300 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                    <AvatarFallback className={msg.sender === 'bot' ? 'bg-blue-500/10' : 'bg-muted'}>
                      {msg.sender === 'bot' ? (
                        <Bot className="h-4 w-4 text-blue-600" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex flex-col max-w-[75%] ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2.5 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-tr-sm'
                          : 'bg-muted rounded-tl-sm'
                      }`}
                    >
                      <div className={`text-sm leading-relaxed ${msg.sender === 'user' ? '[&_a]:text-blue-100 [&_code]:bg-white/20' : '[&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_code]:bg-background'}`}>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            ul: ({ ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                            ol: ({ ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                            p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                            a: ({ ...props }) => <a className="underline hover:no-underline break-all" target="_blank" rel="noopener noreferrer" {...props} />,
                            code: ({ ...props }) => <code className="px-1 py-0.5 rounded text-xs font-mono" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                    <span className={`text-[10px] mt-1 px-1 ${msg.sender === 'user' ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 animate-in slide-in-from-bottom-2 duration-300">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-blue-500/10">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1 items-center h-4">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="px-4 py-3 border-t bg-muted/30 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 rounded-full"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="rounded-full h-9 w-9 bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 hover:opacity-90 flex-shrink-0"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Powered by n8n & AI · May produce inaccurate info
            </p>
          </form>
        </Card>
      )}
    </div>
  );
}
