import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
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
            <h1 className="text-4xl font-bold text-text mb-8 text-center">Terms of Service</h1>
            <p className="text-text-muted mb-8 text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
              <p className="text-text-muted mb-4 leading-relaxed">
                By accessing and using DNSWorth ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-text-muted leading-relaxed">
                These Terms of Service ("Terms") govern your use of our domain valuation service operated by DNSWorth.
              </p>
            </section>

            {/* Service Description */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">2. Service Description</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">2.1 What We Provide</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                DNSWorth provides:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>AI-powered domain valuation services</li>
                <li>Single domain valuation analysis</li>
                <li>Bulk portfolio valuation tools</li>
                <li>CSV export functionality</li>
                <li>Market-based valuation insights</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">2.2 Service Availability</h3>
              <p className="text-text-muted leading-relaxed">
                We strive to provide 24/7 service availability but cannot guarantee uninterrupted access due to maintenance, updates, or technical issues.
              </p>
            </section>

            {/* User Responsibilities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">3. User Responsibilities and Conduct</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">3.1 Acceptable Use</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                You agree to use the Service only for lawful purposes and in accordance with these Terms:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Submit only legitimate domain names for valuation</li>
                <li>Use the service for personal or business purposes</li>
                <li>Respect rate limits and fair usage policies</li>
                <li>Provide accurate and truthful information</li>
                <li>Maintain the security of your access</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">3.2 Prohibited Activities</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                You may not:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Use automated systems to abuse the service</li>
                <li>Attempt to reverse engineer our algorithms</li>
                <li>Submit malicious or harmful content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with service operation</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">3.3 Rate Limiting</h3>
              <p className="text-text-muted leading-relaxed">
                We implement rate limiting to ensure fair usage. Excessive requests may result in temporary restrictions.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">4. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">4.1 Our Rights</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                DNSWorth and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-text mb-3">4.2 Your Rights</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                You retain ownership of:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Domain names you submit for valuation</li>
                <li>Your business information and data</li>
                <li>Valuation reports generated for your use</li>
                <li>Custom analysis and insights</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">4.3 License to Use</h3>
              <p className="text-text-muted leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to use the Service for its intended purpose.
              </p>
            </section>

            {/* Disclaimers */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">5. Disclaimers and Limitations</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">5.1 Service "As Is"</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                The Service is provided "as is" and "as available" without warranties of any kind, either express or implied.
              </p>

              <h3 className="text-xl font-semibold text-text mb-3">5.2 Valuation Accuracy</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                While we strive for accuracy, domain valuations are estimates based on available market data and should not be considered as:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Professional financial advice</li>
                <li>Guaranteed sale prices</li>
                <li>Investment recommendations</li>
                <li>Legal appraisals</li>
                <li>Tax assessment values</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">5.3 Market Conditions</h3>
              <p className="text-text-muted leading-relaxed">
                Domain values fluctuate based on market conditions, trends, and other factors beyond our control.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">6. Limitation of Liability</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">6.1 General Limitation</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                In no event shall DNSWorth be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>

              <h3 className="text-xl font-semibold text-text mb-3">6.2 Maximum Liability</h3>
              <p className="text-text-muted leading-relaxed">
                Our total liability to you for any claims arising from the use of our Service shall not exceed the amount you paid, if any, for using the Service.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">7. Indemnification</h2>
              <p className="text-text-muted leading-relaxed">
                You agree to defend, indemnify, and hold harmless DNSWorth from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            {/* Privacy and Data */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">8. Privacy and Data Protection</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">8.1 Data Collection</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service.
              </p>

              <h3 className="text-xl font-semibold text-text mb-3">8.2 Data Security</h3>
              <p className="text-text-muted leading-relaxed">
                We implement appropriate security measures to protect your data, but cannot guarantee absolute security.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">9. Termination</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">9.1 Termination by You</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                You may stop using our Service at any time by simply discontinuing use.
              </p>

              <h3 className="text-xl font-semibold text-text mb-3">9.2 Termination by Us</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                We may terminate or suspend your access immediately, without prior notice, for any reason, including breach of these Terms.
              </p>

              <h3 className="text-xl font-semibold text-text mb-3">9.3 Effect of Termination</h3>
              <p className="text-text-muted leading-relaxed">
                Upon termination, your right to use the Service will cease immediately, and we may delete your data.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">10. Governing Law and Disputes</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">10.1 Governing Law</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where DNSWorth operates.
              </p>

              <h3 className="text-xl font-semibold text-text mb-3">10.2 Dispute Resolution</h3>
              <p className="text-text-muted leading-relaxed">
                Any disputes arising from these Terms shall be resolved through good faith negotiations or mediation before pursuing legal action.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">11. Changes to Terms</h2>
              <p className="text-text-muted leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">12. Contact Information</h2>
              <p className="text-text-muted mb-4 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-text-muted">
                  <strong>Email:</strong> legal@dnsworth.com<br />
                  <strong>Address:</strong> DNSWorth Legal Team<br />
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

export default TermsOfService;
