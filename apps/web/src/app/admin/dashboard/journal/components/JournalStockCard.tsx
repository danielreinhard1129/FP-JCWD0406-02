import React from 'react';

// Assuming "journalStock" is an object containing details about a single journal stock entry
const JournalStockCard = ({ journalStock }) => {
  return (
    <div className="bg-amber-100  rounded-lg overflow-hidden">
      <div className="px-6 pt-1 border-b border-gray-200">
        <h2 className="text-base font-bold text-teal-600">
          <h5 className="fas fa-archive mr-2"></h5>Journal Stock Detail
        </h2>
      </div>
      <div className="px-6 py-2">
        <div className="grid grid-cols-2 text-xs">
          <div className="text-gray-700">
            <strong>Product:</strong> {journalStock.product}
          </div>
          <div className="text-gray-700">
            <strong>Quantity:</strong> {journalStock.quantity}
          </div>
          <div className="text-gray-700">
            <strong>Warehouse:</strong> {journalStock.warehouse}
          </div>
          <div className="text-gray-700">
            <strong>Type:</strong> {journalStock.type}
          </div>
          <div className="col-span-2 text-gray-700">
            <strong>Total Quantity:</strong> {journalStock.totalQuantity}
          </div>
        </div>
      </div>
      <div className="px-6 pt-1 pb-2 border-t text-xs border-teal-200 bg-gray-200">
        <div className="text-gray-400 flex justify-between">
          <div>
            <strong>Created:</strong>{' '}
            {new Date(journalStock.createdAt).toLocaleString()}
          </div>
          <div>
            <strong>Updated:</strong>{' '}
            {new Date(journalStock.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalStockCard;
