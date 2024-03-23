import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const HeaderProductManagement: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
      <h1 className="text-xl font-semibold text-gray-800">
        Product Management
      </h1>
      <div className="flex items-center">
        <Link href="/admin/dashboard/create-product" passHref>
          <div className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 font-medium text-sm rounded-lg inline-flex items-center">
            <FaPlus className="mr-2" />
            Create Product
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeaderProductManagement;
