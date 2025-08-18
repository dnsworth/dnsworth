import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs = ({ onNavigateToBulk, onNavigateHome }) => {
  const [typedText, setTypedText] = useState('');
  const ownerVision = "My vision is to democratize domain intelligence and make professional-grade valuations accessible to everyone. Every domain investor deserves the tools they need to compete and succeed.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= ownerVision.length) {
        setTypedText(ownerVision.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>About DNSWorth - Our Mission & Domain Valuation Technology</title>
        <meta name="description" content="Learn about DNSWorth's mission to democratize domain intelligence. Discover our AI-powered technology and commitment to providing free, professional-grade domain valuations." />
        <meta name="keywords" content="about DNSWorth, domain valuation company, AI domain technology, domain intelligence platform, free domain tools" />
        <meta name="author" content="DNSWorth" />
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dnsworth.com/about" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About DNSWorth - Our Mission & Domain Valuation Technology" />
        <meta property="og:description" content="Learn about DNSWorth's mission to democratize domain intelligence. Discover our AI-powered technology and commitment to providing free, professional-grade domain valuations." />
        <meta property="og:url" content="https://dnsworth.com/about" />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content="https://dnsworth.com/about-og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About DNSWorth - Our Mission & Technology" />
        <meta name="twitter:description" content="Learn about DNSWorth's mission to democratize domain intelligence." />
        <meta name="twitter:image" content="https://dnsworth.com/about-twitter-image.jpg" />
      </Helmet>
      {/* Header */}
      <Header onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateHome} />

      {/* Hero Section - Black Background */}
      <section className="relative py-20 overflow-hidden bg-black">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-accent/10 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              variants={itemVariants}
            >
              <span className="text-gradient">About DNSWorth</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-text-muted mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Free, Unlimited Domain Valuations Powered by Intelligence, Built for You
            </motion.p>
            <motion.div
              className="flex justify-center"
              variants={itemVariants}
            >
              <Link
                to="/"
                className="btn-primary text-lg px-8 py-4"
              >
                Start Valuing Domains
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement Section - White Background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900"
              variants={itemVariants}
            >
              Our Mission
            </motion.h2>
            <motion.p
              className="text-lg text-gray-700 leading-relaxed mb-6"
              variants={itemVariants}
            >
              At DNSWorth, we believe knowledge should be accessible to everyone. The domain world is fast moving, competitive, and often clouded by guesswork. We exist to remove that barrier by giving domain investors from beginners to professionals a clear, reliable, and completely free way to understand the true value of their digital assets.
            </motion.p>
            <motion.p
              className="text-lg text-gray-700 leading-relaxed"
              variants={itemVariants}
            >
              Unlike traditional valuation services that limit you with paywalls, quotas, or subscription tiers, DNSWorth offers unlimited domain valuations at no cost. Every day. Every search. No hidden fees.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why DNSWorth Exists Section - Black Background */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 text-center text-white"
              variants={itemVariants}
            >
              Why DNSWorth Exists
            </motion.h2>
            <motion.p
              className="text-lg text-text-muted leading-relaxed mb-6"
              variants={itemVariants}
            >
              Domain names are the building blocks of the internet. For investors, entrepreneurs, and businesses alike, knowing the value of a domain is critical to making the right decisions whether it is buying, selling, or building.
            </motion.p>
            <motion.p
              className="text-lg text-text-muted leading-relaxed"
              variants={itemVariants}
            >
              Our platform was created with one simple mission: To democratize access to domain intelligence, giving every investor the tools they need to compete and succeed.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Different Section - White Background with Comic Style Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900"
              variants={itemVariants}
            >
              What Makes Us Different
            </motion.h2>
            
            {/* Features with Creative Comic Portraits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  id: 1,
                  title: "AI-Powered Intelligence",
                  description: "Our advanced AI analyzes millions of domain sales, market trends, and industry data to provide you with the most accurate valuations possible.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AI&backgroundColor=b6e3f4,c0aede,d1d4f9",
                  name: "Dr. Smart",
                  role: "AI Specialist",
                  icon: "🧠",
                  color: "from-blue-500 to-purple-600"
                },
                {
                  id: 2,
                  title: "Lightning Fast Results",
                  description: "Get instant valuations in seconds, not minutes. Our optimized system delivers results faster than any other tool in the market.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Speed&backgroundColor=ffdfbf,ffd5dc,c9ffbf",
                  name: "Flash Runner",
                  role: "Speed Expert",
                  icon: "⚡",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  id: 3,
                  title: "Market-Based Accuracy",
                  description: "Real-time market data from actual domain sales ensures your valuations reflect current market conditions and trends.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Market&backgroundColor=d4f4dd,ffd5dc,ffdfbf",
                  name: "Market Master",
                  role: "Data Analyst",
                  icon: "📊",
                  color: "from-green-500 to-teal-500"
                },
                {
                  id: 4,
                  title: "100% Free Forever",
                  description: "No hidden fees, no subscriptions, no limits. DNSWorth is completely free and will always remain that way.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Free&backgroundColor=c0aede,b6e3f4,d1d4f9",
                  name: "Free Spirit",
                  role: "Freedom Advocate",
                  icon: "💎",
                  color: "from-purple-500 to-pink-500"
                }
              ].map((feature) => (
                <motion.div
                  key={feature.id}
                  className="group relative"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:animate-giggle relative overflow-hidden">
                    
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Header with Avatar */}
                    <div className="relative z-10 flex items-center gap-6 mb-6">
                      {/* Comic Portrait */}
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <img 
                            src={feature.avatar} 
                            alt={feature.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Character Info */}
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-black">
                          {feature.name}
                        </h4>
                        <p className="text-sm text-gray-600 font-medium">{feature.role}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-black mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover Effect Ring */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500"></div>
                    
                    {/* Corner Decoration */}
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-3xl`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Commitment Section - Black Background */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 text-center text-white"
              variants={itemVariants}
            >
              Our Commitment
            </motion.h2>
            <motion.p
              className="text-lg text-text-muted leading-relaxed mb-6"
              variants={itemVariants}
            >
              At DNSWorth, we are committed to keeping domain valuations free, accurate, and accessible for everyone. We do not believe in limiting knowledge or charging gatekeeping fees. Our role is to empower you whether you are testing your first domain idea or managing thousands.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve Section - White Background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900"
              variants={itemVariants}
            >
              Who We Serve
            </motion.h2>
            
            {/* Features with Creative Comic Portraits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  id: 1,
                  title: "First Time Domain Buyers",
                  description: "Looking for guidance and understanding in the complex world of domain investing. We provide clear, actionable insights to help you make informed decisions.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Newbie&backgroundColor=b6e3f4,c0aede,d1d4f9",
                  name: "Domain Newbie",
                  role: "First Time Buyer",
                  icon: "🔍",
                  color: "from-blue-500 to-purple-600"
                },
                {
                  id: 2,
                  title: "Seasoned Investors",
                  description: "Managing large portfolios and need fast, accurate valuations for hundreds or thousands of domains. Our bulk tools save you hours of research.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Investor&backgroundColor=ffdfbf,ffd5dc,c9ffbf",
                  name: "Portfolio Master",
                  role: "Seasoned Investor",
                  icon: "💼",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  id: 3,
                  title: "Entrepreneurs & Startups",
                  description: "Exploring brand identity through domains. We help you understand the market value and potential of your brand names before making crucial decisions.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Startup&backgroundColor=d4f4dd,ffd5dc,ffdfbf",
                  name: "Startup Visionary",
                  role: "Entrepreneur",
                  icon: "🚀",
                  color: "from-green-500 to-teal-500"
                },
                {
                  id: 4,
                  title: "Agencies & Brokers",
                  description: "Seeking fast, bulk insights for clients. Our professional-grade tools help you provide accurate valuations and build trust with your client base.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Broker&backgroundColor=c0aede,b6e3f4,d1d4f9",
                  name: "Agency Pro",
                  role: "Domain Broker",
                  icon: "🤝",
                  color: "from-purple-500 to-pink-500"
                }
              ].map((feature) => (
                <motion.div
                  key={feature.id}
                  className="group relative"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:animate-giggle relative overflow-hidden">
                    
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Header with Avatar */}
                    <div className="relative z-10 flex items-center gap-6 mb-6">
                      {/* Comic Portrait */}
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <img 
                            src={feature.avatar} 
                            alt={feature.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Character Info */}
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-black">
                          {feature.name}
                        </h4>
                        <p className="text-sm text-gray-600 font-medium">{feature.role}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-black mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover Effect Ring */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500"></div>
                    
                    {/* Corner Decoration */}
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-3xl`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.p
              className="text-center text-lg text-gray-700 mt-8"
              variants={itemVariants}
            >
              No matter where you are on your journey, DNSWorth is built for you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Future Vision Section - Black Background */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
              variants={itemVariants}
            >
              Our Future Vision
            </motion.h2>
            <motion.p
              className="text-lg text-text-muted leading-relaxed mb-8 text-center"
              variants={itemVariants}
            >
              DNSWorth is more than a valuation tool it is a growing ecosystem. Our roadmap is built on innovation, accessibility, and community:
            </motion.p>
            
            {/* Features with Creative Comic Portraits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  id: 1,
                  title: "Smarter AI Insights",
                  description: "Soon, valuations will go beyond numbers, offering deeper predictive analytics on domain trends, brandability, and long term potential.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AI-Future&backgroundColor=b6e3f4,c0aede,d1d4f9",
                  name: "AI Prophet",
                  role: "Future AI Specialist",
                  icon: "🧠",
                  color: "from-blue-500 to-purple-600"
                },
                {
                  id: 2,
                  title: "Seamless Integrations",
                  description: "APIs and plug ins will let brokers, marketplaces, and portfolio managers connect directly with DNSWorth for faster workflows.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Integration&backgroundColor=ffdfbf,ffd5dc,c9ffbf",
                  name: "Integration Master",
                  role: "API Developer",
                  icon: "🔌",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  id: 3,
                  title: "Marketplace Readiness",
                  description: "We aim to simplify the buying and selling process, helping you not only evaluate your domains but also bring them to market with confidence.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marketplace&backgroundColor=d4f4dd,ffd5dc,ffdfbf",
                  name: "Market Maker",
                  role: "Marketplace Expert",
                  icon: "🏪",
                  color: "from-green-500 to-teal-500"
                },
                {
                  id: 4,
                  title: "Global Accessibility",
                  description: "As domain investing grows worldwide, DNSWorth will scale to support multiple languages, currencies, and localized insights.",
                  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Global&backgroundColor=c0aede,b6e3f4,d1d4f9",
                  name: "Global Ambassador",
                  role: "International Expert",
                  icon: "🌍",
                  color: "from-purple-500 to-pink-500"
                }
              ].map((feature) => (
                <motion.div
                  key={feature.id}
                  className="group relative"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-900/70 border-4 border-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.1)] transition-all duration-500 hover:animate-giggle relative overflow-hidden backdrop-blur-sm">
                    
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
                    {/* Header with Avatar */}
                    <div className="relative z-10 flex items-center gap-6 mb-6">
                      {/* Comic Portrait */}
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-600 shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <img 
                            src={feature.avatar} 
                            alt={feature.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Character Info */}
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white">
                          {feature.name}
                        </h4>
                        <p className="text-sm text-gray-300 font-medium">{feature.role}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-primary mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-text-muted text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover Effect Ring */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500"></div>
                    
                    {/* Corner Decoration */}
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.color} opacity-20 rounded-bl-3xl`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.p
              className="text-center text-lg text-text-muted mt-8"
              variants={itemVariants}
            >
              We are not just building a tool we are building the future of domain intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Owner Section - Orange Background with Comic Portrait Style */}
      <section className="py-20 bg-gradient-to-br from-secondary to-secondary/90">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-black"
              variants={itemVariants}
            >
              Meet Our Founder
            </motion.h2>
            
            {/* Founder with Creative Comic Portrait */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="group relative"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:animate-giggle relative overflow-hidden">
                  
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
                  
                  {/* Header with Avatar */}
                  <div className="relative z-10 flex items-center gap-6 mb-6">
                    {/* Comic Portrait */}
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src="https://api.dicebear.com/7.x/adventurer/svg?seed=Adee&backgroundColor=b6e3f4,c0aede,d1d4f9"
                          alt="Adeé A."
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Character Info */}
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-black">
                        Adeé A.
                      </h4>
                      <p className="text-lg text-gray-600 font-medium">Technical Support and Founder</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">

                    <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                      <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
                        "{typedText}
                        <span className="animate-pulse text-primary">|</span>"
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect Ring */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500"></div>
                  
                  {/* Corner Decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-3xl"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
