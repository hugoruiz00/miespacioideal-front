import { useState } from 'react';
import { API_URL } from '../../constants/constants';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export const ImageSlider = ({ images, property, className, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getClasses = () => {
    const baseClasses = 'relative w-full group';
    return `${baseClasses} ${className || ''}`;
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={getClasses()} {...props}>
      <div
        className="absolute inset-0 bg-center bg-contain blur-sm"
        style={{
          backgroundImage: `url(${API_URL}${images[currentIndex].image_url})`,
          filter: 'blur(20px)',
        }}
      ></div>

      <img
        className="relative rounded-md w-full h-80 object-contain"
        src={`${API_URL}${images[currentIndex].image_url}`}
        alt={property.property_type?.name}
      />

      <div className='relative text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <span className='text-gray-600 rounded-md px-2 font-bold'>
          {currentIndex+1} / {images.length}
        </span>
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-200 text-black p-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <IoIosArrowBack className='size-5' />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-200 text-black p-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <IoIosArrowForward className='size-5' />
      </button>
    </div>
  );
};

