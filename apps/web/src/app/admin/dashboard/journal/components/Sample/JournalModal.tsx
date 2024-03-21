// // JournalModal.tsx
// import React from 'react';
// import { IJournalEntry } from './types';

// interface JournalModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   journals: IJournalEntry[];
// }

// const JournalModal: React.FC<JournalModalProps> = ({
//   isOpen,
//   onClose,
//   journals,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
//       <div className="modal-content bg-white p-4 max-w-lg mx-auto my-10 rounded-lg">
//         <button
//           onClick={onClose}
//           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Close
//         </button>
//         {journals.map((journal) => (
//           <div key={journal.id}>
//             {journal.journal.map((entry) => (
//               <div key={entry.id} className="journal-entry p-4 border-b">
//                 <p>Date: {new Date(entry.createdAt).toLocaleDateString()}</p>
//                 <p>Quantity: {entry.quantity}</p>
//                 <p>Type: {entry.type}</p>
//                 <p>Total Quantity: {entry.totalQuantity}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JournalModal;
