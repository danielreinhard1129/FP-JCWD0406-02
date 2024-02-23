// pages/cart.tsx
'use client';
import React, { useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';

type CartItem = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  imageUrl: string;
};

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Smart Boklam BORDL 12W',
    price: 169000,
    originalPrice: 175000,
    quantity: 3,
    imageUrl: '/product/BOKLAMBRDL12W.png',
  },
  {
    id: 2,
    name: 'BORDL Indoor CCTV 355 MoveHead',
    price: 549000,
    originalPrice: 5900000,
    quantity: 1,
    imageUrl: '/product/CctvPtzBrdl.jpg',
  },
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const formatPrice = (price: number): string => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const handleQuantityChange = (id: number, delta: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + delta } : item,
    );
    setCartItems(updatedCartItems);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-[#008080] mb-6">Cart</h1>
        <div className="md:grid grid-cols-3 gap-8">
          {/* Product Cards - Left Side */}
          <div className="col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start p-4 rounded-lg shadow-md bg-white"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-24 w-24 object-cover mr-4"
                />
                <div className="flex-grow flex justify-between">
                  <div className="flex flex-col justify-between">
                    <h2 className="text-md font-semibold">{item.name}</h2>
                    <FaTrashCan className="h-4 w-4 text-[#008080]" />
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="text-xs text-gray-500 line-through">
                      {formatPrice(item.originalPrice)}
                    </p>
                    <p className="text-md font-bold text-[#008080]">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        className="px-2 text-sm border rounded text-[#008080] border-[#008080]"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        className="px-2 text-sm border rounded text-[#008080] border-[#008080]"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shopping Summary - Right Side */}
          <div className="col-span-1 mt-5 md:mt-0 bg-white p-5 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold text-[#008080] mb-4">
              Shopping Summary
            </h2>
            <p className="text-sm">
              Total items:{' '}
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </p>
            <p className="text-sm">Total payment: {formatPrice(totalPrice)}</p>
            <button className="w-full py-2 px-4 rounded-lg bg-[#008080] text-white font-medium mt-4">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
