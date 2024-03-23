'use client';
import { baseUrl, baseUrll } from '@/app/utils/database';
import { IProduct } from '@/types/warehouse.types';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface IOrderDetail {
  productId: number;
  quantity: number;
  Product: {
    title: string;
    price: number;
  };
}

interface IOrder {
  id: number;
  uuid: string;
  TransactionStatus: string;
  Warehouse: {
    name: string;
    city: string;
  };
  shippingCost: number;
  totalPrice: number;
  transactionDetails: IOrderDetail[];
  paymentImg?: string;
}

const OrderCard: React.FC<{
  order: IOrder;
  fetchData: () => Promise<void>;
}> = ({ order, fetchData }) => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productDisplay = showAllProducts
    ? order.transactionDetails
    : [order.transactionDetails[0]];
  const [updateStatus, setUpdateStatus] = useState();

  const handleConfirmTransaction = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/transactions/update-status/${order.id}`,
        {
          TransactionStatus: 'ORDER_CONFIRMED',
        },
      );
      fetchData();
      toast.success('Order Accepted');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelledTransaction = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/transactions/update-status/${order.id}`,
        {
          TransactionStatus: 'CANCELLED',
        },
      );
      fetchData();
      toast.error('Order Decline');
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowAllProducts = () => {
    setShowAllProducts(!showAllProducts);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-wrap items-start gap-2">
      <div className="bg-white rounded-lg shadow-lg p-3 w-full max-w-6xl  border-l-8 border-teal-500">
        {productDisplay.map((detail, index) => (
          <div key={index} className="flex justify-between items-start mb-1">
            <div className="flex items-center">
              <div className="ml-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  {detail.Product.title}
                </h3>
                <p className="text-xs text-teal-600">
                  {detail.quantity} x Rp {detail.Product.price.toLocaleString()}
                </p>
              </div>
            </div>
            {index === 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleCancelledTransaction()}
                  className="text-xs rounded-xl bg-red-500 hover:bg-red-600 text-white font-base py-1 px-3"
                >
                  Denied
                </button>
                <button
                  onClick={() => handleConfirmTransaction()}
                  className="text-xs rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1 px-4"
                >
                  Accept
                </button>
              </div>
            )}
          </div>
        ))}
        {order.transactionDetails.length > 1 && (
          <div className="text-start pl-10">
            <button
              onClick={toggleShowAllProducts}
              className="text-xs rounded-xl hover:bg-white text-red-500 font-light"
            >
              {showAllProducts ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
        <div className="grid grid-cols-8 items-center mt-2">
          <div>
            <p className="text-xs font-semibold text-gray-800">Total Payment</p>
            <p className="text-sm font-bold text-teal-600">
              {order.totalPrice.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm text-gray-400">Buyer Address</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-sm text-gray-700">{order.TransactionStatus}</p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500">Transaction Code</p>
            <p className="text-sm text-gray-700">{order.uuid}</p>
          </div>
          <div>
            <button
              onClick={openModal}
              className="bg-transparent text-xs hover:bg-gray-400 text-gray-300 font-normal py-1 px-2 rounded-xl cursor-pointer"
            >
              Payment Photo
            </button>
          </div>
        </div>
      </div>
      {/* Payment photo section */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <Image
              src={
                order.paymentImg
                  ? `${baseUrll}/payment-proof/${order.paymentImg}`
                  : '/default-payment.jpeg'
              }
              alt="Payment Proof"
              className="max-h-screen max-w-screen object-contain"
              width={100}
              height={100}
            />
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 text-2xl leading-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
