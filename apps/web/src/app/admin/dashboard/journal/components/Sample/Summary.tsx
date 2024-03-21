// // components/JournalSummaryCard.tsx
// import React from 'react';
// // types/JournalSummary.ts
// export interface ProductDetail {
//   id: number;
//   title: string;
//   // Include other product detail fields if necessary
// }

// export interface SummaryItem {
//   product: ProductDetail;
//   stockArrived: number;
//   stockOut: number;
//   currentStock: number;
// }

// export interface JournalSummaryProps {
//   summary: SummaryItem[];
//   onShowJournal: (productId: number) => void;
// }

// const JournalSummaryCard: React.FC<JournalSummaryProps> = ({
//   summary,
//   onShowJournal,
// }) => {
//   console.log('summary bos', summary);

//   return (
//     <div>
//       {summary.map((item) => (
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

// export default JournalSummaryCard;
