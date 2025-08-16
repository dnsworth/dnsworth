import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const TermsOfService = ({ onNavigateToBulk, onNavigateHome }) => {
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
            Terms of Service
          </motion.h1>
          <motion.p
            className="text-xl text-text-muted mb-4"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Legal terms governing your use of DNSWorth services.
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
              <h2 className="text-3xl font-bold text-primary mb-6">1. Acceptance & Legal Agreement</h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  <strong>IMPORTANT:</strong> By accessing and using DNSWorth ("the Service," "we," "our," or "us"), you accept and agree to be bound by these Terms of Service ("Terms") which constitute a legally binding contract between you and DNSWorth.
                </p>
                <p>
                  <strong>If you do not agree to these Terms in their entirety, you must immediately discontinue use of our services.</strong> Continued use constitutes acceptance of all terms and conditions outlined herein.
                </p>
                <p>
                  These Terms govern your use of our domain valuation service operated by DNSWorth and are subject to change with notice. Your continued use after changes constitutes acceptance of modified terms.
                </p>
              </div>
            </motion.section>

            {/* Service Description */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">2. Service Description & Scope</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">2.1 What We Provide</h3>
                  <p className="text-text-muted mb-4">
                    DNSWorth provides the following services:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>AI-powered domain valuation analysis using HumbleWorth API</li>
                    <li>Single domain valuation with comprehensive market insights</li>
                    <li>Bulk portfolio valuation tools for multiple domains</li>
                    <li>CSV export functionality for valuation reports</li>
                    <li>Market-based valuation estimates and trends</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">2.2 Service Availability & Limitations</h3>
                  <p className="text-text-muted mb-4">
                    <strong>Service Availability:</strong> We strive to provide 24/7 service availability but cannot guarantee uninterrupted access due to:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Scheduled maintenance and system updates</li>
                    <li>Technical issues beyond our control</li>
                    <li>Third-party service provider outages</li>
                    <li>Force majeure events</li>
                  </ul>
                  <p className="text-text-muted mt-4">
                    <strong>Service Limitations:</strong> Our service is provided "as is" and may have usage limits, rate restrictions, or other operational constraints.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* User Responsibilities */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">3. User Responsibilities & Acceptable Use</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">3.1 Acceptable Use Requirements</h3>
                  <p className="text-text-muted mb-4">
                    You agree to use the Service only for lawful purposes and in accordance with these Terms:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Submit only legitimate domain names for valuation</li>
                    <li>Use the service for personal, business, or research purposes</li>
                    <li>Respect rate limits and fair usage policies</li>
                    <li>Provide accurate and truthful information</li>
                    <li>Maintain the security of your access and devices</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">3.2 Strictly Prohibited Activities</h3>
                  <p className="text-text-muted mb-4">
                    <strong>You may NOT:</strong>
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Use automated systems, bots, or scripts to abuse the service</li>
                    <li>Attempt to reverse engineer our algorithms or systems</li>
                    <li>Submit malicious, harmful, or inappropriate content</li>
                    <li>Violate any applicable laws, regulations, or third-party rights</li>
                    <li>Interfere with service operation or security measures</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use the service for illegal or fraudulent purposes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">3.3 Rate Limiting & Fair Usage</h3>
                  <p className="text-text-muted">
                    We implement rate limiting to ensure fair usage for all users. Excessive requests may result in temporary restrictions, account suspension, or permanent termination. We reserve the right to determine what constitutes abuse.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Intellectual Property */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">4. Intellectual Property Rights & Ownership</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">4.1 Our Intellectual Property</h3>
                  <p className="text-text-muted mb-4">
                    <strong>DNSWorth owns and retains all rights to:</strong>
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>The DNSWorth brand, trademarks, and service marks</li>
                    <li>Our proprietary algorithms and AI systems</li>
                    <li>Website design, layout, and user interface</li>
                    <li>Software code, APIs, and technical infrastructure</li>
                    <li>Valuation methodologies and data processing techniques</li>
                    <li>All content, features, and functionality</li>
                  </ul>
                  <p className="text-text-muted mt-4">
                    <strong>These are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</strong>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">4.2 Your Rights & License</h3>
                  <p className="text-text-muted mb-4">
                    <strong>You retain ownership of:</strong>
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Domain names you submit for valuation</li>
                    <li>Your business information and proprietary data</li>
                    <li>Valuation reports generated for your use</li>
                    <li>Custom analysis and insights derived from our service</li>
                  </ul>
                  <p className="text-text-muted mt-4">
                    <strong>We grant you a limited, non-exclusive, non-transferable, revocable license to use our Service for its intended purpose only.</strong>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">4.3 License Restrictions</h3>
                  <p className="text-text-muted">
                    You may not: copy, modify, distribute, sell, lease, or create derivative works of our Service; remove or alter copyright notices; or use our Service for any unauthorized commercial purposes.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Disclaimers */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">5. Disclaimers & Service Limitations</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">5.1 Service "As Is" Disclaimer</h3>
                  <p className="text-text-muted mb-4">
                    <strong>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong> We disclaim all warranties including but not limited to:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Warranties of merchantability or fitness for a particular purpose</li>
                    <li>Warranties of non-infringement or title</li>
                    <li>Warranties that the service will be uninterrupted or error-free</li>
                    <li>Warranties regarding accuracy, reliability, or completeness</li>
                    <li>Warranties that defects will be corrected</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">5.2 Valuation Accuracy Disclaimers</h3>
                  <p className="text-text-muted mb-4">
                    <strong>CRITICAL:</strong> While we strive for accuracy, domain valuations are estimates based on available market data and should NOT be considered as:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Professional financial advice or investment recommendations</li>
                    <li>Guaranteed sale prices or market values</li>
                    <li>Legal appraisals or tax assessment values</li>
                    <li>Binding offers or commitments to purchase</li>
                    <li>Substitute for professional domain brokerage services</li>
                  </ul>
                  <p className="text-text-muted mt-4">
                    <strong>Valuations are estimates only and actual market values may differ significantly.</strong>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">5.3 Market Conditions & External Factors</h3>
                  <p className="text-text-muted">
                    Domain values fluctuate based on market conditions, trends, economic factors, and other variables beyond our control. We are not responsible for market changes or their impact on domain values.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Limitation of Liability */}
            <motion.section
              className="mb-16 bg-red-900/20 border border-red-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-red-400 mb-6">6. Limitation of Liability & Risk Allocation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">6.1 Comprehensive Liability Limitation</h3>
                  <p className="text-text-muted mb-4">
                    <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DNSWORTH SHALL NOT BE LIABLE FOR:</strong>
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Loss of profits, revenue, data, use, goodwill, or other intangible losses</li>
                    <li>Business interruption, loss of business opportunities, or reputation damage</li>
                    <li>Damages resulting from third-party actions or service failures</li>
                    <li>Any damages arising from your use or inability to use our service</li>
                    <li>Damages caused by viruses, malware, or other harmful components</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">6.2 Maximum Liability Cap</h3>
                  <p className="text-text-muted">
                    <strong>Our total liability to you for any claims arising from the use of our Service shall not exceed the amount you paid, if any, for using the Service, or $100 USD, whichever is less.</strong>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">6.3 Essential Purpose</h3>
                  <p className="text-text-muted">
                    The limitations in this section are fundamental to the agreement and would have been a significant factor in our decision to provide the Service. These limitations apply even if we have been advised of the possibility of such damages.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Indemnification */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">7. Indemnification & Defense Obligations</h2>
              
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  <strong>You agree to defend, indemnify, and hold harmless DNSWorth, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, debt, and expenses (including attorney's fees) arising from:</strong>
                </p>
                <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                  <li>Your use of the Service or violation of these Terms</li>
                  <li>Your violation of any third-party rights or applicable laws</li>
                  <li>Your submission of false, misleading, or fraudulent information</li>
                  <li>Any unauthorized access to or use of our Service</li>
                  <li>Your violation of intellectual property rights</li>
                  <li>Any other breach of these Terms by you</li>
                </ul>
                <p>
                  <strong>This indemnification obligation survives termination of these Terms and your use of the Service.</strong>
                </p>
              </div>
            </motion.section>

            {/* Privacy and Data */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">8. Privacy & Data Protection</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">8.1 Data Collection & Processing</h3>
                  <p className="text-text-muted mb-4">
                    Your privacy is important to us. Our collection, use, and protection of your data is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                  </p>
                  <p className="text-text-muted">
                    <strong>By using our Service, you consent to the collection and use of your information as described in our Privacy Policy.</strong>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">8.2 Data Security & Breach Notification</h3>
                  <p className="text-text-muted">
                    We implement appropriate security measures to protect your data, but cannot guarantee absolute security. In the event of a data breach affecting your information, we will notify you and relevant authorities as required by applicable law.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Termination */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">9. Termination & Service Cessation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">9.1 Termination by You</h3>
                  <p className="text-text-muted">
                    You may stop using our Service at any time by simply discontinuing use. No formal termination process is required.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">9.2 Termination by Us</h3>
                  <p className="text-text-muted mb-4">
                    We may terminate or suspend your access immediately, without prior notice, for any reason including but not limited to:
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Breach of these Terms or applicable laws</li>
                    <li>Abuse of our Service or violation of fair usage policies</li>
                    <li>Fraudulent or illegal activities</li>
                    <li>Non-payment of fees (if applicable)</li>
                    <li>Extended periods of inactivity</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">9.3 Effect of Termination</h3>
                  <p className="text-text-muted">
                    Upon termination, your right to use the Service ceases immediately. We may delete your data and account information, though we may retain certain information as required by law or for legitimate business purposes.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Governing Law */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">10. Governing Law & Dispute Resolution</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">10.1 Governing Law</h3>
                  <p className="text-text-muted">
                    These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where DNSWorth operates, without regard to conflict of law principles.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">10.2 Dispute Resolution Process</h3>
                  <p className="text-text-muted mb-4">
                    <strong>Before pursuing legal action, you agree to:</strong>
                  </p>
                  <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                    <li>Attempt good faith negotiations to resolve disputes</li>
                    <li>Participate in mediation if negotiations fail</li>
                    <li>Provide written notice of intent to pursue legal action</li>
                    <li>Allow reasonable time for resolution attempts</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">10.3 Jurisdiction & Venue</h3>
                  <p className="text-text-muted">
                    Any legal action shall be brought in the courts of the jurisdiction where DNSWorth operates. You consent to personal jurisdiction and venue in such courts.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Changes to Terms */}
            <motion.section
              className="mb-16 bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">11. Changes to Terms & Notification</h2>
              
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  <strong>We reserve the right to modify or replace these Terms at any time.</strong> Changes may be made for various reasons including legal compliance, service improvements, or business operations.
                </p>
                <p>
                  <strong>Material changes will be communicated through:</strong>
                </p>
                <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                  <li>Email notifications to registered users (30 days advance notice)</li>
                  <li>Prominent website notices and banners</li>
                  <li>Updated "Last updated" date on this page</li>
                  <li>Social media announcements for significant changes</li>
                </ul>
                <p>
                  <strong>Continued use of our Service after changes constitutes acceptance of the modified Terms.</strong> If you disagree with changes, you must discontinue use immediately.
                </p>
              </div>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              className="mb-16 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">12. Contact Information & Legal Support</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">12.1 Legal Team Contact</h3>
                  <p className="text-text-muted mb-4">
                    For questions about these Terms of Service or legal matters, please contact our legal team:
                  </p>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-text-muted">
                          <strong>Email:</strong><br />
                          <a href="mailto:legal@dnsworth.com" className="text-primary hover:text-primary/80 transition-colors">
                            legal@dnsworth.com
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="text-text-muted">
                          <strong>Response Time:</strong><br />
                          Within 30 days for legal inquiries
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">12.2 General Support</h3>
                  <p className="text-text-muted">
                    For general service questions or technical support, contact us at <strong>support@dnsworth.com</strong>.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Final Legal Disclaimer */}
            <motion.section
              className="mb-16 bg-red-900/20 border border-red-800 rounded-3xl p-8 shadow-2xl"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold text-red-400 mb-6">⚠️ Final Legal Disclaimer & Acknowledgment</h2>
              
              <div className="space-y-4 text-red-300 leading-relaxed">
                <p>
                  <strong>THESE TERMS OF SERVICE CONSTITUTE A LEGALLY BINDING AGREEMENT.</strong> By using our services, you acknowledge that you have read, understood, and agreed to all terms and conditions outlined herein.
                </p>
                <p>
                  <strong>You understand that domain valuations are estimates only and should not be used as the sole basis for financial decisions.</strong> Always consult with qualified professionals for investment, legal, or tax advice.
                </p>
                <p>
                  <strong>DNSWorth reserves all rights not expressly granted in these Terms.</strong> Continued use of our services after any changes constitutes acceptance of the updated Terms.
                </p>
                <p>
                  <strong>If you have questions about these Terms, contact our legal team immediately.</strong> We are committed to transparency and will address all inquiries promptly.
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

export default TermsOfService;
