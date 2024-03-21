// // JournalSummary.tsx
// import React from 'react';
// import { ISummary } from './types';

// interface JournalSummaryProps {
//   summary: ISummary[];
//   onShowJournal: (productId: number) => void;
// }

// const JournalSummary: React.FC<JournalSummaryProps> = ({
//   summary,
//   onShowJournal,
// }) => {
//   return (
//     <div className="space-y-4">
//       {summary.map((item) => (
//         <div
//           className="card bg-white shadow-md p-4 rounded-lg"
//           key={item.product.id}
//         >
//           <h3 className="text-lg font-bold">{item.product.title}</h3>
//           <div className="text-sm">
//             <p>Stock Arrived: {item.stockArrived}</p>
//             <p>Stock Out: {item.stockOut}</p>
//             <p>Current Stock: {item.currentStock}</p>
//           </div>
//           <button
//             onClick={() => onShowJournal(item.product.id)}
//             className="mt-3 text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//           >
//             Show Journal
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default JournalSummary;
