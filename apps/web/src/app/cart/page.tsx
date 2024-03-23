'use client';
import React from 'react';
import CartPage from './components/CartPage';
import { NotLoginGuard } from '@/components/protected-route/components/NotLoginGuard';

const Cart = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <CartPage />
    </div>
  );
};

export default NotLoginGuard(Cart);
