'use client';
import React from 'react';
import CartPage from './components/CartPage';
import HeaderCart from './components/HeaderCart';
// import CartHoverPopup from './components/CartPopUp';

const Cart = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <CartPage />
      {/* <CartHoverPopup /> */}
    </div>
  );
};

export default Cart;
