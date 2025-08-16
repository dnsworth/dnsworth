import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is DNSWorth and how does it work?",
      answer: "DNSWorth is a free, AI-powered domain valuation tool that provides instant and accurate domain appraisals. Simply enter a domain name, and our advanced AI analyzes millions of domain sales, market trends, and industry data to give you a professional-grade valuation in seconds. No registration required, completely free forever."
    },
    {
      question: "How accurate are DNSWorth's domain valuations?",
      answer: "Our valuations are highly accurate because they're based on real market data from actual domain sales, current market trends, and industry analysis. We use advanced AI algorithms that process millions of data points to provide professional-grade accuracy comparable to paid services, but completely free."
    },
    {
      question: "Can I value multiple domains at once?",
      answer: "Yes! DNSWorth offers bulk domain valuation for up to 100 domains simultaneously. This feature is perfect for domain investors, portfolio managers, and agencies who need to evaluate multiple domains quickly. Simply enter one domain per line and get comprehensive results for your entire portfolio."
    },
    {
      question: "Is DNSWorth really free forever?",
      answer: "Absolutely! DNSWorth is 100% free with no hidden fees, no subscriptions, and no limits. We believe domain intelligence should be accessible to everyone, so we've committed to keeping our service completely free forever. No premium tiers, no paywalls, just unlimited free domain valuations."
    },
    {
      question: "What makes DNSWorth different from other domain valuation tools?",
      answer: "DNSWorth stands out with AI-powered intelligence, instant results, market-based accuracy, professional-grade features, and complete freedom from costs. Unlike other tools that charge per valuation or limit usage, we provide unlimited access to professional-grade domain intelligence completely free."
    },
    {
      question: "How can I use DNSWorth for domain investing?",
      answer: "DNSWorth is perfect for domain investing! Use it to discover undervalued domains, evaluate potential purchases, assess your portfolio value, and identify profitable opportunities. Our bulk valuation tool helps you quickly analyze large numbers of domains to find the best investment opportunities."
    },
    {
      question: "Do you store my domain search history?",
      answer: "We prioritize your privacy. While we may temporarily store domain names for service improvement and accuracy enhancement, we don't track personal information or create user profiles. Your searches remain private and are used only to improve our valuation accuracy."
    },
    {
      question: "Can I trust DNSWorth for business decisions?",
      answer: "Yes, DNSWorth provides professional-grade accuracy suitable for business decisions. Our AI analyzes real market data and industry trends to give you reliable valuations. However, we recommend using our valuations as one of several factors in your decision-making process, not as the sole basis for business decisions."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about DNSWorth's free domain valuation service
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 text-primary"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-full h-full"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Still have questions? Our domain experts are here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="btn-primary text-lg px-8 py-4"
            >
              Start Valuing Domains
            </a>
            <a
              href="/bulk-valuation"
              className="btn-secondary text-lg px-8 py-4"
            >
              Bulk Valuation
            </a>
          </div>
        </motion.div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq, index) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default FAQSection;
