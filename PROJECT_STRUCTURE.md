# DNSWorth - Project Structure Documentation

## **Overview**
This document provides a comprehensive overview of the DNSWorth project structure, including all directories, files, and their purposes.

---

## **Root Directory Structure**

```
DNSWORTH/
├── 📁 frontend/                 # React.js frontend application
├── 📁 backend/                  # Node.js backend API server
├── 📁 dnsworth/                 # Legacy project structure (cleanup needed)
├── 📄 .gitignore               # Git ignore patterns
├── 📄 PRD.md                   # Product Requirements Document
├── 📄 PROJECT_STRUCTURE.md     # This file
├── 📄 README.md                # Main project documentation
├── 📄 vercel.json              # Vercel deployment configuration
├── 📄 env.template             # Environment variables template
├── 📄 production.env.example   # Production environment example
├── 📄 start-servers.sh         # Development server startup script
├── 📄 security-audit.js        # Security audit automation script
└── 📄 .DS_Store                # macOS system file
```

---

## **Frontend Directory Structure**

```
frontend/
├── 📁 public/                  # Static assets and public files
│   ├── 📄 index.html           # Main HTML entry point
│   ├── 📄 robots.txt           # Search engine robots configuration
│   ├── 📄 sitemap.xml          # XML sitemap for SEO
│   ├── 📄 dnsworth-logo.ico    # Favicon and app icon
│   ├── 📄 sw.js                # Service worker for PWA features
│   └── 📄 spa-fallback.js      # SPA fallback for static hosting
├── 📁 src/                     # Source code directory
│   ├── 📁 components/          # Reusable React components
│   │   ├── 📄 Avatar.jsx       # User avatar component
│   │   ├── 📄 DonationModal.jsx # Donation modal component
│   │   ├── 📄 Footer.jsx       # Site footer component
│   │   ├── 📄 Header.jsx       # Site header component
│   │   ├── 📄 HeroBanner.jsx   # Hero banner component
│   │   ├── 📄 HeroSection.jsx  # Main hero section
│   │   ├── 📄 SearchBar.jsx    # Search input component
│   │   ├── 📄 SectionBulkSearch.jsx # Bulk search section
│   │   ├── 📄 SectionCTA.jsx   # Call-to-action section
│   │   ├── 📄 SectionFeatures.jsx # Features showcase
│   │   ├── 📄 SectionHowItWorks.jsx # How it works section
│   │   ├── 📄 SectionWhyUs.jsx # Why choose us section
│   │   ├── 📄 ValuationForm.jsx # Domain valuation form
│   │   └── 📄 ValuationResults.jsx # Results display component
│   ├── 📁 config/              # Configuration files
│   │   ├── 📄 api.js           # API configuration and endpoints
│   │   └── 📄 security.js      # Frontend security utilities
│   ├── 📁 hooks/               # Custom React hooks
│   │   └── 📄 useDomainValuation.js # Domain valuation logic
│   ├── 📁 pages/               # Page components
│   │   ├── 📄 Home.jsx         # Homepage component
│   │   ├── 📄 BulkValuationPage.jsx # Bulk valuation page
│   │   ├── 📄 PrivacyPolicy.jsx # Privacy policy page
│   │   ├── 📄 TermsOfService.jsx # Terms of service page
│   │   └── 📄 CookiePolicy.jsx # Cookie policy page
│   ├── 📁 utils/               # Utility functions
│   │   ├── 📄 api.js           # API utility functions
│   │   ├── 📄 searchTracker.js # Search history tracking
│   │   └── 📄 security.js      # Security validation utilities
│   ├── 📄 App.jsx              # Main application component
│   ├── 📄 App.css              # Application styles
│   ├── 📄 index.css            # Global styles and Tailwind CSS
│   └── 📄 main.jsx             # Application entry point
├── 📄 package.json             # Frontend dependencies and scripts
├── 📄 package-lock.json        # Dependency lock file
├── 📄 vite.config.js           # Vite build configuration
├── 📄 tailwind.config.js       # Tailwind CSS configuration
├── 📄 postcss.config.js        # PostCSS configuration
├── 📄 generate-sitemap.js      # Sitemap generation script
└── 📄 README.md                # Frontend-specific documentation
```

---

## **Backend Directory Structure**

```
backend/
├── 📁 src/                     # Source code directory
│   ├── 📁 config/              # Configuration files
│   │   └── 📄 security.js      # Security configuration and middleware
│   ├── 📁 middleware/          # Express.js middleware (future use)
│   ├── 📁 routes/              # API route handlers
│   │   └── 📄 valuation.js     # Domain valuation API endpoints
│   ├── 📁 utils/               # Utility functions
│   │   └── 📄 validation.js    # Input validation and sanitization
│   └── 📄 index.js             # Main server file
├── 📄 package.json             # Backend dependencies and scripts
└── 📄 package-lock.json        # Dependency lock file
```

---

## **Configuration Files**

### **Vercel Configuration (vercel.json)**
- **Purpose**: Frontend deployment configuration for Vercel
- **Features**: 
  - Build configuration
  - Security headers
  - Cache control
  - API rewrites to backend

### **Environment Template (env.template)**
- **Purpose**: Template for environment variables
- **Security**: Contains no actual secrets
- **Usage**: Copy to `.env` and fill in actual values

### **Production Environment (production.env.example)**
- **Purpose**: Example production environment configuration
- **Security**: Contains placeholder values only
- **Usage**: Reference for production deployment

---

## **Key Files and Their Purposes**

### **Frontend Core Files**
- **`frontend/src/App.jsx`**: Main application component with routing
- **`frontend/src/main.jsx`**: Application entry point and React rendering
- **`frontend/src/index.css`**: Global styles and Tailwind CSS imports
- **`frontend/public/index.html`**: HTML template with meta tags and SEO

### **Backend Core Files**
- **`backend/src/index.js`**: Express.js server setup and API endpoints
- **`backend/src/config/security.js`**: Security middleware configuration
- **`backend/src/routes/valuation.js`**: Domain valuation API logic
- **`backend/src/utils/validation.js`**: Input validation and sanitization

### **Configuration Files**
- **`vite.config.js`**: Build tool configuration with optimizations
- **`tailwind.config.js`**: CSS framework configuration
- **`vercel.json`**: Deployment and hosting configuration

---

## **Component Architecture**

### **Component Hierarchy**
```
App.jsx
├── Router
    ├── Home.jsx
    │   ├── Header.jsx
    │   ├── HeroSection.jsx
    │   │   └── ValuationForm.jsx
    │   ├── ValuationResults.jsx
    │   ├── SectionFeatures.jsx
    │   ├── SectionWhyUs.jsx
    │   ├── SectionBulkSearch.jsx
    │   └── Footer.jsx
    ├── BulkValuationPage.jsx
    ├── PrivacyPolicy.jsx
    ├── TermsOfService.jsx
    └── CookiePolicy.jsx
```

### **Component Categories**
- **Layout Components**: Header, Footer, Navigation
- **Page Components**: Home, BulkValuationPage, Policy pages
- **Feature Components**: ValuationForm, ValuationResults, SearchBar
- **Section Components**: Hero, Features, WhyUs, CTA sections
- **Utility Components**: Avatar, DonationModal, Loading states

---

## **API Structure**

### **Backend Endpoints**
- **`GET /health`**: Health check endpoint
- **`GET /`**: API information endpoint
- **`POST /api/value`**: Single domain valuation
- **`POST /api/bulk-value`**: Bulk domain valuation

### **Frontend API Integration**
- **`frontend/src/config/api.js`**: API configuration
- **`frontend/src/utils/api.js`**: API utility functions
- **`frontend/src/hooks/useDomainValuation.js`**: API integration hook

---

## **Security Implementation**

### **Security Files**
- **`backend/src/config/security.js`**: Backend security configuration
- **`frontend/src/config/security.js`**: Frontend security utilities
- **`frontend/src/utils/security.js`**: Security validation functions
- **`security-audit.js`**: Automated security scanning

### **Security Features**
- **Input Validation**: Comprehensive domain name validation
- **Rate Limiting**: IP-based request limiting
- **CORS Protection**: Strict origin validation
- **Security Headers**: Full security header implementation
- **Error Handling**: Secure error messages without information leakage

---

## **Development and Deployment**

### **Development Scripts**
- **`start-servers.sh`**: Development environment startup
- **`npm run dev`**: Frontend development server
- **`npm run dev`**: Backend development server

### **Build and Deployment**
- **Frontend**: Vercel deployment with automatic builds
- **Backend**: Render.com deployment with auto-scaling
- **Build Process**: Vite build with optimization
- **Environment**: Environment-specific configurations

---

## **File Naming Conventions**

### **React Components**
- **PascalCase**: `ValuationForm.jsx`, `HeroSection.jsx`
- **Descriptive names**: Clear purpose indication
- **Consistent structure**: Similar components follow same pattern

### **Utility Files**
- **camelCase**: `api.js`, `searchTracker.js`
- **Functional names**: Clear utility purpose
- **Grouped by function**: Related utilities in same directory

### **Configuration Files**
- **Descriptive names**: `vite.config.js`, `tailwind.config.js`
- **Standard extensions**: `.config.js`, `.env`, `.json`
- **Environment specific**: `.env.production`, `.env.development`

---

## **Dependencies and Technologies**

### **Frontend Dependencies**
- **React.js 18+**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing

### **Backend Dependencies**
- **Node.js 18+**: JavaScript runtime
- **Express.js**: Web framework
- **Helmet.js**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request limiting middleware

---

## **Future Structure Considerations**

### **Planned Additions**
- **`frontend/src/context/`**: React context for state management
- **`frontend/src/services/`**: API service layer
- **`backend/src/models/`**: Data models (if database added)
- **`backend/src/services/`**: Business logic services
- **`tests/`**: Test files and testing infrastructure

### **Scalability Improvements**
- **Component Library**: Reusable component system
- **State Management**: Global state management solution
- **API Versioning**: Versioned API endpoints
- **Microservices**: Service-oriented architecture

---

## **Maintenance and Updates**

### **Regular Tasks**
- **Security Audits**: Monthly security assessments
- **Dependency Updates**: Regular package updates
- **Performance Monitoring**: Continuous performance tracking
- **Code Quality**: Regular code reviews and improvements

### **Documentation Updates**
- **API Changes**: Update API documentation
- **New Features**: Update feature documentation
- **Security Updates**: Update security documentation
- **Deployment Changes**: Update deployment guides

---

**Document Version**: 2.0.0  
**Last Updated**: August 16, 2025  
**Next Review**: September 16, 2025
