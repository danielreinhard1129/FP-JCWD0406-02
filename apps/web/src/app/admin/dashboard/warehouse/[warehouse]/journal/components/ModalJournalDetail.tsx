// JournalDetailsModal.tsx
import React from 'react';

interface JournalDetail {
  id: number;
  quantity: number;
  type: string;
  totalQuantity: number;
  createdAt: string;
}

interface JournalDetailsModalProps {
  journalDetails: JournalDetail[];
  isOpen: boolean;
  onClose: () => void;
}

const JournalDetailsModal: React.FC<JournalDetailsModalProps> = ({
  journalDetails,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-2 border w-4/6 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Journal Details
          </h3>
          <div className="mt-2 px-7 py-3 text-xs">
            {journalDetails.map((detail) => (
              <div key={detail.id} className="text-sm text-gray-500">
                <span>
                  There is <strong>{detail.type} </strong>
                  <span> with </span>
                </span>
                <span>
                  quantity of <strong>{detail.quantity}</strong>
                </span>

                <p>
                  Current quantity <strong> {detail.totalQuantity}</strong>
                </p>
                <p className="text-xs text-gray-300">
                  Created : {new Date(detail.createdAt).toLocaleString()}
                </p>
                <hr className="my-1" />
              </div>
            ))}
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-1 bg-gray-400 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalDetailsModal;
