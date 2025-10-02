const SectionWhyUs = () => {
  // Testimonial data with cartoon-style avatars
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Domain Investor",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=SarahChen&backgroundColor=b6e3f4,c0aede,d1d4f9",
      quote: "DNSWorth has revolutionized how I evaluate domain portfolios. The accuracy is incredible!"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=MarcusRodriguez&backgroundColor=ffdfbf,ffd5dc,c9ffbf",
      quote: "Finally, a tool that gives me real market insights without the corporate price tag."
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Digital Entrepreneur",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AishaPatel&backgroundColor=d4f4dd,ffd5dc,ffdfbf",
      quote: "Lightning fast and incredibly accurate. This is exactly what the domain industry needed."
    },
    {
      id: 4,
      name: "David Kim",
      role: "Domain Broker",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=DavidKim&backgroundColor=c0aede,b6e3f4,d1d4f9",
      quote: "I use DNSWorth daily for client consultations. The results speak for themselves."
    },
    {
      id: 5,
      name: "Emma Thompson",
      role: "Tech Investor",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=EmmaThompson&backgroundColor=ffdfbf,c9ffbf,ffd5dc",
      quote: "Professional-grade valuations at zero cost. DNSWorth is a game-changer."
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Domain Flipper",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=JamesWilson&backgroundColor=d1d4f9,b6e3f4,c0aede",
      quote: "The bulk valuation feature saved me hours of research. Absolutely brilliant!"
    },
    {
      id: 7,
      name: "Lisa Zhang",
      role: "Marketing Director",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=LisaZhang&backgroundColor=c9ffbf,ffd5dc,ffdfbf",
      quote: "We use DNSWorth for all our domain acquisitions. Reliable and fast."
    },
    {
      id: 8,
      name: "Robert Johnson",
      role: "Domain Consultant",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=RobertJohnson&backgroundColor=ffd5dc,ffdfbf,c9ffbf",
      quote: "Finally, a valuation tool that doesn't require a subscription or hidden fees."
    },
    {
      id: 9,
      name: "Maria Garcia",
      role: "E-commerce Owner",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=MariaGarcia&backgroundColor=b6e3f4,d1d4f9,c0aede",
      quote: "DNSWorth helped me make informed decisions about my domain investments."
    },
    {
      id: 10,
      name: "Alex Turner",
      role: "Digital Asset Manager",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AlexTurner&backgroundColor=c9ffbf,ffdfbf,ffd5dc",
      quote: "The AI-powered insights are spot-on. This tool has become indispensable."
    },
    {
      id: 11,
      name: "Nina Patel",
      role: "Blockchain Developer",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=NinaPatel&backgroundColor=d1d4f9,c0aede,b6e3f4",
      quote: "As a developer, I appreciate the clean API and accurate results. DNSWorth is my go-to tool."
    },
    {
      id: 12,
      name: "Carlos Mendez",
      role: "Real Estate Investor",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=CarlosMendez&backgroundColor=ffdfbf,ffd5dc,c9ffbf",
      quote: "I use DNSWorth to evaluate digital assets alongside my real estate portfolio. Excellent tool!"
    },
    {
      id: 13,
      name: "Sophie Williams",
      role: "Brand Strategist",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=SophieWilliams&backgroundColor=c9ffbf,b6e3f4,d1d4f9",
      quote: "The market insights help me advise clients on domain strategy. DNSWorth is invaluable."
    },
    {
      id: 14,
      name: "Raj Patel",
      role: "E-commerce Consultant",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=RajPatel&backgroundColor=ffd5dc,c9ffbf,ffdfbf",
      quote: "I recommend DNSWorth to all my e-commerce clients. It's changed how we approach domain decisions."
    },
    {
      id: 15,
      name: "Amanda Foster",
      role: "Digital Marketing Expert",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AmandaFoster&backgroundColor=b6e3f4,d1d4f9,c0aede",
      quote: "Fast, accurate, and free. DNSWorth has become an essential part of my marketing toolkit."
    },
    {
      id: 16,
      name: "Michael Chang",
      role: "Venture Capitalist",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=MichaelChang&backgroundColor=c9ffbf,ffdfbf,ffd5dc",
      quote: "I use DNSWorth to evaluate startup domain assets. The accuracy is impressive for a free tool."
    },
    {
      id: 17,
      name: "Isabella Silva",
      role: "Content Creator",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=IsabellaSilva&backgroundColor=d1d4f9,b6e3f4,c0aede",
      quote: "DNSWorth helps me understand the value of domains I mention in my content. Great resource!"
    },
    {
      id: 18,
      name: "Kevin O'Brien",
      role: "SEO Specialist",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=KevinOBrien&backgroundColor=ffdfbf,ffd5dc,c9ffbf",
      quote: "Domain valuation is crucial for SEO strategy. DNSWorth provides the insights I need instantly."
    },
    {
      id: 19,
      name: "Priya Sharma",
      role: "Business Analyst",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=PriyaSharma&backgroundColor=c9ffbf,b6e3f4,d1d4f9",
      quote: "The data-driven approach and market insights make DNSWorth perfect for business analysis."
    },
    {
      id: 20,
      name: "Thomas Anderson",
      role: "Tech Entrepreneur",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=ThomasAnderson&backgroundColor=ffd5dc,c9ffbf,ffdfbf",
      quote: "Building tech companies requires smart domain decisions. DNSWorth makes that process effortless."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary to-secondary/90 text-black overflow-hidden">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by Domain Enthusiasts
          </h2>
          
          <p className="text-xl text-black/90 leading-relaxed mb-8 max-w-3xl mx-auto">
            Join thousands of domain investors, entrepreneurs, and businesses who trust DNSWorth 
            for accurate, instant valuations that drive real business decisions.
          </p>
          

          
          {/* Rolling Testimonials Carousel */}
          <div className="relative">
            {/* First row of testimonials */}
            <div className="flex animate-scroll-left mb-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-shrink-0 mx-6 text-center group">
                  <div className="mx-auto mb-4 relative group">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Hover effect ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/20 transition-all duration-300"></div>
                      
                      {/* Name and title overlay on portrait */}
                      <div className="absolute inset-0 rounded-full bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-sm font-bold text-white text-center leading-tight mb-1 px-2">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs text-white/90 text-center leading-tight px-2">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-xs mx-auto">
                    <blockquote className="text-sm text-black/80 italic leading-relaxed group-hover:text-black transition-colors duration-300">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Second row of testimonials (offset for continuous flow) */}
            <div className="flex animate-scroll-left-reverse">
              {testimonials.slice(10).concat(testimonials.slice(0, 10)).map((testimonial, index) => (
                                 <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 mx-6 text-center group">
                   <div className="mx-auto mb-4 relative group">
                     <div className="relative">
                       <LocalAvatar 
                         name={testimonial.name}
                         className="group-hover:border-white/50 transition-all duration-300 shadow-lg group-hover:shadow-xl"
                       />
                       {/* Hover effect ring */}
                       <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/20 transition-all duration-300"></div>
                       
                       {/* Name and title overlay on portrait */}
                       <div className="absolute inset-0 rounded-full bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <h3 className="text-sm font-bold text-white text-center leading-tight mb-1 px-2">
                           {testimonial.name}
                         </h3>
                         <p className="text-xs text-white/90 text-center leading-tight px-2">
                           {testimonial.role}
                         </p>
                       </div>
                     </div>
                   </div>
                  <div className="max-w-xs mx-auto">
                    <blockquote className="text-sm text-black/80 italic leading-relaxed group-hover:text-black transition-colors duration-300">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-black/70">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-bold">50,000+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-bold">24/7 Available</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-bold">20+ Industries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWhyUs;
