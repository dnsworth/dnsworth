import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-gray-800 py-4">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              DNSWorth
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-text hover:text-primary transition-colors duration-200"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="bg-surface border border-gray-800 rounded-2xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold text-text mb-8 text-center">Privacy Policy</h1>
            <p className="text-text-muted mb-8 text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
              <p className="text-text-muted mb-4 leading-relaxed">
                DNSWorth ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our domain valuation service.
              </p>
              <p className="text-text-muted leading-relaxed">
                By using DNSWorth, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">2.1 Personal Information</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                We may collect personal information that you voluntarily provide, including:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Domain names you submit for valuation</li>
                <li>Search queries and usage patterns</li>
                <li>IP addresses and device information</li>
                <li>Browser type and version</li>
                <li>Operating system information</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">2.2 Usage Data</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                We automatically collect certain information about your use of our service:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Pages visited and time spent on each page</li>
                <li>Features used and interaction patterns</li>
                <li>Error logs and performance data</li>
                <li>Referral sources and search terms</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">2.3 Technical Information</h3>
              <p className="text-text-muted leading-relaxed">
                We collect technical information to ensure optimal service performance and security.
              </p>
            </section>

            {/* How We Use Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">3.1 Service Provision</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                We use your information to:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Provide domain valuation services</li>
                <li>Process bulk valuation requests</li>
                <li>Generate accurate valuation reports</li>
                <li>Improve our AI algorithms</li>
                <li>Ensure service reliability and performance</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">3.2 Service Improvement</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                We analyze usage patterns to:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Enhance user experience</li>
                <li>Optimize service performance</li>
                <li>Develop new features</li>
                <li>Fix bugs and technical issues</li>
                <li>Improve accuracy of valuations</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">3.3 Security and Compliance</h3>
              <p className="text-text-muted leading-relaxed">
                We use information to maintain security, prevent fraud, and comply with legal obligations.
              </p>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">4. Information Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">4.1 We Do Not Sell Your Data</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                DNSWorth does not sell, trade, or rent your personal information to third parties for marketing purposes.
              </p>

              <h3 className="text-xl font-semibold text-text mb-3">4.2 Service Providers</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                We may share information with trusted third-party service providers who assist us in:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Hosting and infrastructure services</li>
                <li>Domain valuation data providers</li>
                <li>Analytics and performance monitoring</li>
                <li>Customer support services</li>
                <li>Legal and compliance services</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">4.3 Legal Requirements</h3>
              <p className="text-text-muted leading-relaxed">
                We may disclose information when required by law, court order, or government request.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">5. Data Security</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">5.1 Security Measures</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                We implement comprehensive security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>End-to-end encryption for data transmission</li>
                <li>Secure server infrastructure with firewalls</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication systems</li>
                <li>Data backup and disaster recovery procedures</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">5.2 Data Retention</h3>
              <p className="text-text-muted leading-relaxed">
                We retain your information only as long as necessary to provide our services and comply with legal obligations.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">6. Your Privacy Rights</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">6.1 Access and Control</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">6.2 Opt-Out Options</h3>
              <p className="text-text-muted leading-relaxed">
                You can opt out of certain data collection and processing activities through your browser settings.
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">7. Cookies and Tracking Technologies</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">7.1 Types of Cookies</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                We use various types of cookies:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Essential cookies for service functionality</li>
                <li>Performance cookies for analytics</li>
                <li>Preference cookies for user settings</li>
                <li>Security cookies for authentication</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">7.2 Third-Party Services</h3>
              <p className="text-text-muted leading-relaxed">
                We may use third-party analytics and tracking services to improve our service.
              </p>
            </section>

            {/* International Transfers */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">8. International Data Transfers</h2>
              <p className="text-text-muted leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">9. Children's Privacy</h2>
              <p className="text-text-muted leading-relaxed">
                DNSWorth is not intended for children under 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-text-muted leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">11. Contact Us</h2>
              <p className="text-text-muted mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-text-muted">
                  <strong>Email:</strong> privacy@dnsworth.com<br />
                  <strong>Address:</strong> DNSWorth Privacy Team<br />
                  <strong>Response Time:</strong> Within 30 days
                </p>
              </div>
            </section>

            {/* Back to Home Button */}
            <div className="text-center pt-8 border-t border-gray-700">
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Back to DNSWorth
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
