import express from 'express';
import { json, urlencoded } from 'express';
import path from 'path';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));

// Register all routes
registerRoutes(app).then(() => {
  console.log('Routes registered');
}).catch(err => {
  console.error('Failed to register routes:', err);
});

// Handle errors
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

// Export for serverless use
export default app;