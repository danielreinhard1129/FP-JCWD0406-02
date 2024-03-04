// pages/products/components/AddToCartButton.tsx
import React, { useState } from 'react';

interface AddToCartButtonProps {
  productName: string;
  category: string;
  price: number; // Assuming price is a number representing the total price
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productName,
  category,
  price,
}) => {
  const [quantity, setQuantity] = useState(1);

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log('Added to cart', { productName, quantity, price: subtotal });
  };

  // Calculate subtotal based on quantity and price
  const subtotal = quantity * price;

  return (
    <div className="bg-white inset-x-0 sticky bottom-10 p-4 mt-8 rounded-xl shadow-lg flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-0">
          <div className="text-md text-gray-600 font-medium">{productName}</div>
          <div className="text-xs text-gray-500 uppercase">{category}</div>
        </div>
        <div className="item-center">
          <h6 className="text-xs">Stock</h6>
          <h6 className="text-sm">600</h6>
        </div>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={decrementQuantity}
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded"
          >
            -
          </button>
          <span className="font-semibold border md:px-12 px-4 py-2">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded"
          >
            +
          </button>
        </div>
        <div className="text-xs">
          x{' '}
          {price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </div>
        <div>
          <h3 className="text-xs ">Subtotal</h3>
          <span className="font-semibold">
            {subtotal.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default AddToCartButton;
