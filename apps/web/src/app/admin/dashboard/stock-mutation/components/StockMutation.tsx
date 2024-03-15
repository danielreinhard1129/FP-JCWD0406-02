'use client';
import React, { useState } from 'react';
import { TbTransferIn } from 'react-icons/tb';
import WarehouseSelect from '../../warehouse/components/WarehouseSelect';
import ProductSelectAndQuantity from './ProductQuantity';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';

const StockMutation = () => {
  const [initialWarehouseId, setInitialWarehouseId] = useState<number | null>(
    null,
  );
  const [destinationWarehouseId, setDestinationWarehouseId] = useState<
    number | null
  >(null);
  const [productsWithQuantities, setProductsWithQuantities] = useState<
    { productId: number; quantity: number }[]
  >([
    {
      productId: 0,
      quantity: 1,
    },
  ]);

  const handleStockMutationSubmit = async () => {
    if (
      !initialWarehouseId ||
      !destinationWarehouseId ||
      productsWithQuantities.length === 0
    ) {
      toast.error('Please complete all fields before submitting.');
      return;
    }

    const mutationDetails = productsWithQuantities.map(
      ({ productId, quantity }) => ({
        productId,
        quantity,
      }),
    );

    try {
      const response = await axios.post(
        `${baseUrl}/warehouses/create-stock-mutation`,
        {
          initialWarehouseId,
          destinationWarehouseId,
          mutationDetails,
        },
      );
      toast.success('Stock mutation request sent successfully!');
      // Reset state or perform any other actions after successful submission
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg =
          error.response?.data.message ||
          'An error occurred while requesting stock mutation.';
        toast.error(errorMsg);
      }
    }
  };
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">STOCK MUTATION</h1>
        <p className="text-md text-gray-600">
          Manage and track stock movements between warehouses.
        </p>
      </header>
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-9  gap-4">
          {/* Section 1: Stock Mutation Form */}
          <div className="bg-white p-4 shadow rounded-lg text-center col-span-4">
            <h2 className="text-xl font-semibold">Initial Warehouse</h2>
            <p className="text-sm text-gray-600 mb-4">
              (Warehouse will <strong>send</strong> stock)
            </p>
            {/* Initial Warehouse Selector */}
            <div className="space-y-4 item">
              <WarehouseSelect onChange={setInitialWarehouseId} />
              <div>
                <ProductSelectAndQuantity
                //   productsWithQuantities={productsWithQuantities}
                //   setProductsWithQuantities={setProductsWithQuantities}
                />
              </div>
            </div>
          </div>
          {/* Icon indicating the transfer, placed in the center with a smaller column span */}
          <div className="flex justify-center items-center col-span-1">
            <TbTransferIn
              className="text-gray-400"
              style={{ fontSize: '60px' }}
            />
          </div>
          {/* Section 2: Stock Mutation History */}
          <div className="bg-white p-4 shadow rounded-lg text-center col-span-4">
            <h2 className="text-xl font-semibold">Destination Warehouse</h2>
            <p className="text-sm text-gray-600 mb-4 ">
              (Warehouse will <strong>receive</strong> stock)
            </p>
            {/* Destination Warehouse Selector */}
            <WarehouseSelect onChange={setDestinationWarehouseId} />
          </div>
        </div>
        {/* Action Button */}
        <div className="text-center mt-10">
          <button
            // onClick={handleStockMutationSubmit}
            className="bg-teal-500 hover:bg-teal-600 text-white font-normal py-2 px-4 rounded-xl"
          >
            Request Mutation
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockMutation;
