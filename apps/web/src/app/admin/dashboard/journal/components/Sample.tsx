import React from 'react';
import JournalStockCard from './JournalStockCard'; // Adjust the import path as necessary

// Sample data for journal stock entries
const sampleJournalStocks = [
  {
    id: 1,
    product: 'BORDL CCTV',
    quantity: 50,
    type: 'Inbound',
    warehouse: 'Yogyakarta',
    totalQuantity: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    product: 'BORDL lampu',
    quantity: 30,
    type: 'Outbound',
    warehouse: 'Jakarta',
    totalQuantity: 70,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more journal stock objects as needed
];

const JournalStockList = () => {
  return (
    <div className="space-y-1">
      {sampleJournalStocks.map((journalStock) => (
        <JournalStockCard key={journalStock.id} journalStock={journalStock} />
      ))}
    </div>
  );
};

export default JournalStockList;
