import LocalAvatar from './LocalAvatar';

const SectionBulkSearch = ({ onBulkValuation }) => {
  // Creative comic characters for bulk valuation features
  const features = [
    {
      id: 1,
      title: "Portfolio Analysis",
      description: "Analyze your entire domain portfolio in one go",
      name: "Portfolio Pro",
      role: "Portfolio Manager",
      theme: "from-red-400 to-cyan-400"
    },
    {
      id: 2,
      title: "CSV Export",
      description: "Download results for further analysis",
      name: "Export Expert",
      role: "Data Specialist",
      theme: "from-green-400 to-yellow-400"
    },
    {
      id: 3,
      title: "Lightning Fast",
      description: "Get results in seconds, not minutes",
      name: "Speed Demon",
      role: "Performance Guru",
      theme: "from-pink-400 to-blue-400"
    },
    {
      id: 4,
      title: "Smart Insights",
      description: "Get detailed analysis and recommendations",
      name: "Smart Analyst",
      role: "Data Analyst",
      theme: "from-orange-400 to-purple-400"
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            Value Multiple Domains at Once
          </h2>
          <p className="text-xl text-text-muted mb-12 max-w-3xl mx-auto">
            Use our bulk valuation tool to check up to 100 domains instantly. Perfect for portfolio owners, domain investors, and businesses managing multiple domains.
          </p>
          
          {/* Creative Comic Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature) => (
              <div key={feature.id} className="group relative">
                <div className="bg-background border-2 border-gray-700 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                  
                  {/* Background Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.theme} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Comic Character */}
                  <div className="relative z-10 text-center mb-6">
                    <div className="relative mx-auto mb-4">
                      <LocalAvatar 
                        name={feature.name}
                        size="w-24 h-24"
                        className="border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Floating Badge */}
                      <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br ${feature.theme} rounded-full flex items-center justify-center shadow-lg border-2 border-white`}>
                        <span className="text-white text-sm font-bold">{feature.id}</span>
                      </div>
                    </div>
                    
                    {/* Character Info */}
                    <h4 className="text-lg font-bold text-text group-hover:text-primary transition-colors duration-300">
                      {feature.name}
                    </h4>
                    <p className="text-sm text-text-muted">{feature.role}</p>
                  </div>

                  {/* Feature Content */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect Ring */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300"></div>
                  
                  {/* Corner Decoration */}
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.theme} opacity-10 rounded-bl-2xl`}></div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onBulkValuation}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xl px-8 py-4 mb-8 rounded-xl font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Use Bulk Valuation
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionBulkSearch;
