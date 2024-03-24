'use client';
import React, { useEffect } from 'react';
import CartPage from './components/CartPage';
import { NotLoginGuard } from '@/components/protected-route/components/NotLoginGuard';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const Cart = () => {
  const user = useSelector((state: RootState) => state.user);
  const userId = user.id;
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push('/');
    }
  });

  return (
    <div className="max-w-5xl mx-auto">
      <CartPage />
    </div>
  );
};

export default Cart;
