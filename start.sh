#!/bin/bash

echo "🚀 Starting Bench2Drive Leaderboard..."
echo ""

# Check if backend service is running
if systemctl is-active --quiet bench2drive-backend; then
    echo "✅ Backend service is already running"
else
    echo "🔄 Starting backend service..."
    systemctl start bench2drive-backend
    sleep 2
    if systemctl is-active --quiet bench2drive-backend; then
        echo "✅ Backend service started"
    else
        echo "❌ Failed to start backend service"
        exit 1
    fi
fi

# Check if nginx is running
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx is already running"
else
    echo "🔄 Starting Nginx..."
    systemctl start nginx
    if systemctl is-active --quiet nginx; then
        echo "✅ Nginx started"
    else
        echo "❌ Failed to start Nginx"
        exit 1
    fi
fi

echo ""
echo "======================================"
echo "🎉 Bench2Drive Leaderboard is running!"
echo "======================================"
echo ""
echo "📍 Access URL: http://8.133.19.237"
echo "🔧 API Health: http://8.133.19.237/api/health"
echo ""
echo "📊 Service Status:"
systemctl status bench2drive-backend --no-pager | head -3
echo ""
echo "📝 View logs: journalctl -u bench2drive-backend -f"
echo ""
