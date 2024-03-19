import React from 'react';

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
  // Function to handle accept action
  const handleAccept = () => {
    // Implement your logic to accept the stock mutation request
  };

  // Function to handle reject action
  const handleReject = () => {
    // Implement your logic to reject the stock mutation request
  };

  return (
    <div className="bg-amber-100 rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 duration-300 space-y-4 p-6">
      <div className="bg-teal-600 text-white p-3 rounded-t-xl">
        <h3 className="text-xl font-semibold">
          {mutation.destinationWarehouse?.name}
        </h3>
      </div>
      <ul className="divide-y divide-teal-200">
        {mutation.stockMutationDetail.map((detail) => (
          <li
            key={detail.id}
            className="py-2 flex justify-between items-center"
          >
            <span className="text-teal-700">{detail.Product.title}</span>
            <span className="font-medium text-teal-600">
              Qty: {detail.quantity}
            </span>
          </li>
        ))}
      </ul>
      <div className="text-sm">
        <p className="text-teal-700">
          Created: {new Date(mutation.createdAt).toLocaleString()}
        </p>
        <p className="text-teal-700">
          Updated: {new Date(mutation.updatedAt).toLocaleString()}
        </p>
        <p className="font-semibold text-teal-800">Status: {mutation.status}</p>
      </div>
      <div className="pt-4 flex justify-end gap-2">
        <button
          onClick={handleAccept}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-lg shadow transition-colors duration-200"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg shadow transition-colors duration-200"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default InitialWarehouseCard;
