import React from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';
import { AiOutlineSwitcher } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
interface UnassignAdminProps {
  warehouseId: number;
  onSuccess: () => void;
}

const UnSetAdmin: React.FC<UnassignAdminProps> = ({
  warehouseId,
  onSuccess,
}) => {
  const roleId = useSelector((state: RootState) => state.user.roleId);

  const handleUnassignAdmin = async () => {
    if (roleId === 1) {
      try {
        await axios.patch(
          `${baseUrl}/warehouses/set-warehouse-admin/${warehouseId}`,
          {
            userId: null,
          },
        );
        toast.success('Admin Unassigned Successfully');
        onSuccess();
      } catch (error) {
        toast.error('Failed to unassign admin');
      }
    } else {
      toast.error('You do not have permission to unassign admin');
    }
  };

  return (
    <button
      onClick={handleUnassignAdmin}
      className=" flex items-center bg-transparent hover:bg-gray-100 text-gray-300 font-normal text-sm py-1 px-4 rounded-lg"
    >
      <AiOutlineSwitcher className="mr-1" />
      Unassign Admin
    </button>
  );
};

export default UnSetAdmin;
