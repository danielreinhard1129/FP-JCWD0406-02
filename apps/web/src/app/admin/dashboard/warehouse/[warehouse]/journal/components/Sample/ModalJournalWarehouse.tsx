import React from 'react';

// Define the type for the journal entry
export interface JournalEntry {
  id: number;
  createdAt: string;
  quantity: number;
  totalQuantity: number;
  type: string;
}
interface Stock {
  id: number;
  quantity: number;
  totalQuantity: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface JournalModalProps {
  journals: JournalEntry[];
  isOpen: boolean;
  onClose: () => void;
}

const ModalJournalWarehouse: React.FC<JournalModalProps> = ({
  journals,
  isOpen,
  onClose,
}) => {
  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 items-center bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center">
      <div className="modal-content bg-white p-4 max-w-lg mx-auto my-10 rounded-lg shadow">
        <button
          onClick={onClose}
          className="close-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
        {journals.map((journal) => (
          <div className="journal-entry p-4 border-b" key={journal.id}>
            <p>Date: {new Date(journal.createdAt).toLocaleDateString()}</p>
            <p>Quantity: {journal.quantity}</p>
            <p>Total Quantity: {journal.totalQuantity}</p>
            <p>Type: {journal.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalJournalWarehouse;
