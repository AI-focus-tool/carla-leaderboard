# Bench2Drive Leaderboard Backend

Minimal viable backend API for Bench2Drive autonomous driving leaderboard.

## Tech Stack

- **Node.js** + **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Edit `.env` file with your database credentials.

### 3. Start Server

```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

Server will run on `http://localhost:5001`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users

- `GET /api/users/:id` - Get user info
- `GET /api/users/:id/submissions` - Get user submissions (currently returns [])

### Leaderboard

- `GET /api/leaderboard` - Get leaderboard data (mock data)

### Submissions

- `POST /api/submissions` - Submit results (mock - accepts but doesn't process)

### Health

- `GET /api/health` - Health check
- `GET /` - API info

## Database Schema

### users table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Notes

- Leaderboard data is currently mocked with realistic autonomous driving models
- Submission endpoint accepts files but doesn't process them yet
- User submissions endpoint returns empty array for now
- These will be implemented in future updates

## Architecture

This is a **minimal viable backend** designed for:
- ✅ Quick deployment
- ✅ Easy maintenance
- ✅ Future extensibility

When the codebase grows beyond 500 lines, consider refactoring into:
- `routes/` - Route handlers
- `controllers/` - Business logic
- `models/` - Data models
- `middleware/` - Custom middleware

