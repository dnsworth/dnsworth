const SectionFeatures = () => {
  // Feature data with cartoon-style avatars
  const features = [
    {
      id: 1,
      title: "AI-Powered Intelligence",
      description: "Our advanced AI analyzes millions of domain sales, market trends, and industry data to provide you with the most accurate valuations possible.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=DrSmart&backgroundColor=b6e3f4,c0aede,d1d4f9",
      name: "Dr. Smart",
      role: "AI Specialist",
      icon: "🧠",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Lightning Fast Results",
      description: "Get instant valuations in seconds, not minutes. Our optimized system delivers results faster than any other tool in the market.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=FlashRunner&backgroundColor=ffdfbf,ffd5dc,c9ffbf",
      name: "Flash Runner",
      role: "Speed Expert",
      icon: "⚡",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 3,
      title: "Market-Based Accuracy",
      description: "Real-time market data from actual domain sales ensures your valuations reflect current market conditions and trends.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=MarketMaster&backgroundColor=d4f4dd,ffd5dc,ffdfbf",
      name: "Market Master",
      role: "Data Analyst",
      icon: "📊",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      title: "100% Free Forever",
      description: "No hidden fees, no subscriptions, no limits. DNSWorth is completely free and will always remain that way.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=FreeSpirit&backgroundColor=c0aede,b6e3f4,d1d4f9",
      name: "Free Spirit",
      role: "Freedom Advocate",
      icon: "💎",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="why-choose-section" className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">DNSWorth</span>?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover why thousands of domain investors trust DNSWorth for instant, accurate valuations
          </p>
        </div>

        {/* Features with Creative Comic Portraits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="group relative">
                             <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:animate-giggle relative overflow-hidden">
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                                 {/* Header with Avatar */}
                 <div className="relative z-10 flex items-center gap-6 mb-6">
                   {/* Comic Portrait */}
                   <div className="relative">
                     <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                       <img 
                         src={feature.avatar} 
                         alt={feature.name}
                         className="w-full h-full object-cover"
                       />
                     </div>
                   </div>
                   
                   {/* Character Info */}
                   <div className="flex-1">
                     <h4 className="text-xl font-bold text-black">
                       {feature.name}
                     </h4>
                     <p className="text-sm text-gray-600 font-medium">{feature.role}</p>
                   </div>
                 </div>

                {/* Content */}
                <div className="relative z-10">
                                     <h3 className="text-2xl font-bold text-black mb-4">
                     {feature.title}
                   </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>

                

                {/* Hover Effect Ring */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500"></div>
                
                {/* Corner Decoration */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-3xl`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-8 inline-block">
            <h3 className="text-2xl font-bold text-black mb-4">
              Ready to Discover Your Domain's True Value?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of domain investors, entrepreneurs, and businesses who trust DNSWorth for accurate, instant valuations.
            </p>
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Valuing Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFeatures;
