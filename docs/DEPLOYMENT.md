# Bench2Drive Leaderboard 部署文档

## 🎉 部署成功！

网站已成功部署到阿里云ECS服务器。

## 📍 访问地址

- **前端网站**: http://8.133.19.237
- **后端API**: http://8.133.19.237/api/
- **健康检查**: http://8.133.19.237/api/health

## 🏗️ 架构说明

### 前端
- **框架**: React 19
- **部署方式**: Nginx 静态文件服务
- **路径**: `/root/Bench2DriveLeaderBoard/build`

### 后端
- **框架**: Node.js + Express
- **数据库**: PostgreSQL 13
- **端口**: 5001 (内部)
- **路径**: `/root/Bench2DriveLeaderBoard/backend`
- **进程管理**: systemd service

### 反向代理
- **Web服务器**: Nginx
- **配置文件**: `/etc/nginx/conf.d/bench2drive.conf`
- **功能**: 
  - 前端静态文件服务 (/)
  - 后端API反向代理 (/api/)
  - 静态资源缓存

## 🔧 服务管理

### 后端服务

```bash
# 查看状态
systemctl status bench2drive-backend

# 启动服务
systemctl start bench2drive-backend

# 停止服务
systemctl stop bench2drive-backend

# 重启服务
systemctl restart bench2drive-backend

# 查看日志
journalctl -u bench2drive-backend -f
```

### Nginx服务

```bash
# 查看状态
systemctl status nginx

# 重新加载配置
systemctl reload nginx

# 重启服务
systemctl restart nginx

# 测试配置
nginx -t
```

## 📊 数据库信息

- **数据库名**: bench2drive
- **用户**: bench2drive_user
- **端口**: 5432
- **连接**: localhost

### 数据库操作

```bash
# 连接数据库
sudo -u postgres psql bench2drive

# 查看用户表
SELECT * FROM users;

# 备份数据库
pg_dump -U bench2drive_user bench2drive > backup.sql

# 恢复数据库
psql -U bench2drive_user bench2drive < backup.sql
```

## 🚀 已实现的API

### ✅ 完整实现

1. **POST /api/auth/register** - 用户注册
   ```bash
   curl -X POST http://8.133.19.237/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"user","email":"user@example.com","password":"password123"}'
   ```

2. **POST /api/auth/login** - 用户登录
   ```bash
   curl -X POST http://8.133.19.237/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","password":"password123"}'
   ```

3. **GET /api/users/:id** - 获取用户信息
   ```bash
   curl http://8.133.19.237/api/users/1
   ```

4. **GET /api/users/:id/submissions** - 获取用户提交历史
   ```bash
   curl http://8.133.19.237/api/users/1/submissions
   ```
   *注: 当前返回空数组，待后续实现*

### 🔄 Mock实现

5. **GET /api/leaderboard** - 获取排行榜
   ```bash
   curl http://8.133.19.237/api/leaderboard
   ```
   *注: 返回12条模拟数据，基于真实自动驾驶模型*

6. **POST /api/submissions** - 提交结果
   ```bash
   curl -X POST http://8.133.19.237/api/submissions \
     -F "file=@result.json" \
     -F "user_id=1"
   ```
   *注: 接收文件但不处理，返回成功响应*

## 📁 项目结构

```
/root/Bench2DriveLeaderBoard/
├── backend/                    # 后端代码
│   ├── server.js              # 主服务文件 (300行)
│   ├── db.js                  # 数据库连接 (40行)
│   ├── mockData.js            # Mock数据 (150行)
│   ├── package.json           # 依赖配置
│   └── .env                   # 环境变量
├── build/                     # 前端构建产物
├── src/                       # 前端源代码
├── public/                    # 前端静态资源
└── DEPLOYMENT.md              # 本文档
```

## 🔐 安全配置

### 环境变量

后端配置文件位于: `/root/Bench2DriveLeaderBoard/backend/.env`

**重要**: 生产环境请修改以下配置：

```bash
JWT_SECRET=your_strong_secret_key_here
DB_PASSWORD=your_strong_password_here
```

### 防火墙

确保以下端口开放：
- **80** - HTTP (Nginx)
- **5001** - 后端API (仅内部访问)
- **5432** - PostgreSQL (仅内部访问)

## 🔄 更新部署

### 更新前端

```bash
cd /root/Bench2DriveLeaderBoard
npm run build
systemctl reload nginx
```

### 更新后端

```bash
cd /root/Bench2DriveLeaderBoard/backend
# 修改代码后
systemctl restart bench2drive-backend
```

## 📝 测试账户

已创建测试账户用于验证：
- **用户名**: testuser
- **邮箱**: test@example.com
- **密码**: test123456

## 🐛 故障排查

### 后端无法启动

```bash
# 查看详细日志
journalctl -u bench2drive-backend -n 50

# 检查端口占用
netstat -tuln | grep 5001

# 手动启动测试
cd /root/Bench2DriveLeaderBoard/backend
node server.js
```

### 前端无法访问

```bash
# 检查Nginx配置
nginx -t

# 查看Nginx错误日志
tail -f /var/log/nginx/error.log

# 检查文件权限
ls -la /root/Bench2DriveLeaderBoard/build
```

### 数据库连接失败

```bash
# 检查PostgreSQL状态
systemctl status postgresql

# 测试连接
psql -U bench2drive_user -d bench2drive -h localhost
```

## 📈 性能优化建议

### 后续可以考虑：

1. **使用PM2管理Node进程**
   ```bash
   npm install -g pm2
   pm2 start server.js --name bench2drive-api
   pm2 startup
   pm2 save
   ```

2. **启用HTTPS**
   - 申请SSL证书 (Let's Encrypt)
   - 配置Nginx SSL

3. **数据库优化**
   - 添加索引
   - 配置连接池
   - 定期备份

4. **CDN加速**
   - 静态资源上传到OSS
   - 配置CDN加速

## 🎯 后续开发计划

### 待实现功能：

1. **提交处理模块**
   - 文件存储 (本地/OSS)
   - 结果解析和验证
   - 分数计算

2. **排行榜计算**
   - 实时排名更新
   - 多轨道支持
   - 历史记录

3. **管理后台**
   - 提交审核
   - 用户管理
   - 数据统计

## 📞 联系方式

如有问题，请联系开发团队。

---

**部署时间**: 2025-11-08  
**服务器**: 阿里云ECS (8.133.19.237)  
**状态**: ✅ 运行正常

