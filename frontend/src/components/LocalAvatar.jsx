import React from 'react';

const LocalAvatar = ({ name, size = 'w-24 h-24', className = '', colors = ['#b6e3f4', '#c0aede', '#d1d4f9'] }) => {
  // Generate consistent colors based on name
  const getColors = () => {
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const colorPalettes = [
      ['#b6e3f4', '#c0aede', '#d1d4f9'], // Blue theme
      ['#ffdfbf', '#ffd5dc', '#c9ffbf'], // Warm theme
      ['#d4f4dd', '#ffd5dc', '#ffdfbf'], // Green theme
      ['#c0aede', '#b6e3f4', '#d1d4f9'], // Purple theme
      ['#c9ffbf', '#ffdfbf', '#ffd5dc'], // Mint theme
      ['#ffa726', '#ff7043', '#8e24aa'], // Orange theme
      ['#a8e6cf', '#dcedc1', '#ffd3b6'], // Pastel theme
      ['#ff9ff3', '#f368e0', '#54a0ff'], // Pink theme
    ];
    
    return colorPalettes[Math.abs(hash) % colorPalettes.length];
  };

  const avatarColors = getColors();
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className={`${size} ${className} rounded-full border-2 border-white/30 flex items-center justify-center text-white font-bold text-lg shadow-xl`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="rounded-full"
      >
        {/* Background circle */}
        <circle cx="50" cy="50" r="50" fill={avatarColors[0]} />
        
        {/* Decorative elements */}
        <circle cx="30" cy="35" r="8" fill={avatarColors[1]} opacity="0.7" />
        <circle cx="70" cy="35" r="6" fill={avatarColors[2]} opacity="0.8" />
        <circle cx="25" cy="70" r="5" fill={avatarColors[1]} opacity="0.6" />
        <circle cx="75" cy="70" r="7" fill={avatarColors[2]} opacity="0.7" />
        
        {/* Central initials circle */}
        <circle cx="50" cy="50" r="25" fill={avatarColors[1]} />
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
};

export default LocalAvatar;
