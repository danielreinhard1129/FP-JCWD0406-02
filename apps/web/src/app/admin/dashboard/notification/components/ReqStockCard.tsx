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

interface ReqStockCardProps {
  reqStock: IReqStock;
}

const ReqStockCard: React.FC<ReqStockCardProps> = ({ reqStock }) => {
  console.log('check parse', reqStock);

  // Define a function or a mapping for human-readable status
  const getStatusLabel = (status: 'PENDING' | 'APPROVED' | 'DENIED') => {
    switch (status) {
      case 'PENDING':
        return 'Pending Approval';
      case 'APPROVED':
        return 'Approved';
      case 'DENIED':
        return 'Denied';
      default:
        return status;
    }
  };

  return (
    <div className="bg-amber-50 rounded-lg shadow px-4 py-3 border-l-4 border-teal-500 space-y-2">
      {/* Header indicating the nature of the card */}
      <div className="mb-3">
        <h2 className="text-md font-bold text-teal-700">Request Stock</h2>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold">{reqStock.product.title}</h3>
        <span
          className={`text-sm font-medium py-1 px-3 rounded-full ${
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

      <div className="grid grid-cols-2 gap-2">
        <p className="text-sm">
          Quantity: <span className="font-semibold">{reqStock.quantity}</span>
        </p>
        <p className="text-sm">
          Warehouse:{' '}
          <span className="font-semibold">{reqStock.warehouse.name}</span>
        </p>
        <p className="text-xs">
          Requested on:{' '}
          <span className="font-semibold">
            {new Date(reqStock.createdAt).toLocaleDateString()}
          </span>
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
