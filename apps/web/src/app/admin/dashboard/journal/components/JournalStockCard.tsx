// JournalStockCard.tsx

import React from 'react';

interface Product {
  id: number;
  title: string;
}

interface Warehouse {
  name: string;
}

interface Stock {
  quantity: number;
  totalQuantity: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
  warehouse: Warehouse;
  Stock: Stock;
}

// Update the props interface to expect a single Stock object
interface JournalStockCardProps {
  journalStock: Stock;
}

export const JournalStockCard: React.FC<JournalStockCardProps> = ({
  journalStock,
}) => {
  // Destructure the necessary properties from journalStock

  return (
    <div className=" rounded-lg items-center overflow-hidden border">
      <div className=" grid grid-cols-2 px-6 py-1 items-center">
        <div className=" text-sm">
          <div className="text-gray-700">
            <strong>Product: </strong>
            {journalStock.Stock.product.title}
          </div>
          <div className="text-gray-700">
            <strong>Warehouse:</strong> {journalStock.Stock.warehouse.name}
          </div>
        </div>
        <div className="flex justify-between text-xs items-center ">
          <div>
            <div className="text-gray-700">
              <strong>Status: </strong> {journalStock.type}
            </div>
            <div className="text-gray-700">
              <strong>Adjustment: </strong> {journalStock.quantity}
            </div>
            <div className="col-span-2 text-gray-700">
              <strong>Remain Stock: </strong> {journalStock.totalQuantity}
            </div>
          </div>
          <div className="px-6 pb-1 text-xs flex-col items-center">
            <div className="text-gray-400 items-center ">
              <div>
                <strong>Created: </strong>{' '}
                {new Date(journalStock.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>Updated: </strong>{' '}
                {new Date(journalStock.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
