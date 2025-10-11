import { useState, useEffect } from 'react';

const DomainTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Almost expired domains with their market values
  const domains = [
    { name: 'MEDIASITTER.COM', value: '$2,450', status: 'Expiring Soon' },
    { name: 'EASYFEDERAL.COM', value: '$1,890', status: 'Expiring Soon' },
    { name: 'ADCLEARNERS.COM', value: '$3,200', status: 'Expiring Soon' },
    { name: 'ADVAPPS.COM', value: '$1,650', status: 'Expiring Soon' },
    { name: 'ADCLEANERS.COM', value: '$2,100', status: 'Expiring Soon' },
    { name: 'LOBSTERHUNTING.COM', value: '$4,500', status: 'Expiring Soon' },
    { name: 'CASINORECHNER.COM', value: '$3,800', status: 'Expiring Soon' },
    { name: 'FAMILYPREVENTION.COM', value: '$2,750', status: 'Expiring Soon' },
    { name: 'SORATED.COM', value: '$1,950', status: 'Expiring Soon' },
    { name: 'CSSXPRESS.COM', value: '$2,300', status: 'Expiring Soon' },
    { name: 'LAKESEAFOOD.COM', value: '$3,100', status: 'Expiring Soon' },
    { name: 'TICKETTOEUROPE.COM', value: '$2,850', status: 'Expiring Soon' },
    { name: 'DNSWORTH.COM', value: '$5,000', status: 'Expiring Soon' },
    { name: 'TRAFFICFILES.COM', value: '$2,200', status: 'Expiring Soon' }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 py-2 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
      </div>
      
      {/* Full-width ticker container */}
      <div className="w-full overflow-hidden">
        <div className="flex items-center space-x-8 animate-scroll">
          {/* Duplicate the list for seamless loop */}
          {[...domains, ...domains].map((domain, index) => {
            const domainParam = domain.name.includes('.') ? domain.name : `${domain.name}.com`;
            const target = `https://dynadot.com/domain/search?domain=${encodeURIComponent(domainParam)}`;
            const dynadotUrl = `https://www.tkqlhce.com/click-101518597-12527405?url=${encodeURIComponent(target)}`;
            
            return (
              <a
                key={`${domain.name}-${index}`}
                href={dynadotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center space-x-3 text-white group hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <div className="text-sm font-bold text-white group-hover:text-yellow-200 transition-colors">
                  {domain.name}
                </div>
                <div className="text-xs text-green-300 font-semibold bg-green-900/30 px-2 py-1 rounded">
                  {domain.value}
                </div>
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              </a>
            );
          })}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 45s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        /* Add a subtle glow effect */
        .animate-scroll::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default DomainTicker;
