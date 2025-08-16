import { useNavigate } from 'react-router-dom';

const CookiePolicy = () => {
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
            <h1 className="text-4xl font-bold text-text mb-8 text-center">Cookie Policy</h1>
            <p className="text-text-muted mb-8 text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">1. What Are Cookies?</h2>
              <p className="text-text-muted mb-4 leading-relaxed">
                Cookies are small text files that are placed on your device when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings.
              </p>
              <p className="text-text-muted leading-relaxed">
                At DNSWorth, we use cookies to enhance your experience, analyze site usage, and provide personalized services.
              </p>
            </section>

            {/* Types of Cookies We Use */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">2.1 Essential Cookies</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                These cookies are necessary for the website to function properly and cannot be disabled:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Authentication cookies for secure access</li>
                <li>Session management cookies</li>
                <li>Security and fraud prevention cookies</li>
                <li>Load balancing and performance cookies</li>
                <li>Essential functionality cookies</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">2.2 Performance Cookies</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                These cookies help us understand how visitors interact with our website:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Analytics cookies to track page views</li>
                <li>Performance monitoring cookies</li>
                <li>Error tracking and debugging cookies</li>
                <li>User behavior analysis cookies</li>
                <li>Service optimization cookies</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">2.3 Functionality Cookies</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                These cookies enable enhanced functionality and personalization:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Language preference cookies</li>
                <li>User interface customization cookies</li>
                <li>Feature preference cookies</li>
                <li>Search history cookies</li>
                <li>User experience enhancement cookies</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">2.4 Third-Party Cookies</h3>
              <p className="text-text-muted leading-relaxed">
                Some cookies are placed by third-party services that help us provide better services.
              </p>
            </section>

            {/* Specific Cookies We Use */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">3. Specific Cookies We Use</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="border border-gray-700 px-4 py-3 text-left text-text font-semibold">Cookie Name</th>
                      <th className="border border-gray-700 px-4 py-3 text-left text-text font-semibold">Purpose</th>
                      <th className="border border-gray-700 px-4 py-3 text-left text-text font-semibold">Duration</th>
                      <th className="border border-gray-700 px-4 py-3 text-left text-text font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background">
                    <tr className="border-b border-gray-700">
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">session_id</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Maintains your session</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Session</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Essential</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">search_count</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Tracks search usage</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">1 year</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Performance</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">language_pref</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Stores language preference</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">1 year</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Functionality</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">donation_prompt</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Manages donation prompts</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Session</td>
                      <td className="border border-gray-700 px-4 py-3 text-text-muted">Functionality</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* How We Use Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">4. How We Use Cookies</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">4.1 Service Functionality</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                We use cookies to:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Maintain your session across page visits</li>
                <li>Provide personalized domain valuation experiences</li>
                <li>Enable bulk valuation features</li>
                <li>Ensure secure access to our services</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">4.2 Analytics and Improvement</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                Cookies help us understand:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>How users interact with our service</li>
                <li>Which features are most popular</li>
                <li>Performance issues and optimization opportunities</li>
                <li>User journey and conversion patterns</li>
                <li>Service reliability and uptime</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">4.3 Security and Fraud Prevention</h3>
              <p className="text-text-muted leading-relaxed">
                We use cookies to detect and prevent fraudulent activities, protect against security threats, and ensure service integrity.
              </p>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">5. Third-Party Cookies</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">5.1 Analytics Services</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                We may use third-party analytics services that place cookies to help us understand website usage:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Performance monitoring services</li>
                <li>User behavior analytics</li>
                <li>Error tracking and reporting</li>
                <li>Service optimization tools</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">5.2 Domain Valuation Services</h3>
              <p className="text-text-muted leading-relaxed">
                Our domain valuation partners may place cookies to ensure accurate and reliable service delivery.
              </p>
            </section>

            {/* Cookie Management */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">6. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">6.1 Browser Settings</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Block all cookies (may affect functionality)</li>
                <li>Block third-party cookies only</li>
                <li>Delete existing cookies</li>
                <li>Set cookie expiration preferences</li>
                <li>Enable cookie notifications</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">6.2 Our Cookie Controls</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                We provide options to:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Opt out of non-essential cookies</li>
                <li>Manage performance tracking preferences</li>
                <li>Control functionality cookies</li>
                <li>Reset cookie preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">6.3 Impact of Disabling Cookies</h3>
              <p className="text-text-muted leading-relaxed">
                Disabling certain cookies may affect service functionality, personalization, and performance monitoring.
              </p>
            </section>

            {/* Data Collection and Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">7. Data Collection and Privacy</h2>
              
              <h3 className="text-xl font-semibold text-text mb-3">7.1 Information Collected</h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                Cookies may collect:
              </p>
              <ul className="list-disc list-inside text-text-muted mb-6 space-y-2 ml-4">
                <li>Device and browser information</li>
                <li>Usage patterns and preferences</li>
                <li>Session and interaction data</li>
                <li>Performance and error information</li>
                <li>Referral and traffic sources</li>
              </ul>

              <h3 className="text-xl font-semibold text-text mb-3">7.2 Data Protection</h3>
              <p className="text-text-muted leading-relaxed">
                All data collected through cookies is protected according to our Privacy Policy and applicable data protection laws.
              </p>
            </section>

            {/* Updates to Cookie Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">8. Updates to This Cookie Policy</h2>
              <p className="text-text-muted leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">9. Contact Us</h2>
              <p className="text-text-muted mb-4 leading-relaxed">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-text-muted">
                  <strong>Email:</strong> cookies@dnsworth.com<br />
                  <strong>Address:</strong> DNSWorth Cookie Policy Team<br />
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

export default CookiePolicy;
