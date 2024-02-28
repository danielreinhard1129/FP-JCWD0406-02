import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import CreateCategoryModal from './CreateCategory';

interface HeaderCategoryManagementProps {
  refreshCategories: () => void; // Expect a prop to refresh the category list
}

const HeaderCategoryManagement: React.FC<HeaderCategoryManagementProps> = ({
  refreshCategories,
}) => {
  return (
    <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
      <h1 className="text-xl font-semibold text-gray-800">
        Category Management
      </h1>
      <CreateCategoryModal onSuccess={refreshCategories} />
    </div>
  );
};

export default HeaderCategoryManagement;
