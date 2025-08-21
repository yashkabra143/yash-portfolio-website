import { useEffect, useState } from 'react';

export default function N8nChatWidget() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChatWidget = async () => {
      try {
        // Dynamically import the n8n chat package
        const { createChat } = await import('@n8n/chat');
        await import('@n8n/chat/style.css');
        
        createChat({
          webhookUrl: 'https://triggerandflow.in/webhook/16b35e59-8e87-4bdd-aa59-e6609e16599f/chat',
          webhookConfig: {
            method: 'POST',
            headers: {}
          },
          target: '#n8n-chat',
          mode: 'window',
          chatInputKey: 'chatInput',
          chatSessionKey: 'sessionId',
          loadPreviousSession: true,
          metadata: {},
          showWelcomeScreen: false,
          defaultLanguage: 'en',
          initialMessages: [
            'Hi there! 👋',
            "I'm Yash's AI assistant. How can I help you today?"
          ],
          i18n: {
            en: {
              title: "Chat with Yash's AI",
              subtitle: "Ask me anything about Yash's experience, skills, or projects!",
              footer: '',
              getStarted: 'New Conversation',
              inputPlaceholder: 'Type your question...',
              closeButtonTooltip: 'Close chat',
            },
          },
          enableStreaming: false,
        });
        
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to initialize n8n chat widget:', error);
        setError('Chat widget failed to load');
      }
    };

    // Add a small delay to ensure the DOM is ready
    const timer = setTimeout(loadChatWidget, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div id="n8n-chat">
        <div style={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          background: 'hsl(var(--primary))', 
          color: 'white', 
          padding: '12px 16px', 
          borderRadius: '8px', 
          fontSize: '14px',
          zIndex: 1000
        }}>
          Chat temporarily unavailable
        </div>
      </div>
    );
  }

  return (
    <div id="n8n-chat">
      {!isLoaded && (
        <div style={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          background: 'hsl(var(--primary))', 
          color: 'white', 
          padding: '12px 16px', 
          borderRadius: '8px', 
          fontSize: '14px',
          zIndex: 1000
        }}>
          Loading chat...
        </div>
      )}
    </div>
  );
}
