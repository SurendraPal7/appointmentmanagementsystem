// server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const connectDB = require('./config/db');
const redisClient = require('./config/redis'); // establishes redis connection (optional)
const { rateLimiterMiddleware } = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const doctorRoutes = require('./routes/doctors');
const patientRoutes = require('./routes/patients');

const app = express();

// connect services
connectDB();
redisClient.catch && redisClient.catch(()=>{}); // no-op if already handled

// Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(rateLimiterMiddleware);

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);

// Error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} — env:${process.env.NODE_ENV || 'development'}`);
});
