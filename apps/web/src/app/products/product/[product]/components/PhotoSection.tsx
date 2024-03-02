// ProductImageGallery.tsx
'use client';
import React, { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[]; // Array of image URLs
  altText: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  altText,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      {/* Main Image */}
      <div className="flex justify-center items-center mb-4">
        <img
          src={selectedImage}
          alt={altText}
          className="max-w-full h-auto rounded-lg shadow-lg transition duration-300 ease-in-out"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center items-center space-x-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${altText} - Thumbnail ${index}`}
            className={`w-20 h-20 rounded-md shadow-md cursor-pointer ${
              selectedImage === image ? 'ring-2 ring-red-500' : ''
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
