'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '@/lib/store';
import { setCartItems } from '@/lib/features/cartSlice';
import { baseUrl } from '../utils/database';
import CartPage from './components/CartPage';

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  Product: {
    title: string;
    price: number;
    imageUrl: string;
  };
}

interface CartProps {
  cartItems: CartItem[];
}

const Cart = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/transactions/cart/${userId}`,
        );

        dispatch(setCartItems(response.data.data));
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    if (userId) {
      fetchCartItems();
    }
  }, [userId, dispatch]);

  return (
    <div className="max-w-7xl mx-auto">
      <CartPage />
    </div>
  );
};

export default Cart;
