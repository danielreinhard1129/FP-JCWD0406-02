// ProductCard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import { baseUrll } from '@/app/utils/database';

const ProductCardCheckout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  console.log('ini cartItem', cartItems);

  return (
    <>
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b pb-4 mb-4"
        >
          <div className="flex items-center">
            <Image
              src={
                item.Product.productPhotos &&
                item.Product.productPhotos.length > 0
                  ? `${baseUrll}/photo-product/${item.Product.productPhotos[0].photo_product}`
                  : '/default-product.webp'
              } // Use a default image if productPhotos is not available
              alt={item.Product.title}
              className=" object-cover mr-4"
              width={100}
              height={100}
            />
            <div className="ml-4">
              <p className="text-gray-700 font-semibold">
                {item.Product.title}
              </p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">
              Rp {item.Product.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCardCheckout;
