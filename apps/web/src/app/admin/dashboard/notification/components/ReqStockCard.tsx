import React from 'react';

interface IWarehouse {
  id: number;
  name: string;
}

interface IProduct {
  id: number;
  name: string;
}

interface IReqStock {
  id: number;
  warehouse: IWarehouse;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  status: 'PENDING' | 'APPROVED' | 'DENIED';
}

const ReqStockCard: React.FC<{ reqStock: IReqStock }> = ({ reqStock }) => {
  // Utility function to convert status to readable format
  const getStatusLabel = (
    status: 'PENDING' | 'APPROVED' | 'DENIED',
  ): string => {
    const statusLabels: Record<typeof status, string> = {
      PENDING: 'Pending Approval',
      APPROVED: 'Approved',
      DENIED: 'Denied',
    };
    return statusLabels[status] || status;
  };

  return (
    <div className="bg-amber-50 rounded-lg shadow px-4 py-2 border-l-4 border-teal-500 space-y-2">
      <h2 className="text-md font-bold text-teal-700">Request Stock</h2>
      <div className="flex justify-between items-center">
        <span
          className={`text-xs font-medium px-3 rounded-full ${
            reqStock.status === 'APPROVED'
              ? 'bg-green-100 text-green-800'
              : reqStock.status === 'DENIED'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {getStatusLabel(reqStock.status)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <p className="text-sm">
          Quantity: <span className="font-semibold">{reqStock.quantity}</span>
        </p>
        <p className="text-xs">
          Requested on:{' '}
          <span className="font-semibold">
            {new Date(reqStock.createdAt).toLocaleDateString()}
          </span>
        </p>
        <p className="text-sm">
          Warehouse:{' '}
          <span className="font-semibold">{reqStock.warehouse.name}</span>
        </p>
        <p className="text-xs">
          Last updated:{' '}
          <span className="font-semibold">
            {new Date(reqStock.updatedAt).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ReqStockCard;
