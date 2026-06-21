const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

function createApp() {
  const app = express();

  // Basic security headers
  app.use(helmet());

  // CORS - allow frontend origin via env or default
  const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
  app.use(cors({ origin: CORS_ORIGIN }));

  // JSON body parsing
  app.use(express.json());

  // Rate limiter - basic throttling
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);

  // Health
  app.get('/health', (req, res) => res.json({ ok: true }));

  // 404
  app.use((req, res) => res.status(404).json({ error: 'Not found' }));

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Server error' });
  });

  return app;
}

module.exports = createApp;
