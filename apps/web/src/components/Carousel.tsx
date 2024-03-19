'use client';
import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';

const images: string[] = [
  '/promo/bannerbrdl4.jpg',
  '/promo/bannerbrdl2.jpg',
  '/promo/bannerbrdl3.jpg',
];

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const nextSlide = useCallback((): void => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  }, [current]);

  const prevSlide = (): void => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 3000);
    return () => clearTimeout(timer);
  }, [nextSlide]);

  const buttonStyle = {
    opacity: isHovering ? 1 : 0,
    transition: 'opacity 300ms ease-in-out',
  };

  return (
    <section className="max-h-screen h-fit my-12 sm:my-12 md:my-32 lg:my-40">
      <div
        className="relative flex justify-center items-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {images.map((src, index) => (
          <div
            className={`absolute w-full transition-opacity duration-500 ease-in-out rounded-3xl ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
            key={index}
          >
            {index === current && (
              <Image
                src={src}
                alt={`Slide ${index}`}
                className="w-full object-cover"
                width={501}
                height={501}
                quality={100}
                priority
              />
            )}
          </div>
        ))}
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white text-3xl p-2"
          style={{ ...buttonStyle }}
          onClick={prevSlide}
        >
          &#10094;
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white text-3xl p-2"
          style={{ ...buttonStyle }}
          onClick={nextSlide}
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default Carousel;
