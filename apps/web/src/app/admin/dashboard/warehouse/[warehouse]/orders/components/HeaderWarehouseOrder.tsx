import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

const HeaderWarehouseOrder: React.FC = () => {
  const router = useRouter();

  const goBack = () => {
    router.back(); // This will take you back to the previous page
  };

  return (
    <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
      <h1 className="text-xl font-semibold text-gray-800">Orders</h1>
      <IoMdArrowRoundBack
        onClick={goBack}
        className="text-xl font-semibold text-gray-800 cursor-pointer"
      />
    </div>
  );
};

export default HeaderWarehouseOrder;
