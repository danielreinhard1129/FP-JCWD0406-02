'use client';
import React, { useState } from 'react';
import AddToCartButton from './AddToCartButton';

interface Category {
  id: number;
  category_name: string;
}

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number;
  Category: Category;
}

interface ProductDetailsProps {
  detailProduct: IProduct;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ detailProduct }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  console.log('product detail', detailProduct);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(detailProduct.price);

  return (
    <div className="space-y-3 bg-white p-4 rounded-lg ">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          {detailProduct.title}
        </h1>
        <div className="mt-2 text-sm font-medium uppercase text-gray-500">
          {detailProduct.Category.category_name}
        </div>
      </div>
      <div className="mt-4 text-2xl font-semibold text-red-600">
        {formattedPrice}
      </div>
      <div className="space-y-2">
        <h5 className="text-gray-900 font-semibold text-lg">Description</h5>
        <p className="mt-4 text-gray-600 overflow-hidden ">
          {isReadMore
            ? `${detailProduct.description.slice(0, 300)}...`
            : detailProduct.description}
          <span
            className="text-gray-300 cursor-pointer flex cols text-xs"
            onClick={toggleReadMore}
          >
            {isReadMore ? ' Read More' : ' Show Less'}
          </span>
        </p>
      </div>
      <div className="mt-4 text-xs text-gray-400 font-normal ">
        Weight: {detailProduct.weight} grams
      </div>
      <div className="-mx-4">
        <AddToCartButton
          productId={detailProduct.id}
          productName={detailProduct.title}
          category={detailProduct.Category.category_name}
          price={detailProduct.price}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
