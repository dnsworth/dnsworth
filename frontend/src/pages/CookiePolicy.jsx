import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const CookiePolicy = ({ onNavigateToBulk, onNavigateHome }) => {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [lastUpdated] = useState(new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Helmet>
        <title>Cookie Policy - DNSWorth Cookie Usage & Tracking</title>
        <meta name="description" content="DNSWorth Cookie Policy - Understand how we use cookies and similar technologies to enhance your experience on our domain valuation platform. Learn about our cookie practices." />
        <meta name="keywords" content="DNSWorth cookie policy, cookie usage, tracking technologies, domain valuation cookies, privacy cookies, cookie consent" />
        <meta name="author" content="DNSWorth" />
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dnsworth.com/cookie-policy" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cookie Policy - DNSWorth Cookie Usage & Tracking" />
        <meta property="og:description" content="DNSWorth Cookie Policy - Understand how we use cookies and similar technologies to enhance your experience on our domain valuation platform." />
        <meta property="og:url" content="https://dnsworth.com/cookie-policy" />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content="https://dnsworth.com/cookie-policy-og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cookie Policy - DNSWorth Cookie Usage" />
        <meta name="twitter:description" content="DNSWorth Cookie Policy - Understand how we use cookies and similar technologies." />
        <meta name="twitter:image" content="https://dnsworth.com/cookie-policy-twitter-image.jpg" />
        
        {/* JSON-LD Structured Data for Legal Document */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "DNSWorth Cookie Policy",
            "description": "DNSWorth Cookie Policy - Understand how we use cookies and similar technologies",
            "url": "https://dnsworth.com/cookie-policy",
            "publisher": {
              "@type": "Organization",
              "name": "DNSWorth"
            }
          })}
        </script>
      </Helmet>
      {/* Header */}
      <Header onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateHome} />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Cookie Policy
          </motion.h1>
          <motion.p
            className="text-xl text-text-muted mb-4"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Understanding how we use cookies to enhance your experience.
          </motion.p>
          <motion.p
            className="text-lg text-text-muted/80"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Last updated: {lastUpdated}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Introduction */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">1. What Are Cookies & Why We Use Them</h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  <strong>Cookies are small text files</strong> that are placed on your device when you visit our website. They serve essential functions for providing you with the best possible experience on DNSWorth.
                </p>
                <p>
                  <strong>At DNSWorth, we use cookies responsibly</strong> to enhance your experience, analyze site usage, provide personalized services, and ensure the security and functionality of our domain valuation platform.
                </p>
                <p>
                  <strong>By using our website, you consent to our use of cookies</strong> as described in this policy. You can control and manage cookies through your browser settings, though disabling certain cookies may affect service functionality.
                </p>
              </div>
            </motion.section>

            {/* Types of Cookies */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">2. Types of Cookies We Use & Their Purposes</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">2.1 Essential Cookies (Required)</h3>
                  <p className="text-text-muted mb-4">
                    These cookies are absolutely necessary for the website to function properly and cannot be disabled:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li><strong>Authentication cookies:</strong> Secure access and session management</li>
                    <li><strong>Security cookies:</strong> Fraud prevention and threat detection</li>
                    <li><strong>Load balancing cookies:</strong> Ensuring optimal performance distribution</li>
                    <li><strong>Essential functionality cookies:</strong> Core service operations</li>
                    <li><strong>CSRF protection cookies:</strong> Preventing cross-site request forgery</li>
                  </ul>
                  <p className="text-text-muted mt-4">
                    <strong>Disabling essential cookies will prevent the website from functioning properly.</strong>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">2.2 Performance & Analytics Cookies</h3>
                  <p className="text-text-muted mb-4">
                    These cookies help us understand how visitors interact with our website and improve service quality:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li><strong>Analytics cookies:</strong> Track page views, user journeys, and engagement metrics</li>
                    <li><strong>Performance monitoring:</strong> Monitor loading times and service responsiveness</li>
                    <li><strong>Error tracking:</strong> Identify and resolve technical issues quickly</li>
                    <li><strong>User behavior analysis:</strong> Understand feature usage and preferences</li>
                    <li><strong>Service optimization:</strong> Improve overall user experience</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">2.3 Functionality & Preference Cookies</h3>
                  <p className="text-text-muted mb-4">
                    These cookies enable enhanced functionality and personalization:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li><strong>Language preference cookies:</strong> Remember your preferred language</li>
                    <li><strong>User interface customization:</strong> Store display preferences and settings</li>
                    <li><strong>Feature preference cookies:</strong> Remember your tool preferences</li>
                    <li><strong>Search history cookies:</strong> Provide recent search suggestions</li>
                    <li><strong>User experience enhancement:</strong> Optimize interface based on usage patterns</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">2.4 Third-Party Service Cookies</h3>
                  <p className="text-text-muted">
                    Some cookies are placed by trusted third-party services that help us provide better services, including domain valuation data providers, security services, and performance monitoring tools.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Specific Cookies Table */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">3. Specific Cookies We Use & Their Details</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-700 rounded-lg overflow-hidden">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="border border-gray-700 px-4 py-3 text-left text-white font-semibold">Cookie Name</th>
                      <th className="border border-gray-700 px-4 py-3 text-left text-white font-semibold">Purpose & Function</th>
                      <th className="border border-gray-700 px-4 py-3 text-left text-white font-semibold">Duration</th>
                      <th className="border border-gray-700 px-4 py-3 text-left text-white font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background">
                    <tr className="border-b border-gray-700">
                      <td className="border border-gray-700 px-4 py-3 text-text-muted font-mono text-sm">session_id</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Maintains your active session and authentication state</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Session</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted"><span className="bg-red-600 text-white px-2 py-1 rounded text-xs">Essential</span></td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="border border-gray-700 px-4 py-3 text-text-muted font-mono text-sm">search_count</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Tracks search usage for service optimization and fair usage monitoring</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">1 year</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted"><span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">Performance</span></td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="border border-gray-700 px-4 py-3 text-text-muted font-mono text-sm">language_pref</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Stores your preferred language for interface localization</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">1 year</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted"><span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Functionality</span></td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="border border-gray-700 px-4 py-3 text-text-muted font-mono text-sm">donation_prompt</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Manages donation prompts and user preference settings</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Session</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted"><span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Functionality</span></td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="border border-gray-700 px-4 py-3 text-text-muted font-mono text-sm">csrf_token</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Cross-site request forgery protection for security</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Session</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted"><span className="bg-red-600 text-white px-2 py-1 rounded text-xs">Essential</span></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted font-mono text-sm">rate_limit</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Rate limiting and abuse prevention for fair service usage</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">1 hour</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted"><span className="bg-red-600 text-white px-2 py-1 rounded text-xs">Essential</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-2">Cookie Type Legend:</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-red-600 text-white px-3 py-1 rounded text-sm">Essential - Required for functionality</span>
                  <span className="bg-yellow-600 text-white px-3 py-1 rounded text-sm">Performance - Service improvement</span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Functionality - Enhanced features</span>
                </div>
              </div>
            </motion.section>

            {/* How We Use Cookies */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">4. How We Use Cookies & Their Benefits</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">4.1 Core Service Functionality</h3>
                  <p className="text-text-muted mb-4">
                    We use cookies to provide essential domain valuation services:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Maintain your session across page visits and valuation requests</li>
                    <li>Remember your preferences and settings for personalized experience</li>
                    <li>Enable bulk valuation features and CSV export functionality</li>
                    <li>Ensure secure access and prevent unauthorized usage</li>
                    <li>Provide consistent user experience across different visits</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">4.2 Analytics & Service Improvement</h3>
                  <p className="text-text-muted mb-4">
                    Cookies help us understand and improve our service:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Analyze how users interact with our valuation tools</li>
                    <li>Identify which features are most popular and useful</li>
                    <li>Detect performance issues and optimize service speed</li>
                    <li>Understand user journeys and improve conversion rates</li>
                    <li>Monitor service reliability and uptime performance</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">4.3 Security & Fraud Prevention</h3>
                  <p className="text-text-muted">
                    We use cookies to maintain security and prevent abuse:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Detect and prevent fraudulent activities and bot attacks</li>
                    <li>Implement rate limiting to ensure fair usage for all users</li>
                    <li>Protect against security threats and unauthorized access</li>
                    <li>Maintain service integrity and prevent system abuse</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Third-Party Cookies */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">5. Third-Party Cookies & External Services</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">5.1 Analytics & Performance Services</h3>
                  <p className="text-text-muted mb-4">
                    We may use trusted third-party services that place cookies to help us provide better services:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li><strong>Performance monitoring services:</strong> Track website speed and reliability</li>
                    <li><strong>User behavior analytics:</strong> Understand how users interact with our platform</li>
                    <li><strong>Error tracking and reporting:</strong> Quickly identify and resolve technical issues</li>
                    <li><strong>Service optimization tools:</strong> Improve overall performance and user experience</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">5.2 Domain Valuation Services</h3>
                  <p className="text-text-muted mb-4">
                    Our domain valuation partners may place cookies to ensure accurate and reliable service delivery:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>HumbleWorth API integration cookies for valuation accuracy</li>
                    <li>Market data provider cookies for real-time information</li>
                    <li>Domain registry cookies for ownership verification</li>
                    <li>Security verification cookies for data integrity</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">5.3 Third-Party Cookie Control</h3>
                  <p className="text-text-muted">
                    <strong>All third-party services are carefully vetted</strong> and contractually bound to maintain the same level of data protection as outlined in our Privacy Policy. You can control third-party cookies through your browser settings.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Cookie Management */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">6. Managing Your Cookie Preferences & Control</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">6.1 Browser Settings & Controls</h3>
                  <p className="text-text-muted mb-4">
                    You can control cookies through your browser settings:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li><strong>Block all cookies:</strong> May affect website functionality</li>
                    <li><strong>Block third-party cookies only:</strong> Allow essential cookies while blocking external ones</li>
                    <li><strong>Delete existing cookies:</strong> Remove stored cookie data</li>
                    <li><strong>Set cookie expiration preferences:</strong> Control how long cookies are stored</li>
                    <li><strong>Enable cookie notifications:</strong> Get alerts when cookies are set</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">6.2 Our Cookie Management Tools</h3>
                  <p className="text-text-muted mb-4">
                    We provide options to manage your cookie preferences:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li><strong>Opt out of non-essential cookies:</strong> Control performance and functionality cookies</li>
                    <li><strong>Manage performance tracking preferences:</strong> Control analytics and monitoring</li>
                    <li><strong>Control functionality cookies:</strong> Manage personalization features</li>
                    <li><strong>Reset cookie preferences:</strong> Clear all stored preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">6.3 Impact of Disabling Cookies</h3>
                  <p className="text-text-muted">
                    <strong>Important:</strong> Disabling certain cookies may affect service functionality, personalization, and performance monitoring. Essential cookies cannot be disabled without breaking core website functions.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Data Collection and Privacy */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">7. Data Collection & Privacy Protection</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">7.1 Information Collected Through Cookies</h3>
                  <p className="text-text-muted mb-4">
                    Cookies may collect the following types of information:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li><strong>Device and browser information:</strong> Browser type, version, and operating system</li>
                    <li><strong>Usage patterns and preferences:</strong> How you interact with our services</li>
                    <li><strong>Session and interaction data:</strong> Your activity during visits</li>
                    <li><strong>Performance and error information:</strong> Technical data for service improvement</li>
                    <li><strong>Referral and traffic sources:</strong> How you found our website</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">7.2 Data Protection & Security</h3>
                  <p className="text-text-muted">
                    <strong>All data collected through cookies is protected</strong> according to our Privacy Policy and applicable data protection laws. We implement appropriate security measures and never sell or share your data with unauthorized third parties.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Updates to Policy */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">8. Updates to This Cookie Policy</h2>
              
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
                </p>
                <p>
                  <strong>Material changes will be communicated to users through:</strong>
                </p>
                <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                  <li>Email notifications to registered users</li>
                  <li>Prominent website notices and banners</li>
                  <li>Updated "Last updated" date on this page</li>
                  <li>Social media announcements for significant changes</li>
                </ul>
                <p>
                  <strong>Continued use of our services after changes constitutes acceptance of the updated Cookie Policy.</strong>
                </p>
              </div>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              className="mb-16 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">9. Contact Information & Support</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">9.1 Cookie Policy Team</h3>
                  <p className="text-text-muted mb-4">
                    If you have questions about our use of cookies or this Cookie Policy, please contact our dedicated team:
                  </p>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-text-muted">
                          <strong>Email:</strong><br />
                          <a href="mailto:cookies@dnsworth.com" className="text-primary hover:text-primary/80 transition-colors">
                            cookies@dnsworth.com
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="text-text-muted">
                          <strong>Response Time:</strong><br />
                          Within 30 days for policy inquiries
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">9.2 Technical Support</h3>
                  <p className="text-text-muted">
                    For technical issues related to cookies or website functionality, contact us at <strong>info@dnsworth.com</strong>.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Final Legal Disclaimer */}
            <motion.section
              className="mb-16 bg-red-900/20 border border-red-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-red-400 mb-6">⚠️ Important Legal Disclaimer</h2>
              
              <div className="space-y-4 text-red-300 leading-relaxed">
                <p>
                  <strong>This Cookie Policy is part of our comprehensive legal framework.</strong> By using our website, you acknowledge that you have read, understood, and agreed to our use of cookies as described herein.
                </p>
                <p>
                  <strong>Essential cookies are required for website functionality.</strong> Disabling them may prevent you from using our domain valuation services effectively.
                </p>
                <p>
                  <strong>For questions about this Policy or to manage your cookie preferences, contact us immediately.</strong> We are committed to transparency and will address all inquiries promptly.
                </p>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer onBulkValuation={onNavigateToBulk} onNavigateHome={onNavigateHome} />
    </div>
  );
};

export default CookiePolicy;
