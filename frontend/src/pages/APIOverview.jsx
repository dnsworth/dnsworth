import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const APIOverview = ({ onNavigateToBulk, onNavigateHome, onNavigateToGems }) => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>API Access - DNSWorth Domain Valuation API</title>
        <meta name="description" content="Learn about DNSWorth's domain valuation API, use cases, and how to request access." />
        <link rel="canonical" href="https://dnsworth.com/page/api" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="API Access - DNSWorth Domain Valuation API" />
        <meta property="og:description" content="Learn about DNSWorth's domain valuation API, use cases, and how to request access." />
        <meta property="og:url" content="https://dnsworth.com/page/api" />
        <meta property="og:site_name" content="DNSWorth" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dnsworth.com' },
            { '@type': 'ListItem', position: 2, name: 'API Access', item: 'https://dnsworth.com/page/api' }
          ]
        })}</script>
      </Helmet>

      <Header onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateToHome} onNavigateToGems={onNavigateToGems} />

      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-3">API Access</h1>
            <p className="text-gray-300">Overview of endpoints, authentication, rate limits, and a simple request access form.</p>
          </div>
        </div>
      </section>

      <Footer onBulkValuation={onNavigateToBulk} onNavigateHome={onNavigateToHome} />
    </div>
  );
};

export default APIOverview;
