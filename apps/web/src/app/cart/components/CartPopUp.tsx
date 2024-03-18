import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';
import { baseUrll } from '@/app/utils/database';

const CartHoverPopup = () => {
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const [showPopup, setShowPopup] = useState(false);

  console.log('ini di popup', cart);

  return (
    <div className="relative">
      {/* <div
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
        className="flex items-center cursor-pointer"
      >
        <FiShoppingCart className="h-6 w-6 text-gray-600" />
        {cart.length > 0 && (
          <span className="absolute -right-2 -top-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white">
            {cart.length}
          </span>
        )}
      </div> */}

      {showPopup && cart.length > 0 && (
        <div className="absolute right-0 z-10 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold border-b pb-2 mb-2">
            Total ({cart.length})
          </h3>
          <div className="max-h-64 overflow-auto">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <div className="w-12 h-12 relative">
                  <Image
                    src={
                      item.Product.productPhotos &&
                      item.Product.productPhotos.length > 0
                        ? `${baseUrll}/photo-product/${item.Product.productPhotos[0].photo_product}`
                        : '/default-product.webp'
                    }
                    alt={item.Product.title}
                    className=" object-cover mr-4"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {item.Product.title}
                  </span>

                  <span className="text-sm font-bold">
                    {/* {formatPrice(item.Product.price)} */}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold">Grand Total</span>
            <span className="text-lg font-bold">
              Rp{' '}
              {cart
                .reduce((acc, item) => acc + item.Product.price, 0)
                .toLocaleString()}
            </span>
          </div>
          <div className="text-center mt-4">
            <button className="bg-red-600 text-white rounded px-4 py-2">
              Buy ({cart.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartHoverPopup;
