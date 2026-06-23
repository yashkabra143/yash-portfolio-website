import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { messageInsertSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactFormEmail, initializeMailService } from "./services/emailService";


// Simple in-memory rate limiter: max 5 contact submissions per IP per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    submissionLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissionLog.set(ip, recent);
  return false;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize EmailService on server startup
  initializeMailService();

  // Contact form submission route
app.post('/api/contact', async (req, res) => {
  try {
    // Honeypot: bots fill the hidden "website" field; pretend success and drop it
    if (typeof req.body?.website === 'string' && req.body.website.trim() !== '') {
      res.status(201).json({ success: true, message: "Message received successfully" });
      return;
    }

    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(ip)) {
      res.status(429).json({
        success: false,
        message: "Too many messages. Please try again later."
      });
      return;
    }

    const validatedData = messageInsertSchema.parse(req.body);
    const message = await storage.saveContactMessage(validatedData);
    
    // Send email notification (doesn't block response)
    sendContactFormEmail(validatedData)
      .then(emailSent => {
        if (emailSent) {
          console.log('Email notification sent successfully');
        } else {
          //console.log('Email notification skipped - SendGrid not configured');
        }
      })
      .catch(err => {
        console.error('Failed to send email notification:', err);
      });

    // Fire-and-forget call to n8n webhook (POST JSON)
    try {
      const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        const timestamp = new Date().toISOString();
        const payload = {
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
          timestamp: timestamp, // Changed from createdAt to timestamp
          source: 'Portfolio Website' // Add source field
        };
        
        // Enhanced error handling for n8n webhook
        (async () => {
          try {
            console.log('Sending to n8n webhook:', n8nWebhookUrl);
            const resp = await fetch(n8nWebhookUrl, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'User-Agent': 'Portfolio-Contact-Form/1.0'
              },
              body: JSON.stringify(payload),
            });
            
            if (resp.ok) {
              console.log('n8n webhook called successfully');
              // Don't try to read response body - just log success
              console.log('n8n webhook status:', resp.status);
            } else {
              console.error('n8n webhook responded with status:', resp.status);
            }
          } catch (err) {
            console.error('Failed to call n8n webhook:', err);
          }
        })();
      } else {
        console.warn('N8N_WEBHOOK_URL not configured, skipping n8n integration');
      }
    } catch (err) {
      console.error('Error preparing n8n webhook call:', err);
    }
    
    res.status(201).json({
      success: true,
      message: "Message received successfully",
      data: message
    });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        errors: error.errors
      });
      return;
    }
    console.error('Error saving contact message:', error);
    res.status(500).json({
      success: false,
      message: "An error occurred while saving your message"
    });
    return;
  }
});

  // Chat proxy route — avoids CORS by keeping n8n webhook server-side
  const chatRateLog = new Map<string, number[]>();
  app.post('/api/chat', async (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const recent = (chatRateLog.get(ip) ?? []).filter((t) => now - t < 60_000);
    if (recent.length >= 20) {
      chatRateLog.set(ip, recent);
      res.status(429).json({ error: 'Too many requests. Please slow down.' });
      return;
    }
    recent.push(now);
    chatRateLog.set(ip, recent);

    const { chatInput, sessionId } = req.body ?? {};
    if (!chatInput || typeof chatInput !== 'string' || chatInput.trim() === '') {
      res.status(400).json({ error: 'chatInput is required' });
      return;
    }

    const webhookUrl =
      process.env.N8N_CHAT_WEBHOOK_URL ||
      process.env.VITE_N8N_WEBHOOK_URL ||
      'https://triggerandflow.in/webhook/16b35e59-8e87-4bdd-aa59-e6609e16599f/chat';

    try {
      const n8nRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: chatInput.trim(), sessionId: sessionId || '' }),
      });
      const data = await n8nRes.json();
      res.status(n8nRes.status).json(data);
    } catch (err) {
      console.error('n8n chat proxy error:', err);
      res.status(502).json({ error: 'Failed to reach AI backend' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
