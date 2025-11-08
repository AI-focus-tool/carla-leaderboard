// Bench2Drive Leaderboard Backend API
// Minimal viable backend with PostgreSQL

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

const { pool, initDB } = require('./db');
const { leaderboardData } = require('./mockData');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads (mock)
const upload = multer({ 
  dest: '/tmp/uploads/',
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// ============================================
// AUTHENTICATION APIs
// ============================================

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Insert user
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
      [username, email, password_hash]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at
      },
      token
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// ============================================
// USER APIs
// ============================================

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT id, username, email, created_at FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Get user submissions (Mock - returns empty array)
app.get('/api/users/:id/submissions', async (req, res) => {
  try {
    // For MVP, return empty array
    // TODO: Implement actual submissions when ready
    res.json([]);

  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// ============================================
// LEADERBOARD APIs (Mock)
// ============================================

// Get leaderboard data
app.get('/api/leaderboard', (req, res) => {
  try {
    // Return mock leaderboard data
    res.json(leaderboardData);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

// ============================================
// SUBMISSION APIs (Mock)
// ============================================

// Submit results (Mock - accepts but doesn't process)
app.post('/api/submissions', upload.single('file'), async (req, res) => {
  try {
    const { user_id } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Please select a file to upload' });
    }

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Generate mock submission ID
    const submission_id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Mock response - in real implementation, this would:
    // 1. Save file to storage
    // 2. Parse and validate results
    // 3. Calculate scores
    // 4. Update database
    // 5. Update leaderboard

    console.log(`📥 Mock submission received: ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)} MB) from user ${user_id}`);

    res.json({
      submission_id,
      message: 'Submission received successfully',
      status: 'pending',
      note: 'This is a mock submission. Full processing will be implemented in future updates.'
    });

  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ error: 'Submission failed. Please try again.' });
  }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Bench2Drive API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Bench2Drive Leaderboard API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      users: {
        getUser: 'GET /api/users/:id',
        getSubmissions: 'GET /api/users/:id/submissions'
      },
      leaderboard: 'GET /api/leaderboard',
      submissions: 'POST /api/submissions',
      health: 'GET /api/health'
    }
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================
// START SERVER
// ============================================

const startServer = async () => {
  try {
    // Initialize database
    await initDB();
    
    // Start listening
    app.listen(PORT, '0.0.0.0', () => {
      console.log('');
      console.log('🚀 ========================================');
      console.log('🚀 Bench2Drive API Server Started');
      console.log('🚀 ========================================');
      console.log(`🚀 Port: ${PORT}`);
      console.log(`🚀 Environment: ${process.env.NODE_ENV}`);
      console.log(`🚀 Database: ${process.env.DB_NAME}`);
      console.log('🚀 ========================================');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  pool.end();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, closing server...');
  pool.end();
  process.exit(0);
});

// Start the server
startServer();

