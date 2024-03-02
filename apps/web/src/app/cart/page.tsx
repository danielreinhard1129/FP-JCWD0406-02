'use client';
import React from 'react';
import CartPage from './components/CartPage';
import isAuth from '@/components/isAuth';

const Cart = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <CartPage />
    </div>
  );
};

export default Cart;
