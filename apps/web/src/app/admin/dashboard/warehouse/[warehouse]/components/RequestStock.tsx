import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { baseUrl } from '@/app/utils/database';

interface RequestStockModalProps {
  productId: number;
  warehouseId: number;
  onClose: () => void;
  onRequestStockSuccess: () => void;
}

const RequestStockModal: React.FC<RequestStockModalProps> = ({
  productId,
  warehouseId,
  onClose,
  onRequestStockSuccess,
}) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/warehouses/req-stock`, {
        productId,
        warehouseId,
        quantity,
      });
      toast.success(response.data.message);
      onRequestStockSuccess();
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      style={{ backdropFilter: 'blur(3px)' }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <h2 className="text-xl flex gap-2 font-bold text-gray-800 items-center mb-2">
          Request Stock{' '}
          <h2 className="font-normal text-sm ">(from Other Warehouse)</h2>
        </h2>
        <h5 className="text-xs font-normal mb-4 text-gray-800">
          This request will be sent and needs to be approved by the Super Admin.
          Put the quantity correctly
        </h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-gray-700 text-sm font-semibold mb-1"
            >
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter quantity to request"
              min="1"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-teal-700 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-teal-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-teal-900"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestStockModal;
