// api/contact.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const { name, email, subject, message } = req.body;
      
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