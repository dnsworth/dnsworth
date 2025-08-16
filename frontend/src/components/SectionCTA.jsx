const SectionCTA = ({ onSearch }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Domains Deserve the Right Price
          </h2>
          
          <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            Find out their worth today and make informed decisions about your digital assets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onSearch('')}
              className="btn-secondary text-lg px-8 py-4 bg-white text-secondary hover:bg-gray-100"
            >
              Start Now
            </button>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-secondary text-lg px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary"
            >
              Learn More
            </button>
          </div>
          
          <p className="text-white/70 text-sm mt-6">
            Join thousands of domain investors who trust DNSWorth for accurate valuations
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionCTA;
