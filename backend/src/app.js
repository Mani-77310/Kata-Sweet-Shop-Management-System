const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const sweetsRoutes = require('./routes/sweets.routes');
const cartRoutes = require('./routes/cart.routes');
const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map(v => v.trim())
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins.includes('*') ? '*' : allowedOrigins }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);
app.use('/api/cart', cartRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});
module.exports = app;
