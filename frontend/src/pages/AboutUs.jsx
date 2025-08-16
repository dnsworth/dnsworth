import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutUs = () => {
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
    hidden: { y: 50, opacity: 0 },
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
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
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
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl"
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

          {/* What Makes Us Different */}
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
                className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Unlimited Valuations, Always Free</h3>
                <p className="text-text-muted">No caps. No subscriptions. Run as many valuations as you need, without restrictions.</p>
              </motion.div>

              <motion.div
                className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Bulk Domain Analysis</h3>
                <p className="text-text-muted">Save time by evaluating up to 2,000 domains at once. Perfect for large portfolio holders and professional traders.</p>
              </motion.div>

              <motion.div
                className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Driven Accuracy</h3>
                <p className="text-text-muted">Our algorithms combine auction history, search trends, domain length, extensions, and comparable sales data to give you fair, transparent valuations.</p>
              </motion.div>

              <motion.div
                className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Daily Dropped Domain Insights</h3>
                <p className="text-text-muted">Every day, we update a curated list of valuable expired and dropped domains — helping investors spot hidden opportunities early.</p>
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

          {/* Who We Serve */}
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
                  className="bg-gray-900/30 p-6 rounded-xl border border-gray-800 text-center"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-text-muted">{item}</p>
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

          {/* Future Vision */}
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
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-6 rounded-xl border border-gray-700"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
                  <p className="text-text-muted">{item.description}</p>
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
