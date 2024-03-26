// SummaryCard.tsx
import React, { useState } from 'react';
import JournalDetailsModal from './ModalJournalDetail';

interface ProductSummary {
  Product: any;
  journal: JournalDetail[];
  productId: number;
  title: string;
  currentStock: number;
  stockArrived: number;
  stockOut: number;
}

interface JournalDetail {
  id: number;
  quantity: number;
  type: string;
  totalQuantity: number;
  createdAt: string;
}
interface JournalEntry {
  product: ProductSummary;
  summary: ProductSummary[];
}

interface SummaryCardProps {
  journalStock: ProductSummary;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ journalStock }) => {
  const [showJournalDetails, setShowJournalDetails] = useState(false);
  const stockJournal = journalStock?.Product?.Stock?.[0]?.journal || [];

  const handleOpenJournalDetails = () => {
    setShowJournalDetails(true);
  };

  const handleCloseJournalDetails = () => {
    setShowJournalDetails(false);
  };
  return (
    <div className="flex flex-wrap items-center shadow-md rounded-lg">
      <div className=" bg-white rounded-2xl p-2 w-full max-w-lg">
        <div className="p-1 items-center">
          <h3 className="text-sm font-semibold text-center text-gray-700">
            {journalStock.title}
          </h3>
          <div className="mt-1 bg-amber-100 rounded-xl px-4 py-4">
            <p className="text-xs text-gray-600">
              SKU: {journalStock.productId}
            </p>
            <div className="flex justify-center flex-wrap gap-x-6 gap-y-4 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase text-gray-500 font-semibold">
                  Stock Arrived
                </span>
                <p className="text-sm text-teal-800">
                  {journalStock.stockArrived}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase text-red-800 font-semibold">
                  Stock Out
                </span>
                <p className="text-sm text-red-800">{journalStock.stockOut}</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase text-teal-500 font-bold">
                  Current Stock
                </span>
                <p className="text-lg text-teal-800 font-bold">
                  {journalStock.currentStock}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleOpenJournalDetails}
            className="mt-1 bg-teal-600 text-white text-xs font-medium rounded-lg w-full px-6 py-1 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            View Journal Details
          </button>
        </div>
      </div>
      <JournalDetailsModal
        journalDetails={stockJournal}
        isOpen={showJournalDetails}
        onClose={handleCloseJournalDetails}
      />
    </div>
  );
};

export default SummaryCard;
