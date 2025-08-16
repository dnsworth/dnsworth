import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs = () => {
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
      {/* Header */}
      <Header />

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">AI Powered Intelligence</h3>
                  <p className="text-sm text-gray-600">AI Specialist</p>
                </div>
                <p className="text-gray-700 text-center leading-relaxed">Our advanced AI analyzes millions of domain sales, market trends, and industry data to provide you with the most accurate valuations possible.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Lightning Fast Results</h3>
                  <p className="text-sm text-gray-600">Speed Expert</p>
                </div>
                <p className="text-gray-700 text-center leading-relaxed">Get instant valuations in seconds, not minutes. Our optimized system delivers results faster than any other tool in the market.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">📊</span>
                  </div>
                  <h3 className="text-xl font-bold text-accent mb-2">Market Based Accuracy</h3>
                  <p className="text-sm text-gray-600">Data Analyst</p>
                </div>
                <p className="text-gray-700 text-center leading-relaxed">Real time market data from actual domain sales ensures your valuations reflect current market conditions and trends.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">💎</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Professional Grade</h3>
                  <p className="text-sm text-gray-600">Quality Expert</p>
                </div>
                <p className="text-gray-700 text-center leading-relaxed">Industry standard valuation methods used by domain brokers and professionals worldwide.</p>
              </motion.div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'First time domain buyers looking for guidance.',
                'Seasoned investors managing large portfolios.',
                'Entrepreneurs and startups exploring brand identity through domains.',
                'Agencies and brokers seeking fast, bulk insights for clients.'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 p-6 rounded-2xl border border-gray-200 text-center"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Smarter AI Insights',
                  description: 'Soon, valuations will go beyond numbers, offering deeper predictive analytics on domain trends, brandability, and long term potential.'
                },
                {
                  title: 'Seamless Integrations',
                  description: 'APIs and plug ins will let brokers, marketplaces, and portfolio managers connect directly with DNSWorth for faster workflows.'
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
                  className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700/40 backdrop-blur-sm"
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
              We are not just building a tool we are building the future of domain intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section - White Background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
              variants={itemVariants}
            >
              Unlock the Value of Your Domains with DNSWorth
            </motion.h2>
            <motion.p
              className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Your domains are more than just names they are digital real estate. With DNSWorth, you can finally understand their true worth without the guesswork, the limits, or the costs.
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
              Start exploring your portfolio today with DNSWorth your trusted partner in free, unlimited domain valuations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Owner Section - Black Background, Last Section Before Footer */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-10 rounded-3xl border border-gray-700/50 backdrop-blur-sm"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-24 h-24 bg-primary/30 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/40 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-primary mb-3">Azeez A.</h3>
                <p className="text-xl text-text-muted">Technical Support and Founder</p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600/30">
                <p className="text-lg text-text-muted/90 leading-relaxed max-w-2xl mx-auto">
                  "{typedText}
                  <span className="animate-pulse text-primary">|</span>"
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
