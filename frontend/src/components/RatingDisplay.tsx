import React from 'react';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface RatingDisplayProps {
  rating: number;
  count: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  type?: 'buyer' | 'seller';
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  count,
  size = 'md',
  showCount = true,
  type
}) => {
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const isFilled = index < Math.floor(rating);
    const isHalf = index === Math.floor(rating) && rating % 1 !== 0;
    
    return (
      <span key={index} className="relative">
        {isFilled ? (
          <StarSolidIcon className={`
            ${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'}
            text-yellow-400
          `} />
        ) : (
          <StarOutlineIcon className={`
            ${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'}
            text-gray-300
          `} />
        )}
        {isHalf && (
          <StarSolidIcon className={`
            absolute inset-0 w-[50%] overflow-hidden text-yellow-400
            ${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'}
          `} />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">{stars}</div>
      {showCount && (
        <span className={`
          text-gray-600
          ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}
        `}>
          ({count} {type ? `${type} ${count === 1 ? 'review' : 'reviews'}` : 'reviews'})
        </span>
      )}
    </div>
  );
};

export default RatingDisplay;
