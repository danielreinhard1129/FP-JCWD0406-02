// // DeleteUserComp.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { baseUrl } from '@/app/utils/database';
// import { FaTimes } from 'react-icons/fa';
// import { toast } from 'sonner';

// interface DeleteStockWarehouseProps {
//   stockId: number;
//   onSuccess: () => void;
// }

// const DeleteStockWarehouse: React.FC<DeleteStockWarehouseProps> = ({
//   stockId,
//   onSuccess,
// }) => {
//   console.log(stockId);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   //   console.log('stooooook', stockId);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`${baseUrl}/warehouses/delete-stock/${stockId}`);
//       toast.success('Stock deleted successfully');
//       onSuccess();
//       setIsModalOpen(false); // Close the modal after successful deletion
//     } catch (error) {
//       toast.error('Failed to delete stock');
//     }
//   };

//   return (
//     <div className="items-center">
//       <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-lg font-semibold">Confirm Delete</h2>
//             <button
//               className="text-gray-600 hover:text-gray-800"
//               onClick={() => setIsModalOpen(false)}
//             >
//               <FaTimes />
//             </button>
//           </div>
//           <p className="text-sm text-gray-600">
//             Are you sure you want to delete this Product Stock?
//           </p>
//           <div className="mt-6 flex justify-end gap-3">
//             <button
//               type="button"
//               className="bg-transparent hover:bg-gray-200 text-gray-700 font-semibold py-1 px-4 border border-gray-300 rounded-lg shadow-sm"
//               onClick={() => setIsModalOpen(false)}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg"
//               onClick={handleDelete}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteStockWarehouse;
