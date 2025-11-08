#!/bin/bash

echo "🛑 Stopping Bench2Drive Leaderboard..."
echo ""

# Stop backend service
if systemctl is-active --quiet bench2drive-backend; then
    echo "🔄 Stopping backend service..."
    systemctl stop bench2drive-backend
    echo "✅ Backend service stopped"
else
    echo "ℹ️  Backend service is not running"
fi

echo ""
echo "✅ Bench2Drive backend stopped"
echo ""
echo "Note: Nginx is still running (shared with other services)"
echo "To stop Nginx: systemctl stop nginx"
echo ""
