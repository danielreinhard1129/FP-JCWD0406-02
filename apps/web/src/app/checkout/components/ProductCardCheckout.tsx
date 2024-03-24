// ProductCard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import { baseUrll } from '@/app/utils/database';

const ProductCardCheckout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  return (
    <>
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-t pb-1 mb-2"
        >
          <div className="flex items-center">
            <div className=" relative w-[40px] h-[40px]">
              <Image
                src={
                  item.Product.productPhotos &&
                  item.Product.productPhotos.length > 0
                    ? `${baseUrll}/photo-product/${item.Product.productPhotos[0].photo_product}`
                    : '/default-product.webp'
                } // Use a default image if productPhotos is not available
                alt={item.Product.title}
                className=" object-cover mr-4"
                fill
              />
            </div>
            <div className="ml-4">
              <p className="text-gray-700 text-xs font-semibold">
                {item.Product.title}
              </p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-900 text-xs font-semibold">
              Rp {item.Product.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCardCheckout;
