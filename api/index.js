import express from 'express';
import { json, urlencoded } from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

// Import and reuse the existing express app setup from server in production build style not needed here
// Keep minimal endpoints only if necessary. Removing custom endpoints to revert behavior.

// Serve static files from the built client
try {
  const distPath = path.resolve(process.cwd(), 'dist', 'public');
  
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    
    // Serve index.html for all non-API routes (SPA routing)
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api')) {
        res.sendFile(path.resolve(distPath, 'index.html'));
      }
    });
  } else {
    console.warn('Build directory not found. Serving fallback response.');
    
    // Fallback for when build directory doesn't exist
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api')) {
        res.status(200).json({ 
          message: 'Portfolio website is loading...',
          status: 'building'
        });
      }
    });
  }
} catch (error) {
  console.error('Error setting up static file serving:', error);
  
  // Fallback for any file system errors
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.status(200).json({ 
        message: 'Portfolio website is loading...',
        status: 'error'
      });
    }
  });
}

// Handle errors
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

// Export for serverless use
export default app;