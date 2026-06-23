const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 20;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }

  const { chatInput, sessionId } = req.body || {};

  if (!chatInput || typeof chatInput !== 'string' || chatInput.trim() === '') {
    return res.status(400).json({ error: 'chatInput is required' });
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
    return res.status(n8nRes.status).json(data);
  } catch (err) {
    console.error('n8n chat proxy error:', err);
    return res.status(502).json({ error: 'Failed to reach AI backend' });
  }
}
