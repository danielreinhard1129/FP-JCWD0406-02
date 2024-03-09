// ProductCard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Image from 'next/image';

const ProductCardCheckout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  return (
    <>
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b pb-4 mb-4"
        >
          <div className="flex items-center">
            <Image
              src={item.Product.imageUrl}
              alt={item.Product.title}
              width={80}
              height={80}
              className="rounded"
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
