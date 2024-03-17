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

const ProductCard: React.FC<ProductCardProps> = ({ productsData }) => {
  // console.log('card all product', productsData);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {productsData.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg overflow-hidden shadow-sm"
        >
          <Link href={`/products/product/${product.id}`}>
            <div className="relative w-full h-48">
              <Image
                src={
                  product.productPhotos && product.productPhotos[0]
                    ? `${baseUrll}/photo-product/${product.productPhotos[0].photo_product}` // Adjusted path to match your folder structure
                    : '/default-product.webp'
                }
                alt={product.title}
                width={112} // Set desired width (in pixels)
                height={112} // Set desired height (in pixels)
                className="h-48 w-48 object-cover"
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
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
