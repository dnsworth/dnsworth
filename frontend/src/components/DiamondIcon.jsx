import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-regular-svg-icons';

const DiamondIcon = ({ className = "w-6 h-6", color = "text-gray-600" }) => {
  return (
    <FontAwesomeIcon 
      icon={faGem} 
      className={`${className} ${color}`}
    />
  );
};

export default DiamondIcon;
