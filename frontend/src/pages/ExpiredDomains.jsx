import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ExpiredDomains = ({ onNavigateToBulk, onNavigateHome, onNavigateToGems }) => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Expired & Dropped Domains - DNSWorth</title>
        <meta name="description" content="Understand expired and dropped domains, why they matter, and how to evaluate them using DNSWorth." />
        <link rel="canonical" href="https://dnsworth.com/page/expired-domains" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Expired & Dropped Domains - DNSWorth" />
        <meta property="og:description" content="Understand expired and dropped domains, why they matter, and how to evaluate them using DNSWorth." />
        <meta property="og:url" content="https://dnsworth.com/page/expired-domains" />
        <meta property="og:site_name" content="DNSWorth" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dnsworth.com' },
            { '@type': 'ListItem', position: 2, name: 'Expired Domains', item: 'https://dnsworth.com/page/expired-domains' }
          ]
        })}</script>
      </Helmet>

      <Header onNavigateToBulk={onNavigateToBulk} onNavigateHome={onNavigateToHome} onNavigateToGems={onNavigateToGems} />

      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-3">Expired & Dropped Domains</h1>
            <p className="text-gray-300">What they are, why they matter, and how to find opportunities.</p>
          </div>
        </div>
      </section>

      <Footer onBulkValuation={onNavigateToBulk} onNavigateToHome={onNavigateToHome} />
    </div>
  );
};

export default ExpiredDomains;
