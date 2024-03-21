// import React, { useState } from 'react';
// import CardSummary from './CardSummary';
// import { Button } from 'flowbite-react';

// const CardJournalStock = (journal: any) => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);

//   const handleOpenModal = (product: any) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };
//   // console.log('check data in journal card', journal);
//   const summary = journal?.journal?.summary;
//   // console.log('for summary', summary);

//   return (
//     <div>
//       {summary?.map((summaryItem: any, index: number) => (
//         <div key={index}>
//           <CardSummary summary={summaryItem} />
//         </div>
//       ))}

//       <Button onClick={() => handleOpenModal(journal?.journal?.data)}>
//         Details
//       </Button>
//       {/* Modal */}
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={handleCloseModal}>
//               &times;
//             </span>
//             <h2>{journal?.journal?.data}</h2>
//             {/* Display journal details here */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardJournalStock;
