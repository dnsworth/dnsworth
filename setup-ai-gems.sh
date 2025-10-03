#!/bin/bash

echo "🚀 Setting up AI Domain Gems System for DNSWorth"
echo "================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "🔧 Setting up environment variables..."
cd ../backend
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.template .env
    echo "⚠️  Please edit backend/.env and add your OpenAI API key"
    echo "   Required: OPENAI_API_KEY=your_openai_api_key_here"
else
    echo "✅ .env file already exists"
fi

echo "🔧 Setting up frontend environment..."
cd ../frontend
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file for frontend..."
    echo "REACT_APP_API_URL=http://localhost:8000" > .env
else
    echo "✅ Frontend .env file already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🔑 Next steps:"
echo "1. Get an OpenAI API key from https://platform.openai.com/api-keys"
echo "2. Get a Dynadot API key from your Dynadot account"
echo "3. Add both to backend/.env:"
echo "   OPENAI_API_KEY=your_openai_key_here"
echo "   DYNADOT_API_KEY=your_dynadot_key_here"
echo "4. Test APIs: cd backend && node test-apis.js"
echo "5. Start the backend: cd backend && npm run dev"
echo "6. Start the frontend: cd frontend && npm run dev"
echo "7. Visit http://localhost:3000/domain-gems"
echo ""
echo "📚 For detailed setup instructions, see AI_DOMAIN_GENERATION.md"
echo ""
echo "🎉 Happy domain hunting!"
