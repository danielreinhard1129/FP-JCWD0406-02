// ProductCard.tsx
import React from 'react';
import Link from 'next/link';
import { IStock } from '@/types/warehouse.types';
import Image from 'next/image';
import { baseUrll } from '@/app/utils/database';

export interface ProductPhoto {
  id: number;
  photo_product: string;
}

export interface Category {
  id: number;
  category_name: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  productPhotos: ProductPhoto[];
  Category: Category;
  weight: number;
  stock: number;
  isActive: boolean;
  Stock: IStock[];
  quantity: number;
  product: IProduct;
  totalQuantity: number;
}

interface ProductCardProps {
  productsData: IProduct[];
}

const AllProductCard: React.FC<ProductCardProps> = ({ productsData }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {productsData.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg overflow-hidden shadow-sm transform transition-all hover:scale-105 duration-300"
        >
          <Link href={`/products/product/${product.id}`}>
            <div>
              <div className="relative flex justify-center items-center w-full h-[200px]">
                <Image
                  src={
                    product.productPhotos && product.productPhotos[0]
                      ? `${baseUrll}/photo-product/${product.productPhotos[0].photo_product}` // Adjusted path to match your folder structure
                      : '/default-product.webp'
                  }
                  alt={product.title}
                  layout="fill" // Use 'fill' layout for responsive image scaling
                  objectFit="contain" // Ensure the image scales while maintaining its aspect ratio without cropping
                  quality={100}
                />
              </div>
              <div className="px-4 py-2 space-y-2">
                {/* Displaying category name */}
                <p className="text-xs font-light text-gray-500">
                  {product.Category.category_name}
                </p>
                <h3 className="text-sm text-gray-700 font-medium hover:underline">
                  {product.title}
                </h3>
                <p className="text-md font-semibold text-gray-900">
                  Rp {product.price.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllProductCard;
