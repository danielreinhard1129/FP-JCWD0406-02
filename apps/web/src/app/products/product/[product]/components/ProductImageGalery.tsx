// ProductImageGallery.tsx
'use client';
import { baseUrll } from '@/app/utils/database';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface ProductPhoto {
  id: number;
  photo_product: string;
}

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number; // Add weight here
  stock: number;
  productPhotos: ProductPhoto[];
}

interface ProductImageGalleryProps {
  product: IProduct; // Changed to a single product
  altText: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  product,
  altText,
}) => {
  // Initialize selectedImage with the first image from the props
  const [selectedImage, setSelectedImage] = useState(
    product.productPhotos[0].photo_product,
  );

  // useEffect(() => {
  //   altText();
  // }, [selectedImage]);
  return (
    <div>
      {/* Main Image */}
      <div className="flex justify-center items-center mb-4">
        <Image
          src={`${baseUrll}/photo-product/${selectedImage}`}
          alt={altText}
          className="max-w-full h-auto rounded-lg shadow-lg transition duration-300 ease-in-out"
          height={400}
          width={400}
          quality={100}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center items-center space-x-2 overflow-x-auto">
        {product.productPhotos && product.productPhotos.length > 0 ? (
          product.productPhotos.map((photo, index) => (
            <Image
              key={photo.id}
              src={`${baseUrll}/photo-product/${photo.photo_product}`}
              alt={`${product.title} - Thumbnail ${index}`}
              className={`w-20 h-20 rounded-md shadow-md cursor-pointer ${
                selectedImage === photo.photo_product ? 'ring-teal-500' : ''
              }`}
              onClick={() => setSelectedImage(photo.photo_product)}
              width={100}
              height={100}
            />
          ))
        ) : (
          <Image
            src="/default-product.webp"
            alt={product.title}
            width={112}
            height={112}
            className="h-48 w-48 object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery;
