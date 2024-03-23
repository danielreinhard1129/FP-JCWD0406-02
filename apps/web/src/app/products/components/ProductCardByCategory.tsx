// components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { baseUrll } from '@/app/utils/database';

export interface Category {
  id: number;
  category_name: string;
}
export interface ProductPhoto {
  id: number;
  photo_product: string;
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
  quantity: number;
  product: IProduct;
  totalQuantity: number;
}
const ProductCardByCategory: React.FC<{ product: IProduct }> = ({
  product,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden pb-1 ">
      <Link href={`/products/product/${product.id}`}>
        <div className="">
          <div className="relative flex justify-center items-center">
            <Image
              src={
                product.productPhotos && product.productPhotos[0]
                  ? `${baseUrll}/photo-product/${product.productPhotos[0].photo_product}`
                  : '/default-product.webp'
              }
              alt={product.title}
              objectFit="cover"
              quality={100}
              width={500}
              height={500}
            />
          </div>
          <div className="px-4 py-2 space-y-2">
            <p className="text-xs font-light text-gray-500">
              {product.Category.category_name}
            </p>
            <h3 className="md:text-sm text-xs text-gray-700 font-medium hover:underline">
              {product.title}
            </h3>
            <p className="md:text-md sm:text-xs font-semibold text-gray-900">
              Rp {product.price.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardByCategory;
