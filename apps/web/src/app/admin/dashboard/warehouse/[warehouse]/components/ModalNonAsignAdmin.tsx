// ModalNonAsignAdmin component

import { baseUrl } from '@/app/utils/database';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import SelectAdminCard from './SelectAdminCard';
import { toast } from 'sonner';

interface Role {
  id: number;
  role_name: string;
}

interface User {
  id: number;
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  roleId?: number;
  isVerified: boolean;
  profile_picture?: string;
  contact?: string;
  Role?: Role;
}

interface NonAsignAdminSelectProps {
  isOpen: boolean;
  onClose: () => void;
  warehouseId: number;
}

const ModalNonAsignAdmin: React.FC<NonAsignAdminSelectProps> = ({
  isOpen,
  onClose,
  warehouseId,
}) => {
  // Update to use an array of User
  const [admin, setAdmin] = useState<User[]>([]);

  const adminNonAsigned = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/unassigned`);
      setAdmin(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      adminNonAsigned();
    }
  }, [isOpen]);

  const handleAdminSelect = async (adminId: number) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/warehouses/set-warehouse-admin/${warehouseId}`,
        {
          userId: adminId,
        },
      );
      toast.success('Admin set successfully');
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 pb-6 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Select Admin Warehouse</h3>
          <button onClick={onClose} className="text-xl font-bold">
            &times;
          </button>
        </div>
        <div className=" space-y-1">
          {admin.map((user) => (
            <SelectAdminCard
              key={user.id}
              admin={user}
              onClick={handleAdminSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalNonAsignAdmin;
