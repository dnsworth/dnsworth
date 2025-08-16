import { useState } from 'react';

const Avatar = ({ src, name, size = 'w-24 h-24', className = '' }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  // Generate a fallback comic avatar if the main image fails
  const generateFallbackAvatar = () => {
    const fallbackUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`;
    return fallbackUrl;
  };

  if (imageError || !src) {
    return (
      <img
        src={generateFallbackAvatar()}
        alt={name}
        className={`${size} rounded-full border-2 border-white/30 object-cover ${className}`}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className={`${size} rounded-full border-2 border-white/30 object-cover ${className}`}
      onError={handleImageError}
    />
  );
};

export default Avatar;
