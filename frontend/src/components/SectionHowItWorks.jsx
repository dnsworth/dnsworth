const SectionHowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Type your domain",
      description: "Enter the domain name you want to value in the search bar.",
      icon: "🔍"
    },
    {
      number: "2",
      title: "Click 'Search'",
      description: "Hit the search button to get instant results.",
      icon: "🚀"
    },
    {
      number: "3",
      title: "See your valuation",
      description: "Get comprehensive valuation data in seconds.",
      icon: "📊"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting your domain's value has never been easier. Just three simple steps to discover your domain's true worth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Step Number */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-2xl font-bold text-white">
                {step.number}
              </div>
              
              {/* Step Icon */}
              <div className="w-12 h-12 mx-auto mb-4 text-3xl">
                {step.icon}
              </div>
              
              {/* Step Title */}
              <h3 className="text-xl font-bold text-secondary mb-3">
                {step.title}
              </h3>
              
              {/* Step Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
              
              {/* Connector Line (except for last step) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/30 transform -translate-y-1/2 z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionHowItWorks;
