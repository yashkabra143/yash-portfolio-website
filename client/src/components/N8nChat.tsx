import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

export default function N8nChat() {
  useEffect(() => {
    createChat({
      webhookUrl: "https://triggerandflow.in/webhook/16b35e59-8e87-4bdd-aa59-e6609e16599f/chat",
      target: "#n8n-chat",      // attaches to the <div id="n8n-chat"> in index.html
      mode: "window",           // "window" (bubble in corner) or "fullscreen"
      loadPreviousSession: true,
      initialMessages: [
        "Hi there! 👋",
        "I’m Yash’s assistant. How can I help?"
      ],
      i18n: {
        en: {
          title: "Chat with Yash’s assistant",
          subtitle: "Ask about projects, QA, automation, or hiring.",
          inputPlaceholder: "Type your question…",
        },
      },
      // If you enabled streaming in n8n, turn this on:
      // enableStreaming: true,
    });
  }, []);

  return null; // nothing visible here, widget is injected into #n8n-chat
}