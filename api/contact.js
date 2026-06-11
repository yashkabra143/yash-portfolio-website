// Enhanced contact API for Vercel deployment

// Simple in-memory rate limiter: max 5 submissions per IP per 10 minutes.
// Per-instance only on serverless, but still blocks burst spam.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (submissionLog.get(ip) || []).filter(
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

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
      const { name, email, subject, message, website } = req.body;

      // Honeypot: bots fill the hidden "website" field; pretend success and drop it
      if (typeof website === 'string' && website.trim() !== '') {
        return res.status(201).json({ success: true, message: 'Message received successfully' });
      }

      const ip =
        (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
        req.socket?.remoteAddress ||
        'unknown';
      if (isRateLimited(ip)) {
        return res.status(429).json({ success: false, message: 'Too many messages. Please try again later.' });
      }

      // Your validation logic here
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Call your n8n webhook
      const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
      
      const payload = {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
        source: 'Portfolio Website'
      };
  
      // Send to n8n
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (!n8nResponse.ok) {
        console.error('n8n webhook failed:', n8nResponse.status);
      }
  
      return res.status(201).json({
        success: true,
        message: "Message received successfully"
      });
  
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }