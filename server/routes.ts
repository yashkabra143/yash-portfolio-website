import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { messageInsertSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactFormEmail, initializeMailService } from "./services/emailService";


export async function registerRoutes(app: Express): Promise<Server> {
  // Expose API key for Google AI
  app.get('/api/config', (req, res) => {
    return res.json({
      googleAiApiKey: process.env.GOOGLE_AI_API_KEY || ''
    });
  });
  // Initialize EmailService on server startup
  initializeMailService();

  // Contact form submission route
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = messageInsertSchema.parse(req.body);
      const message = await storage.saveContactMessage(validatedData);
      
      // Send email notification (doesn't block response)
      sendContactFormEmail(validatedData)
        .then(emailSent => {
          if (emailSent) {
            console.log('Email notification sent successfully');
          } else {
            console.log('Email notification skipped - SendGrid not configured');
          }
        })
        .catch(err => {
          console.error('Failed to send email notification:', err);
        });
      
      return res.status(201).json({
        success: true,
        message: "Message received successfully",
        data: message
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.errors
        });
      }
      console.error('Error saving contact message:', error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while saving your message"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
