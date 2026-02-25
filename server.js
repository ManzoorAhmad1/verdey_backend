const express = require('express');
const dotenv = require('dotenv');

// Load env vars immediately BEFORE other requires
dotenv.config();

const cors = require('cors');
const connectDB = require('./config/db');
const pageRoutes = require('./routes/pageRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    process.env.CMS_URL,
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/upload', uploadRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
console.log('AWS Config:', {
    region: process.env.AWS_REGION || 'not set',
    bucket: process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME || 'not set'
});
