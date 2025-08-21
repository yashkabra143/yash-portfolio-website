import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function N8nChatWidget() {
  useEffect(() => {
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
        },
      },
      enableStreaming: false,
    });
  }, []);

  return <div id="n8n-chat"></div>;
}
