'use client';
import React from 'react';
import CourierSelector from './components/Courier';

const CheckoutPage = () => {
  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="flex flex-wrap md:flex-nowrap gap-10">
        {/* Left Side: Shipping Information, Shipping Method, Cart Items */}
        <div className="flex-1 space-y-6">
          {/* Shipping Address */}
          <section className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            {/* Shipping address content goes here */}
            <button className="text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded">
              Choose Other Address
            </button>
          </section>

          {/* Shipping Method */}
          <section className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Choose Courier</h2>
            <CourierSelector />
          </section>

          {/* Product from Cart */}
          <section className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">BORDL Official</h2>
            {/* Product content goes here */}
          </section>
        </div>

        {/* Right Side: Shipping Summary */}
        <div className="w-full md:w-96 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Summary</h2>
          {/* Shipping summary content goes here */}
          <div className="mb-4">
            <p>Total Price (1 product)</p>
            <p>Rp 599.000</p>
          </div>
          <div className="mb-4">
            <p>Total Shipping Fee</p>
            <p>Rp 8.000</p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold">Shipping Total</p>
            <p>Rp 607.000</p>
          </div>
          <button className="text-white bg-teal-500 hover:bg-teal-600 w-full py-3 rounded">
            Choose Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
