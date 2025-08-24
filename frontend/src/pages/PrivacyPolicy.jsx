import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const PrivacyPolicy = ({ onNavigateToBulk, onNavigateHome }) => {
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
        <title>Privacy Policy - DNSWorth Data Protection & Privacy</title>
        <meta name="description" content="DNSWorth Privacy Policy - Learn how we protect your information and maintain your privacy while using our domain valuation services. Read our comprehensive data protection guidelines." />
        <meta name="keywords" content="DNSWorth privacy policy, data protection, domain valuation privacy, user data security, GDPR compliance, privacy protection" />
        <meta name="author" content="DNSWorth" />
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dnsworth.com/privacy-policy" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Policy - DNSWorth Data Protection & Privacy" />
        <meta property="og:description" content="DNSWorth Privacy Policy - Learn how we protect your information and maintain your privacy while using our domain valuation services." />
        <meta property="og:url" content="https://dnsworth.com/privacy-policy" />
        <meta property="og:site_name" content="DNSWorth" />
        <meta property="og:image" content="https://dnsworth.com/privacy-policy-og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy - DNSWorth Data Protection" />
        <meta name="twitter:description" content="DNSWorth Privacy Policy - Learn how we protect your information and maintain your privacy." />
        <meta name="twitter:image" content="https://dnsworth.com/privacy-policy-twitter-image.jpg" />
        
        {/* JSON-LD Structured Data for Legal Document */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "DNSWorth Privacy Policy",
            "description": "DNSWorth Privacy Policy - Learn how we protect your information and maintain your privacy",
            "url": "https://dnsworth.com/privacy-policy",
            "publisher": {
              "@type": "Organization",
              "name": "DNSWorth"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://dnsworth.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Privacy Policy",
                "item": "https://dnsworth.com/privacy-policy"
              }
            ]
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
            Privacy Policy
          </motion.h1>
          <motion.p
            className="text-xl text-text-muted mb-4"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Your privacy is our priority. Learn how we protect your information.
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
              <h2 className="text-3xl font-bold text-primary mb-6">1. Introduction & Legal Framework</h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  <strong>DNSWorth</strong> ("we," "our," "us," or "the Company") is committed to protecting your privacy while providing exceptional domain valuation services. This Privacy Policy ("Policy") is legally binding and governs how we collect, use, disclose, and safeguard your information.
                </p>
                <p>
                  <strong>By using our services, you explicitly agree to this Policy and acknowledge that you have read, understood, and consented to all terms herein.</strong> If you do not agree with any part of this Policy, you must immediately discontinue use of our services.
                </p>
                <p>
                  This Policy complies with applicable data protection laws including but not limited to GDPR, CCPA, and other international privacy regulations. We reserve the right to modify this Policy at any time with notice to users.
                </p>
              </div>
            </motion.section>

            {/* Information Collection */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">2. Information Collection & Legal Basis</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">2.1 Personal Information Collection</h3>
                  <p className="text-text-muted mb-4">
                    We collect information that you voluntarily provide and information automatically collected during service usage:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Domain names submitted for valuation (essential for service provision)</li>
                    <li>IP addresses and device information (security and fraud prevention)</li>
                    <li>Browser type, version, and operating system (service optimization)</li>
                    <li>Usage patterns and search queries (service improvement)</li>
                    <li>Error logs and performance data (technical maintenance)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">2.2 Legal Basis for Processing</h3>
                  <p className="text-text-muted">
                    We process your data based on: <strong>Contract performance</strong> (providing valuation services), <strong>Legitimate interests</strong> (service improvement and security), and <strong>Legal obligations</strong> (compliance with applicable laws).
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Data Usage */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">3. How We Use Your Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">3.1 Primary Service Functions</h3>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Providing accurate domain valuations using our AI-powered algorithms</li>
                    <li>Processing bulk valuation requests and generating comprehensive reports</li>
                    <li>Ensuring service reliability, performance, and security</li>
                    <li>Improving our valuation accuracy through machine learning</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">3.2 Service Enhancement & Analytics</h3>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Analyzing usage patterns to optimize user experience</li>
                    <li>Developing new features based on user needs and feedback</li>
                    <li>Monitoring service performance and identifying improvement opportunities</li>
                    <li>Conducting research to enhance domain valuation accuracy</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Data Sharing */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">4. Information Sharing & Third-Party Services</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">4.1 Strict No-Sale Policy</h3>
                  <p className="text-text-muted mb-4">
                    <strong>DNSWorth absolutely does not sell, trade, or rent your personal information to third parties for marketing purposes.</strong> Your data is valuable and we protect it accordingly.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">4.2 Essential Service Providers</h3>
                  <p className="text-text-muted mb-4">
                    We may share information only with trusted third-party service providers who assist in:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Hosting and infrastructure services (ensuring service availability)</li>
                    <li>Domain valuation data providers (HumbleWorth API integration)</li>
                    <li>Analytics and performance monitoring (service optimization)</li>
                    <li>Security and fraud prevention (protecting user data)</li>
                  </ul>
                  <p className="text-text-muted mt-4">
                    <strong>All third-party providers are contractually bound to maintain the same level of data protection as outlined in this Policy.</strong>
                  </p>
                  
                  <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3">4.2.1 Google Analytics Notice</h4>
                    <p className="text-text-muted mb-3">
                      We use Google Analytics to better understand how visitors interact with our website. This tool may collect data such as your IP address and usage behavior during your visit.
                    </p>
                    <p className="text-text-muted mb-3">
                      For more information on how Google Analytics collects and processes data, please visit: 
                      <a 
                        href="https://www.google.com/policies/privacy/partners/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-secondary underline ml-1"
                      >
                        https://www.google.com/policies/privacy/partners/
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">4.3 Legal Compliance</h3>
                  <p className="text-text-muted">
                    We may disclose information only when legally required by court order, government request, or to protect our rights, property, or safety, or that of our users or the public.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Data Security */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">5. Data Security & Protection Measures</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">5.1 Comprehensive Security Implementation</h3>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>End-to-end encryption for all data transmission (TLS 1.3)</li>
                    <li>Secure server infrastructure with enterprise-grade firewalls</li>
                    <li>Regular security audits, penetration testing, and vulnerability assessments</li>
                    <li>Multi-factor authentication and access control systems</li>
                    <li>Data backup, disaster recovery, and business continuity procedures</li>
                    <li>Employee security training and background checks</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">5.2 Data Retention & Disposal</h3>
                  <p className="text-text-muted">
                    We retain your information only as long as necessary to provide our services and comply with legal obligations. Data is securely disposed of using industry-standard methods when no longer required.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* User Rights */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">6. Your Privacy Rights & Control</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">6.1 Comprehensive User Rights</h3>
                  <p className="text-text-muted mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                    <li><strong>Erasure:</strong> Request deletion of your data (subject to legal requirements)</li>
                    <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                    <li><strong>Objection:</strong> Object to certain types of data processing</li>
                    <li><strong>Restriction:</strong> Limit how we process your data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">6.2 Exercise Your Rights</h3>
                  <p className="text-text-muted">
                    To exercise any of these rights, contact us at <strong>privacy@dnsworth.com</strong>. We will respond to all requests within 30 days as required by law.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Cookies */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">7. Cookies & Tracking Technologies</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">7.1 Essential Service Cookies</h3>
                  <p className="text-text-muted mb-4">
                    We use cookies and similar technologies to:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Maintain your session and preferences</li>
                    <li>Ensure service functionality and security</li>
                    <li>Analyze service performance and user experience</li>
                    <li>Prevent fraud and abuse</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">7.2 Cookie Management</h3>
                  <p className="text-text-muted">
                    You can control cookies through your browser settings. However, disabling essential cookies may affect service functionality. For detailed information, see our <strong>Cookie Policy</strong>.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* International Transfers */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">8. International Data Transfers & Compliance</h2>
              
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers, including:
                </p>
                <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                  <li>Standard Contractual Clauses (SCCs) for GDPR compliance</li>
                  <li>Adequacy decisions by relevant authorities</li>
                  <li>Certification schemes and codes of conduct</li>
                  <li>Binding corporate rules where applicable</li>
                </ul>
                <p>
                  <strong>We are committed to maintaining the same level of data protection regardless of where your data is processed.</strong>
                </p>
              </div>
            </motion.section>

            {/* Children's Privacy */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">9. Children's Privacy & Age Restrictions</h2>
              
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  <strong>DNSWorth is not intended for children under 13 years of age.</strong> We do not knowingly collect personal information from children under 13.
                </p>
                <p>
                  If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to remove such information from our records.
                </p>
                <p>
                  Users between 13-18 years of age must have parental consent to use our services, and we recommend parental supervision during use.
                </p>
              </div>
            </motion.section>

            {/* Policy Updates */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">10. Policy Updates & Notification</h2>
              
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
                </p>
                <p>
                  <strong>Material changes will be communicated to users through:</strong>
                </p>
                <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                  <li>Email notifications to registered users</li>
                  <li>Prominent website notices</li>
                  <li>Updated "Last updated" date on this page</li>
                  <li>Social media announcements for significant changes</li>
                </ul>
                <p>
                  <strong>Continued use of our services after changes constitutes acceptance of the updated Policy.</strong>
                </p>
              </div>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              className="mb-16 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">11. Contact Information & Support</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">11.1 Privacy Team Contact</h3>
                  <p className="text-text-muted mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our dedicated privacy team:
                  </p>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-text-muted">
                          <strong>Email:</strong><br />
                          <a href="mailto:privacy@dnsworth.com" className="text-primary hover:text-primary/80 transition-colors">
                            privacy@dnsworth.com
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="text-text-muted">
                          <strong>Response Time:</strong><br />
                          Within 30 days as required by law
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">11.2 Data Protection Officer</h3>
                  <p className="text-text-muted">
                    For complex privacy matters or regulatory inquiries, our Data Protection Officer is available at <strong>dpo@dnsworth.com</strong>.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Legal Disclaimer */}
            <motion.section
              className="mb-16 bg-red-900/20 border border-red-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-red-400 mb-6">⚠️ Important Legal Disclaimer</h2>
              
              <div className="space-y-4 text-red-300 leading-relaxed">
                <p>
                  <strong>This Privacy Policy is a legally binding document.</strong> By using our services, you acknowledge that you have read, understood, and agreed to all terms and conditions outlined herein.
                </p>
                <p>
                  <strong>DNSWorth reserves the right to modify this Policy at any time.</strong> Continued use of our services after changes constitutes acceptance of the updated Policy.
                </p>
                <p>
                  <strong>For questions about this Policy or to exercise your privacy rights, contact us immediately.</strong> We are committed to protecting your privacy and will respond to all inquiries promptly and professionally.
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

export default PrivacyPolicy;
