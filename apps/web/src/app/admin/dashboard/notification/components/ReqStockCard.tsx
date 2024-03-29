import { baseUrl } from '@/app/utils/database';
import axios from 'axios';
import React from 'react';
import { toast } from 'sonner';

interface IWarehouse {
  id: number;
  name: string;
}

interface IProduct {
  id: number;
  title: string;
}

interface IReqStock {
  id: number;
  warehouse: IWarehouse;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

const ReqStockCard: React.FC<{
  reqStock: IReqStock;
  fetchData: () => void;
}> = ({ reqStock, fetchData }) => {
  const handleAccept = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/warehouses/update-req-stock-status/${reqStock.id}`,
        {
          status: 'CONFIRM',
        },
      );
      fetchData();
      toast.success('Request approved');
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/warehouses/update-req-stock-status/${reqStock.id}`,
        {
          status: 'CANCELLED',
        },
      );
      fetchData();
      toast.error('Request denied');
    } catch (error) {}
  };
  return (
    <div className="bg-white rounded-lg shadow px-4 py-2 border-l-8 border-teal-500 space-y-2">
      <div className="flex justify-between">
        <div>
          <h2 className="text-md font-bold text-teal-700">Request Stock</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap">
        <p className="text-sm">
          Product:{' '}
          <span className="font-semibold">{reqStock.product.title}</span>
        </p>

        <p className="text-xs text-gray-400">
          Requested on:{' '}
          <span className="font-semibold">
            {new Date(reqStock.createdAt).toLocaleDateString()}
          </span>
        </p>
        <p className="text-sm">
          Quantity: <span className="font-semibold">{reqStock.quantity}</span>
        </p>
        <p className="text-xs text-gray-400">
          Last updated:{' '}
          <span className="font-semibold">
            {new Date(reqStock.updatedAt).toLocaleDateString()}
          </span>
        </p>
        <p className="text-sm">
          Warehouse:{' '}
          <span className="font-semibold">{reqStock.warehouse.name}</span>
        </p>
      </div>
    </div>
  );
};

export default ReqStockCard;
