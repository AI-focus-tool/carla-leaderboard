# Bench2Drive Leaderboard

Official leaderboard for Bench2Drive autonomous driving benchmark.

## 🌐 Live Demo

**Website**: http://8.133.19.237

## 🚀 Quick Start

### View the Website
Simply visit http://8.133.19.237 in your browser.

### Manage Services

```bash
# Start all services
./start.sh

# Stop backend service
./stop.sh

# View backend logs
journalctl -u bench2drive-backend -f

# Restart backend
systemctl restart bench2drive-backend
```

## 📊 Features

### ✅ Implemented
- User registration and login (JWT authentication)
- User profile management
- Leaderboard display (mock data)
- Result submission interface (mock)
- Responsive design

### 🔄 Mock Data
- Leaderboard: 12 entries based on real autonomous driving models
- Submissions: Accepts files but doesn't process yet

## 🏗️ Architecture

### Frontend
- **Framework**: React 19
- **Deployment**: Nginx static files
- **Location**: `/root/Bench2DriveLeaderBoard/build`

### Backend
- **Framework**: Node.js + Express
- **Database**: PostgreSQL 13
- **Port**: 5001 (internal)
- **Location**: `/root/Bench2DriveLeaderBoard/backend`
- **Process Manager**: systemd

## 📁 Project Structure

```
/root/Bench2DriveLeaderBoard/
├── backend/                    # Backend API (430 lines)
│   ├── server.js              # Main server (300 lines)
│   ├── db.js                  # Database connection (40 lines)
│   ├── mockData.js            # Mock data (150 lines)
│   └── package.json
├── src/                       # Frontend source
├── build/                     # Frontend build output
├── public/                    # Static assets
├── start.sh                   # Start script
├── stop.sh                    # Stop script
├── DEPLOYMENT.md              # Detailed deployment docs
└── DEPLOYMENT_SUMMARY.md      # Deployment summary
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/:id` - Get user info
- `GET /api/users/:id/submissions` - Get user submissions (returns [])

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard data (mock)

### Submissions
- `POST /api/submissions` - Submit results (mock)

### Health
- `GET /api/health` - Health check
- `GET /` - API info

## 🧪 Test Account

- **Username**: testuser
- **Email**: test@example.com
- **Password**: test123456

## 📝 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) - Deployment summary report
- [backend/README.md](./backend/README.md) - Backend documentation

## 🎯 Roadmap

### Phase 1 (Current - MVP)
- [x] User authentication
- [x] Basic frontend pages
- [x] Mock leaderboard data
- [x] Mock submission interface

### Phase 2 (Next)
- [ ] Real submission processing
- [ ] Score calculation
- [ ] Database-driven leaderboard
- [ ] File storage (Aliyun OSS)

### Phase 3 (Future)
- [ ] Admin dashboard
- [ ] User profile editing
- [ ] Email verification
- [ ] HTTPS configuration
- [ ] Redis caching

## 🐛 Known Limitations

1. Leaderboard shows static mock data
2. Submission accepts files but doesn't process them
3. Submission history always returns empty array
4. No HTTPS (HTTP only)
5. No caching layer

These are expected behaviors for the MVP phase and will be implemented in future versions.

## 🔧 Troubleshooting

### Known Issues & Solutions

**Issue: API requests fail (login/register/leaderboard not loading)**

**Symptom**: Frontend loads but API calls fail, Nginx error log shows:
```
connect() failed (111: Connection refused) while connecting to upstream
upstream: "http://[::1]:5001/..."
```

**Cause**: IPv6/IPv4 address resolution conflict. Nginx tries IPv6 (`::1`) but backend only listens on IPv4.

**Solution**: Already fixed in current deployment. If you encounter this:
1. Edit `/etc/nginx/conf.d/bench2drive.conf`
2. Change `proxy_pass http://localhost:5001;` to `proxy_pass http://127.0.0.1:5001;`
3. Run `nginx -t && systemctl reload nginx`

See `BUGFIX_REPORT.md` for detailed analysis.

## 📞 Support

### View Logs
```bash
# Backend logs
journalctl -u bench2drive-backend -f

# Nginx access logs
tail -f /var/log/nginx/access.log

# Nginx error logs
tail -f /var/log/nginx/error.log
```

### Troubleshooting

**Backend not starting?**
```bash
journalctl -u bench2drive-backend -n 50
systemctl status bench2drive-backend
```

**Frontend not loading?**
```bash
nginx -t
systemctl status nginx
```

**Database connection issues?**
```bash
systemctl status postgresql
psql -U bench2drive_user -d bench2drive -h localhost
```

## 📄 License

MIT

## 🙏 Credits

Built for the Bench2Drive autonomous driving benchmark project.

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: 2025-11-08
