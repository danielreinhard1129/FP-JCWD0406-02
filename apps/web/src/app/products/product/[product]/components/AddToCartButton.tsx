import React, { useState, useContext } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import Link from 'next/link';
import { UserAuth } from '@/app/utils/context/authContext';

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  category: string;
  price: number;
  totalStock: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  productName,
  category,
  price,
  totalStock,
}) => {
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state: any) => state.user);
  const userId = user.id;
  const { userGoogle } = UserAuth();
  console.log(totalStock);

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddToCart = async () => {
    if (!user?.isVerified) {
      toast.error('You must be verified to add items to the cart.');
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/transactions/add-to-cart`, {
        userId,
        productId,
        quantity,
      });
      console.log(response.data);
      toast.success('Add to cart success');
    } catch (error) {
      toast.error('Failed add to cart');
      console.error('Error add to cart:', error);
    }
  };

  const subtotal = quantity * price;

  return (
    <div className="bg-white inset-x-0 p-4 md:mt-8 rounded-xl shadow-md flex flex-col space-y-4 transform transition-all hover:scale-105 duration-300">
      <div className="flex justify-between items-center">
        <div className="space-y-0">
          <div className="text-md text-gray-600 font-medium">{productName}</div>
          <div className="text-xs text-gray-500 uppercase">{category}</div>
        </div>
        <div className="item-center">
          <h6 className="text-xs text-gray-400">Stock</h6>
          <h6 className="text-xs  text-gray-400">{totalStock}</h6>
        </div>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={decrementQuantity}
            className="bg-gray-200 text-gray-600 text-sm md:text-base px-2 md:px-4 md:py-2 rounded-lg transform transition-all hover:scale-105 duration-300 "
          >
            -
          </button>
          <span className="font-semibold md:text-base text-xs border md:px-12 px-2 py-1">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="bg-gray-200 text-gray-600 text-sm md:text-base px-2 md:px-4 md:py-2 rounded-lg transform transition-all hover:scale-105 duration-300"
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
          <span className="font-semibold md:text-base text-sm">
            {subtotal.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </div>

      {userId || userGoogle ? (
        <button
          disabled={totalStock === 0 || !user?.isVerified}
          onClick={handleAddToCart}
          className={`w-full py-2 rounded-lg transform transition-all hover:scale-105 duration-300 ${
            totalStock === 0 || !user?.isVerified
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' // Change color to light grey when disabled
              : 'bg-teal-600 text-white'
          }`}
        >
          ADD TO CART
        </button>
      ) : (
        <button className="w-full py-2 bg-teal-600 rounded-lg transform transition-all hover:scale-105 duration-300">
          <Link
            href="/login"
            className="text-sm font-semibold leading-6 text-white"
          >
            LOGIN
          </Link>
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
