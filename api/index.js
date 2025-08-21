import express from 'express';
import { json, urlencoded } from 'express';
import path from 'path';
import fs from 'fs';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

// Serve assets from the attached_assets folder
app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));

// Register all routes
registerRoutes(app).then(() => {
  console.log('Routes registered');
}).catch(err => {
  console.error('Failed to register routes:', err);
});

// Serve static files from the built client
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
  console.warn('Build directory not found. Make sure to run "npm run build" before deployment.');
}

// Handle errors
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

// Export for serverless use
export default app;