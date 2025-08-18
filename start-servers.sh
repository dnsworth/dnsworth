#!/bin/bash

echo "🚀 Starting DNSWorth servers with AUTO-RELOAD..."
echo "📱 Frontend will run on: http://localhost:3000"
echo "🔧 Backend will run on: http://localhost:8000"
echo "🔄 Both servers will auto-reload when files change"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    pkill -f "node src/index.js" 2>/dev/null
    pkill -f "vite" 2>/dev/null
    pkill -f "nodemon" 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Start backend server with nodemon for auto-reload
echo "🔧 Starting backend server with auto-reload on port 8000..."
cd dnsworth/backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server with Vite auto-reload
echo "📱 Starting frontend server with auto-reload on port 3000..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting with AUTO-RELOAD..."
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8000"
echo "🔄 Changes will automatically reload - no server restart needed!"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
