import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import CreateWarehouseForm from './CreateWarehouse';

const HeaderWarehouseManagement: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
      <h1 className="text-xl font-semibold text-gray-800">
        Warehouse Management
      </h1>
      <div className="flex items-center">
        <CreateWarehouseForm />
      </div>
    </div>
  );
};

export default HeaderWarehouseManagement;
