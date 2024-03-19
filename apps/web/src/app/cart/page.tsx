'use client';
import React from 'react';
import CartPage from './components/CartPage';
// import CartHoverPopup from './components/CartPopUp';

const Cart = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <CartPage />
      {/* <CartHoverPopup /> */}
    </div>
  );
};

export default Cart;
