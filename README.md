# DNSWorth - Instant Domain Valuation Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Security](https://img.shields.io/badge/Security-Audited-green.svg)](https://github.com/dnsworth/dnsworth/security)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-blue.svg)](https://vercel.com)
[![API](https://img.shields.io/badge/API-HumbleWorth-orange.svg)](https://hubleworth.com)

> **Professional-grade domain valuations powered by AI technology - 100% Free Forever**

## **Overview**

DNSWorth is a cutting-edge web application that provides instant, accurate domain valuations using advanced AI algorithms and market data analysis. Built with modern web technologies and enterprise-grade security, DNSWorth democratizes domain investment by offering professional-grade estimates at no cost.

### **Key Features**
- 🚀 **Instant Valuations**: Get domain appraisals in under 3 seconds
- 📊 **Bulk Portfolio Analysis**: Evaluate up to 100 domains simultaneously
- 🤖 **AI-Powered Accuracy**: Advanced algorithms for precise estimates
- 💰 **100% Free Forever**: No hidden costs or premium tiers
- 🔒 **Enterprise Security**: Comprehensive security implementation
- 📱 **Mobile-First Design**: Responsive design for all devices
- 📈 **CSV Export**: Download results for portfolio management

### **Technology Stack**
- **Frontend**: React.js 18+, Tailwind CSS, Vite
- **Backend**: Node.js 18+, Express.js, Helmet.js
- **Deployment**: Vercel (Frontend), Render (Backend)
- **Security**: Comprehensive security headers, rate limiting, CORS protection
- **API Integration**: HumbleWorth API for domain valuations

---

## **Live Demo**

🌐 **Website**: [https://dnsworth.com](https://dnsworth.com)  
🔧 **API**: [https://dnsworth.onrender.com](https://dnsworth.onrender.com) *(Protected with rate limits - Do not abuse or rely on for production use)*

---

## **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Local Development Setup**

1. **Clone the repository**
   ```bash
   git clone https://github.com/dnsworth/dnsworth.git
   cd dnsworth
   ```

2. **Start both servers (Frontend + Backend)**
   ```bash
   chmod +x start-servers.sh
   ./start-servers.sh
   ```

3. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8000](http://localhost:8000)

### **Manual Setup**

#### **Backend Setup**
```bash
cd backend
npm install
npm run dev
```

#### **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

---

## **API Endpoints**

### **Health Check**
```bash
GET /health
```

### **Single Domain Valuation**
```bash
POST /api/value
Content-Type: application/json
X-Requested-With: XMLHttpRequest
X-Client-Version: 2.0.0

{
  "domain": "example.com"
}
```

### **Bulk Domain Valuation**
```bash
POST /api/bulk-value
Content-Type: application/json
X-Requested-With: XMLHttpRequest
X-Client-Version: 2.0.0

{
  "domains": ["example.com", "test.com"]
}
```

### **Rate Limits**
- **Single Domain**: 50 requests per 15 minutes per IP
- **Bulk Valuation**: 50 requests per 15 minutes per IP
- **Maximum Domains**: 100 domains per bulk request

> **⚠️ Important**: Please respect these rate limits and secure your API usage. This endpoint is protected and monitored for abuse.

---

## **Deployment**

### **Frontend Deployment (Vercel)**
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
3. Deploy automatically on push to main branch

### **Backend Deployment (Render)**
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables:
   - `NODE_ENV=production`
   - `PORT=8000`
   - `ALLOWED_ORIGINS=https://yourdomain.com`
4. Deploy and get your backend URL

### **Environment Variables**
Copy `env.template` to `.env` and configure:
```bash
# Required
NODE_ENV=production
PORT=8000
APP_SECRET_1=your-32-character-secret
APP_SECRET_2=your-32-character-secret
APP_SECRET_3=your-32-character-key

# API Configuration
HUMBLEWORTH_API_URL=https://valuation.humbleworth.com/api/valuation
ALLOWED_ORIGINS=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=50
REQUEST_TIMEOUT=10000
```

---

## **Security Features**

### **Comprehensive Protection**
- ✅ **Input Validation**: Advanced domain name validation
- ✅ **Rate Limiting**: IP-based request limiting with fingerprinting
- ✅ **CORS Protection**: Strict origin validation
- ✅ **Security Headers**: Full security header implementation
- ✅ **XSS Prevention**: Content Security Policy (CSP)
- ✅ **CSRF Protection**: Built-in CSRF protection
- ✅ **SQL Injection Prevention**: Parameterized API calls
- ✅ **Error Handling**: Secure error messages without information leakage

> **⚠️ Security Disclaimer**: While DNSWorth implements industry-standard security practices, it has not undergone a third-party audit. Use at your own discretion.

### **Security Audit**
Run automated security scanning:
```bash
node security-audit.js
```

---

## **Contributing**

We welcome contributions from the community! Here's how you can help:

### **Development Guidelines**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Code Standards**
- Follow existing code style and patterns
- Add tests for new functionality
- Ensure all tests pass
- Update documentation as needed
- Follow security best practices

### **Areas for Contribution**
- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation updates
- 🧪 Test coverage improvements
- 🔒 Security enhancements
- 🎨 UI/UX improvements

### **Getting Help**
- 📖 Check existing documentation
- 🐛 Report bugs via GitHub Issues
- 💬 Discuss features via GitHub Discussions
- 📧 Contact: support@dnsworth.com

---

## **Project Structure**

```
DNSWORTH/
├── 📁 frontend/                 # React.js frontend application
├── 📁 backend/                  # Node.js backend API server
├── 📄 PRD.md                   # Product Requirements Document
├── 📄 PROJECT_STRUCTURE.md     # Detailed project structure
├── 📄 vercel.json              # Vercel deployment configuration
├── 📄 env.template             # Environment variables template
└── 📄 start-servers.sh         # Development server startup script
```

For detailed project structure, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

---

## **Performance & Monitoring**

### **Performance Metrics**
- **Response Time**: <3 seconds for single domain
- **Bulk Processing**: <60 seconds for 100 domains
- **Page Load**: <2 seconds initial page load
- **Uptime Target**: 99.9% availability

### **Monitoring**
- **Health Check**: `/health` endpoint
- **Performance Tracking**: Request duration logging
- **Error Monitoring**: Comprehensive error logging
- **Security Events**: Rate limit and security violation tracking

---

## **Troubleshooting**

### **Common Issues**

#### **Frontend Not Loading**
- Check if backend is running on port 8000
- Verify environment variables are set correctly
- Clear browser cache and hard refresh

#### **API Calls Failing**
- Ensure backend is accessible
- Check CORS configuration
- Verify rate limiting settings

#### **Build Failures**
- Ensure Node.js 18+ is installed
- Clear `node_modules` and reinstall
- Check for environment variable conflicts

### **Debug Mode**
Enable debug logging:
```bash
# Frontend
NODE_ENV=development npm run dev

# Backend
NODE_ENV=development npm run dev
```

---

## **Roadmap**

### **Version 2.1 (Q4 2025)**
- 🔄 User accounts and search history
- 🔄 Advanced analytics dashboard
- 🔄 Domain monitoring alerts
- 🔄 Enhanced bulk processing

### **Version 3.0 (Q1 2026)**
- 🔄 API access for developers
- 🔄 Multiple valuation sources
- 🔄 Advanced portfolio management
- 🔄 Mobile application

---

## **Support & Community**

### **Resources**
- 📖 **Documentation**: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/dnsworth/dnsworth/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/dnsworth/dnsworth/discussions)
- 📧 **Email**: support@dnsworth.com

### **Community Guidelines**
- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and experiences
- Report issues promptly
- Suggest improvements constructively

---

## **Acknowledgements**

This project uses the free API provided by **[HumbleWorth](https://hubleworth.com)**. Special thanks to them for making domain valuation capabilities available to developers and users worldwide!

### **Open Source Libraries**
- **React.js**: UI framework by Meta
- **Tailwind CSS**: Utility-first CSS framework
- **Express.js**: Web framework for Node.js
- **Helmet.js**: Security middleware for Express
- **Vite**: Build tool and development server

### **Infrastructure**
- **Vercel**: Frontend hosting and CDN
- **Render**: Backend hosting and auto-scaling
- **GitHub**: Version control and collaboration

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Security**

For security issues, please contact:
- **Email**: security@dnsworth.com
- **Response Time**: Within 24 hours
- **PGP Key**: Available upon request

---

**Built with ❤️ by the DNSWorth Team**

[Website](https://dnsworth.com) • [API](https://dnsworth.onrender.com) • [GitHub](https://github.com/dnsworth/dnsworth)
