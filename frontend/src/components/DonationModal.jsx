import { useState, useEffect } from 'react';

const DonationModal = ({ isOpen, onClose, onDonate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleDonate = () => {
    onDonate();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white border-2 border-gray-200 rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Heart Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">❤️</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-black mb-3">
            Love DNSWorth?
          </h3>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Help us keep this powerful tool free and accessible to everyone. Your support ensures we can continue providing instant, accurate domain valuations.
          </p>

          {/* Action Button */}
          <div className="mt-6">
            <button
              onClick={handleDonate}
              className="w-full bg-black text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Support DNSWorth ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
