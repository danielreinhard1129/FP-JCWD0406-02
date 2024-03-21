// // components/JournalSummaryCard.tsx
// import React from 'react';

// export interface ProductDetail {
//   id: number;
//   title: string;
// }

// export interface SummaryItem {
//   currentStock: number;
//   product: ProductDetail;
//   stockArrived: number;
//   stockOut: number;
// }

// export interface JournalSummaryProps {
//   summary: SummaryItem[];
//   onShowJournal: (productId: number) => void;
// }

// const SummaryJournalCard: React.FC<JournalSummaryProps> = ({
//   summary,
//   onShowJournal,
// }) => {
//   return (
//     <div>
//       {summary.map((item: SummaryItem, index: number) => (
//         <div
//           key={item.product.id}
//           className="bg-white shadow rounded-lg p-4 mb-4"
//         >
//           <h3 className="text-lg font-semibold">{item.product.title}</h3>
//           <p className="text-sm text-gray-600">
//             Stock Arrived: {item.stockArrived}
//           </p>
//           <p className="text-sm text-gray-600">Stock Out: {item.stockOut}</p>
//           <p className="text-sm text-gray-600">
//             Current Stock: {item.currentStock}
//           </p>
//           <button
//             onClick={() => onShowJournal(item.product.id)}
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Show Journal
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SummaryJournalCard;
