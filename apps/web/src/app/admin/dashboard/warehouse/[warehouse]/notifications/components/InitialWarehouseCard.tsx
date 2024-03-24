import { baseUrl } from '@/app/utils/database';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { toast } from 'sonner';

interface IProductDetail {
  id: number;
  productId: number;
  quantity: number;
  Product: {
    id: number;
    title: string;
  };
}

interface IRequestWarehouse {
  id: number;
  name: string;
  city: string;
  contact: string;
}

interface IStockMutation {
  id: number;
  initialWarehouseId: number;
  destinationWarehouseId: number;
  createdAt: Date;
  updatedAt: Date;
  destinationWarehouse: IRequestWarehouse;
  status: string;
  stockMutationDetail: IProductDetail[];
}

interface InitialWarehouseCardProps {
  mutation: IStockMutation;
}

const InitialWarehouseCard: React.FC<InitialWarehouseCardProps> = ({
  mutation,
}) => {
  const handleAccept = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/warehouses/update-status-stock/${mutation.id}`,
        {
          status: 'CONFIRM',
        },
      );
      console.log('checlk responseee', response);

      toast.success('Stock movement has been Confirmed');
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(
        `${baseUrl}/warehouses/update-status-stock/${mutation.id}`,
        {
          status: 'CANCELLED',
        },
      );
      toast.error('Stock movement has been cancelled');
    } catch (error) {
      console.error('Error rejecting stock mutation:', error);
    }
  };

  return (
    <div className=" overflow-hidden shadow-sm space-y-1 border-l-8 border-teal-500 px-4 rounded-lg py-2">
      <h3 className="text-sm text-teal-600 font-normal">Request Stock from</h3>
      <div>
        <div className=" text-gray-900 flex justify-between">
          <h3 className="text-base font-semibold">
            {mutation.destinationWarehouse?.name}
          </h3>
          <div className="flex gap-2 text-xs">
            <button
              onClick={handleAccept}
              className="bg-teal-600 hover:bg-teal-700 text-white font-base px-4 py-1 rounded-lg shadow transition-colors duration-200"
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              className="bg-red-500 hover:bg-red-600 text-white font-base px-4 py-1 rounded-lg shadow transition-colors duration-200"
            >
              Reject
            </button>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 ">
          {mutation.stockMutationDetail.map((detail) => (
            <li key={detail.id} className="grid grid-cols-2 items-center ">
              <span className="text-gray-900 text-sm font-semibold ">
                {detail.Product.title}
              </span>
              <span className="font-bold text-xs text-gray-900">
                Qty: {detail.quantity}
              </span>
            </li>
          ))}
        </ul>
        <div className="text-xs flex justify-between border-t-2 pt-1">
          <p className="font-semibold text-teal-800">
            Status: {mutation.status}
          </p>
          <p className="text-gray-400">
            Created: {new Date(mutation.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-400">
            Updated: {new Date(mutation.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InitialWarehouseCard;
