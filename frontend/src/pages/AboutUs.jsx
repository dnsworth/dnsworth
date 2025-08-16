import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const [typedText, setTypedText] = useState('');
  const ownerVision = "My vision is to democratize domain intelligence and make professional-grade valuations accessible to everyone. Every domain investor deserves the tools to make informed decisions without barriers or costs.";

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
      {/* Back Arrow to Home */}
      <motion.div
        className="fixed top-8 left-8 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/"
          className="flex items-center gap-3 text-primary hover:text-secondary transition-colors duration-300 group"
        >
          <motion.div
            className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.div>
          <span className="font-medium text-sm">Back to Home</span>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
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
              Free, Unlimited Domain Valuations — Powered by Intelligence, Built for You
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

      {/* Main Content */}
      <motion.section
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-6">
          {/* Mission Statement */}
          <motion.div
            className="max-w-4xl mx-auto mb-20"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              variants={itemVariants}
            >
              Our Mission
            </motion.h2>
            <motion.p
              className="text-lg text-text-muted leading-relaxed mb-6"
              variants={itemVariants}
            >
              At DNSWorth, we believe knowledge should be accessible to everyone. The domain world is fast-moving, competitive, and often clouded by guesswork. We exist to remove that barrier by giving domain investors — from beginners to professionals — a clear, reliable, and completely free way to understand the true value of their digital assets.
            </motion.p>
            <motion.p
              className="text-lg text-text-muted leading-relaxed"
              variants={itemVariants}
            >
              Unlike traditional valuation services that limit you with paywalls, quotas, or subscription tiers, DNSWorth offers unlimited domain valuations at no cost. Every day. Every search. No hidden fees.
            </motion.p>
          </motion.div>

          {/* Why DNSWorth Exists */}
          <motion.div
            className="max-w-4xl mx-auto mb-20"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              variants={itemVariants}
            >
              Why DNSWorth Exists
            </motion.h2>
            <motion.p
              className="text-lg text-text-muted leading-relaxed mb-6"
              variants={itemVariants}
            >
              Domain names are the building blocks of the internet. For investors, entrepreneurs, and businesses alike, knowing the value of a domain is critical to making the right decisions — whether it's buying, selling, or building.
            </motion.p>
            <motion.p
              className="text-lg text-text-muted leading-relaxed"
              variants={itemVariants}
            >
              Our platform was created with one simple mission: To democratize access to domain intelligence, giving every investor the tools they need to compete and succeed.
            </motion.p>
          </motion.div>

          {/* What Makes Us Different - Comic Style Cards */}
          <motion.div
            className="mb-20"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              variants={itemVariants}
            >
              What Makes Us Different
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-8 rounded-3xl border border-gray-700/50 backdrop-blur-sm"
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Unlimited Valuations</h3>
                  <p className="text-sm text-text-muted">Always Free</p>
                </div>
                <p className="text-text-muted text-center leading-relaxed">No caps. No subscriptions. Run as many valuations as you need, without restrictions.</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-8 rounded-3xl border border-gray-700/50 backdrop-blur-sm"
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Bulk Analysis</h3>
                  <p className="text-sm text-text-muted">Speed Expert</p>
                </div>
                <p className="text-text-muted text-center leading-relaxed">Save time by evaluating up to 2,000 domains at once. Perfect for large portfolio holders.</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-8 rounded-3xl border border-gray-700/50 backdrop-blur-sm"
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🧠</span>
                  </div>
                  <h3 className="text-xl font-bold text-accent mb-2">AI-Driven Accuracy</h3>
                  <p className="text-sm text-text-muted">AI Specialist</p>
                </div>
                <p className="text-text-muted text-center leading-relaxed">Our algorithms combine auction history, search trends, and market data for accurate valuations.</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-8 rounded-3xl border border-gray-700/50 backdrop-blur-sm"
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📊</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Market Insights</h3>
                  <p className="text-sm text-text-muted">Data Analyst</p>
                </div>
                <p className="text-text-muted text-center leading-relaxed">Daily updates on valuable expired and dropped domains to spot hidden opportunities early.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Our Commitment */}
          <motion.div
            className="max-w-4xl mx-auto mb-20"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              variants={itemVariants}
            >
              Our Commitment
            </motion.h2>
            <motion.p
              className="text-lg text-text-muted leading-relaxed mb-6"
              variants={itemVariants}
            >
              At DNSWorth, we are committed to keeping domain valuations free, accurate, and accessible for everyone. We don't believe in limiting knowledge or charging gatekeeping fees. Our role is to empower you — whether you're testing your first domain idea or managing thousands.
            </motion.p>
          </motion.div>

          {/* Who We Serve - Comic Style Grid */}
          <motion.div
            className="mb-20"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              variants={itemVariants}
            >
              Who We Serve
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'First-time domain buyers looking for guidance.',
                'Seasoned investors managing large portfolios.',
                'Entrepreneurs & startups exploring brand identity through domains.',
                'Agencies & brokers seeking fast, bulk insights for clients.'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 p-6 rounded-2xl border border-gray-700/30 text-center backdrop-blur-sm"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-text-muted text-sm leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
            <motion.p
              className="text-center text-lg text-text-muted mt-8"
              variants={itemVariants}
            >
              No matter where you are on your journey, DNSWorth is built for you.
            </motion.p>
          </motion.div>

          {/* Future Vision - Comic Style Cards */}
          <motion.div
            className="mb-20"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              variants={itemVariants}
            >
              Our Future Vision
            </motion.h2>
            <motion.p
              className="text-lg text-text-muted leading-relaxed mb-8 text-center"
              variants={itemVariants}
            >
              DNSWorth is more than a valuation tool — it's a growing ecosystem. Our roadmap is built on innovation, accessibility, and community:
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Smarter AI Insights',
                  description: 'Soon, valuations will go beyond numbers, offering deeper predictive analytics on domain trends, brandability, and long-term potential.'
                },
                {
                  title: 'Seamless Integrations',
                  description: 'APIs and plug-ins will let brokers, marketplaces, and portfolio managers connect directly with DNSWorth for faster workflows.'
                },
                {
                  title: 'Marketplace Readiness',
                  description: 'We aim to simplify the buying and selling process, helping you not only evaluate your domains but also bring them to market with confidence.'
                },
                {
                  title: 'Global Accessibility',
                  description: 'As domain investing grows worldwide, DNSWorth will scale to support multiple languages, currencies, and localized insights.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-gray-700/40 backdrop-blur-sm"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.p
              className="text-center text-lg text-text-muted mt-8"
              variants={itemVariants}
            >
              We're not just building a tool — we're building the future of domain intelligence.
            </motion.p>
          </motion.div>

          {/* Owner Section - Comic Style with Typing Animation */}
          <motion.div
            className="max-w-2xl mx-auto mb-20 text-center"
            variants={itemVariants}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-8 rounded-3xl border border-gray-700/50 backdrop-blur-sm"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👨‍💻</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Azeez A.</h3>
                <p className="text-lg text-text-muted">Technical Support & Founder</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-600/30">
                <p className="text-sm text-text-muted/90 leading-relaxed max-w-md mx-auto">
                  "{typedText}
                  <span className="animate-pulse">|</span>"
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={itemVariants}
            >
              Unlock the Value of Your Domains with DNSWorth
            </motion.h2>
            <motion.p
              className="text-lg text-text-muted leading-relaxed mb-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Your domains are more than just names — they're digital real estate. With DNSWorth, you can finally understand their true worth without the guesswork, the limits, or the costs.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link
                to="/"
                className="btn-primary text-lg px-8 py-4"
              >
                Start Valuing Domains
              </Link>
              <Link
                to="/bulk-valuation"
                className="btn-secondary text-lg px-8 py-4"
              >
                Bulk Valuation
              </Link>
            </motion.div>
            <motion.p
              className="text-center text-lg text-primary mt-8 font-semibold"
              variants={itemVariants}
            >
              Start exploring your portfolio today with DNSWorth — your trusted partner in free, unlimited domain valuations.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
