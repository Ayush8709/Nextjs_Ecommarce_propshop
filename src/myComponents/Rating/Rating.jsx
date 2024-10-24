import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color }) => {
  return (
    <div className='flex items-center'>
      <span className='flex'>
        {[1, 2, 3, 4, 5].map(starValue => {
          if (value >= starValue) {
            return <FaStar key={starValue} style={{ color }} />;
          } else if (value >= starValue - 0.5) {
            return <FaStarHalfAlt key={starValue} style={{ color }} />;
          } else {
            return <FaRegStar key={starValue} style={{ color }} />;
          }
        })}
      </span>
      {text && <span className='ml-2 text-gray-700'>{text}</span>}
    </div>
  );
};

export default Rating;
