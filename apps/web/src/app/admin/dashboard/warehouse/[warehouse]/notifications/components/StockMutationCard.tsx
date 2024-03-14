import React from 'react';

// Replace this with the actual types you use for the data
interface StockMutation {
  id: number;
  initialWarehouse: { name: string; id: number };
  destinationWarehouse: { name: string; id: number };
  createdAt: string;
  updatedAt: string;
  status: string; // Assuming status is a string like 'Pending', 'Approved'
  stockMutationDetail: Array<{
    productId: number;
    quantity: number;
    product: { name: string };
  }>;
}

interface StockMutationCardProps {
  mutation: StockMutation;
  onApproveMutation: (mutationId: number) => void;
}

const StockMutationCard: React.FC<StockMutationCardProps> = ({
  mutation,
  onApproveMutation,
}) => {
  const handleApproveMutation = () => {
    onApproveMutation(mutation.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 m-4 border-l-4 border-teal-500 space-y-4">
      <h3 className="text-lg font-bold">Stock Mutation Request</h3>
      <div>
        <p>From: {mutation.initialWarehouse.name}</p>
        <p>To: {mutation.destinationWarehouse.name}</p>
        <p>Requested on: {new Date(mutation.createdAt).toLocaleDateString()}</p>
        <p>Last updated: {new Date(mutation.updatedAt).toLocaleDateString()}</p>
        <p>Status: {mutation.status}</p>
      </div>
      <div>
        <h4 className="font-semibold">Items:</h4>
        {mutation.stockMutationDetail.map((detail, index) => (
          <p key={index}>
            {detail.product.name} - Quantity: {detail.quantity}
          </p>
        ))}
      </div>
      <button
        onClick={handleApproveMutation}
        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg"
        disabled={mutation.status !== 'Pending'}
      >
        Approve
      </button>
    </div>
  );
};

export default StockMutationCard;
