import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import CreateWarehouseForm from './CreateWarehouse';
import { useSelector } from 'react-redux';

export interface IUser {
  user: any;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  contact: number;
  roleId: number;
}

interface CreateWarehouseProps {
  getWarehouses: () => Promise<void>;
}

const HeaderWarehouseManagement: React.FC<CreateWarehouseProps> = ({
  getWarehouses,
}) => {
  const user = useSelector((state: IUser) => state.user);

  return (
    <div className="flex justify-between items-center bg-white px-4 py-2 border-b">
      <h1 className="text-xl font-semibold text-gray-800">
        Warehouse Management
      </h1>
      {user.roleId === 1 ? (
        <div className="flex items-center">
          <CreateWarehouseForm onSuccess={getWarehouses} />
        </div>
      ) : null}
    </div>
  );
};

export default HeaderWarehouseManagement;
