// ProductImageGallery.tsx
'use client';
import { baseUrll } from '@/app/utils/database';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface ProductPhoto {
  id: number;
  photo_product: string;
}
interface Stock {
  totalStock: number;
}
interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number;
  Stock: Stock;
  productPhotos: ProductPhoto[];
}

interface ProductImageGalleryProps {
  product: IProduct;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  product,
}) => {
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (product.productPhotos && product.productPhotos.length > 0) {
      setSelectedImage(product.productPhotos[0].photo_product);
    } else {
      setSelectedImage('');
    }
  }, [product.productPhotos]);

  return (
    <div>
      {/* Main Image */}
      <div className="flex justify-center relative items-center mb-4 transform transition-all hover:scale-105 duration-300">
        <Image
          src={
            selectedImage
              ? `${baseUrll}/photo-product/${selectedImage}`
              : '/default-product.webp'
          }
          alt={product.title}
          className="max-w-full h-auto object-cover rounded-lg shadow-md transition duration-300 ease-in-out"
          priority
          width={500}
          height={500}
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
              className={` rounded-md shadow-md cursor-pointer transform transition-all hover:scale-105 duration-300 ${
                selectedImage === photo.photo_product
                  ? 'brightness-100'
                  : 'brightness-75 hover:brightness-100'
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
