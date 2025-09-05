// Enhanced contact API for Vercel deployment
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed',
            allowedMethods: ['POST']
        });
    }

    try {
        console.log('🚀 Contact form submission received');
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        const { name, email, subject, message } = req.body;
        
        // Enhanced validation
        if (!name || !email || !subject || !message) {
            const missingFields = [];
            if (!name) missingFields.push('name');
            if (!email) missingFields.push('email');
            if (!subject) missingFields.push('subject');
            if (!message) missingFields.push('message');
            
            console.log('❌ Validation failed - Missing fields:', missingFields);
            return res.status(400).json({ 
                success: false,
                message: 'Missing required fields',
                missingFields
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('❌ Invalid email format:', email);
            return res.status(400).json({ 
                success: false,
                message: 'Invalid email format'
            });
        }

        // Get n8n webhook URL
        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
        if (!n8nWebhookUrl) {
            console.error('❌ N8N_WEBHOOK_URL environment variable not set');
            return res.status(500).json({ 
                success: false,
                message: 'Server configuration error'
            });
        }

        console.log('📡 Sending to n8n webhook:', n8nWebhookUrl);
        
        const payload = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim(),
            timestamp: new Date().toISOString(),
            source: 'Portfolio Website',
            userAgent: req.headers['user-agent'],
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        };

        // Send to n8n with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        try {
            const n8nResponse = await fetch(n8nWebhookUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'User-Agent': 'Portfolio-Contact-Form/1.0'
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!n8nResponse.ok) {
                console.error('❌ n8n webhook failed:', {
                    status: n8nResponse.status,
                    statusText: n8nResponse.statusText,
                    url: n8nWebhookUrl
                });
                
                // Still return success to user, but log the webhook failure
                console.log('⚠️  Webhook failed but form was received');
            } else {
                console.log('✅ Successfully sent to n8n webhook');
            }

        } catch (fetchError) {
            clearTimeout(timeoutId);
            console.error('❌ Error calling n8n webhook:', {
                error: fetchError.message,
                url: n8nWebhookUrl,
                name: fetchError.name
            });
            
            // Don't fail the request if webhook fails
            console.log('⚠️  Webhook error but form was received');
        }

        // Always return success to the user
        console.log('✅ Contact form processed successfully');
        return res.status(200).json({
            success: true,
            message: "Message received successfully! Thank you for contacting me."
        });

    } catch (error) {
        console.error('❌ Unexpected error in contact API:', {
            error: error.message,
            stack: error.stack,
            name: error.name
        });
        
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error. Please try again later.',
            timestamp: new Date().toISOString()
        });
    }
}
