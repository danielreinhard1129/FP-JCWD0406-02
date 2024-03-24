import React from 'react';

interface Product {
  categoryId: number;
  created_at: string;
  description: string;
  id: number;
  isDeleted: boolean;
  price: number;
  title: string;
  updatedAt: string;
  weight: number;
}

interface RequestStock {
  createdAt: string;
  id: number;
  product: Product;
  productId: number;
  quantity: number;
  status: string;
  updatedAt: string;
  warehouseId: number;
}

// Component Props
interface RequestStockCardProps {
  data: RequestStock;
}

const CardReqStockStatusDestination: React.FC<RequestStockCardProps> = ({
  data,
}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'CONFIRM':
        return 'text-teal-600'; // Teal color for confirmed
      case 'PENDING':
        return 'text-yellow-500'; // Yellow color for pending
      case 'CANCELLED':
        return 'text-red-500'; // Red color for cancelled
      default:
        return 'text-gray-800'; // Default color
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-8 border-teal-600">
      <div className="flex justify-between">
        <h3 className="text-sm font-bold mb-1">Request Stock Status</h3>
        <h3
          className={`text-lg font-bold mb-1 ${getStatusColorClass(
            data.status,
          )}`}
        >
          {data.status}
        </h3>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-semibold">{data.product.title}</p>
          <p className="text-xs text-gray-600">Quantity: {data.quantity}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">
            Requested on: {formatDate(data.createdAt)}
          </p>
          <p className="text-xs text-gray-500">
            Last updated: {formatDate(data.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardReqStockStatusDestination;
