// pages/cart.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation'; // Import useRouter
import { baseUrl, baseUrll } from '@/app/utils/database';
import Image from 'next/image';
import axios from 'axios';
import {
  removeCartItem,
  setCartItems,
  updateCartItemQuantity,
} from '@/lib/features/cartSlice';

export interface ProductPhoto {
  id: number;
  photo_product: string;
}
interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  Product: {
    title: string;
    price: number;
    weight: number;
    productPhotos: ProductPhoto[];
  };
}

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const router = useRouter();
  const dispatch = useDispatch();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/transactions/update-cart/${cartItemId}`,
        { quantity: newQuantity },
      );

      if (response.status === 200) {
        if (newQuantity === 0) {
          // Remove the item from the cart if the quantity is 0
          dispatch(removeCartItem(cartItemId));
        } else {
          const updatedCartItem = response.data.data;

          dispatch(
            updateCartItemQuantity({ cartItemId, quantity: newQuantity }),
          );
          // dispatch(setCartItems(response.data.data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProceedToCheckout = () => {
    router.push('/checkout'); // Use the router to navigate to the checkout page
  };

  const handleQuantityChange = (cartItemId: number, change: number) => {
    // Find the item in the cart
    const item = cartItems.find((item) => item.id === cartItemId);
    if (item) {
      // Calculate the new quantity
      const newQuantity = item.quantity + change;

      updateQuantity(cartItemId, newQuantity);
    }
  };

  const totalPrice = cartItems?.reduce(
    (total: number, item: CartItem) =>
      total + item.Product.price * item.quantity,
    0,
  );
  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-teal-600 mb-6">Cart</h1>
        <div className="md:grid grid-cols-3 gap-8">
          {/* Product Cards - Left Side */}
          <div className="col-span-2 space-y-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start p-2 rounded-lg shadow-md bg-white"
              >
                <div className="relative w-[80px] h-[80px] mr-5">
                  <Image
                    src={
                      item.Product.productPhotos &&
                      item.Product.productPhotos.length > 0
                        ? `${baseUrll}/photo-product/${item.Product.productPhotos[0].photo_product}`
                        : '/default-product.webp'
                    }
                    alt={item.Product.title}
                    className=" object-cover mr-4"
                    fill
                  />
                </div>
                <div className="flex-grow flex justify-between">
                  <div className="flex flex-col justify-between">
                    <h2 className="text-base font-semibold">
                      {item.Product.title}
                    </h2>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="text-md font-bold text-[#008080]">
                      {formatPrice(item.Product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        className="px-2 text-sm border rounded text-[#008080] border-[#008080]"
                        onClick={() => handleQuantityChange(item.id, -1)}
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
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-2 px-4 rounded-lg bg-[#008080] text-white font-medium mt-4"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
