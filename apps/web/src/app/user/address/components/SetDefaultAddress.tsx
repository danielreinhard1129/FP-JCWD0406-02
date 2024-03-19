// SetDefaultAddress.tsx
import React from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { baseUrl } from '@/app/utils/database';

interface SetDefaultAddressProps {
  userId: number;
  addressId: number;
  isPrimary: boolean;
  onSuccess: () => void;
}
const SetDefaultAddress: React.FC<SetDefaultAddressProps> = ({
  userId,
  addressId,
  isPrimary,
  onSuccess,
}) => {
  const handleSetDefault = async () => {
    try {
      await axios.patch(`${baseUrl}/users/default-address/${addressId}`, {
        userId,
      });
      toast.success('Address set as default successfully');
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while setting the address as default');
    }
  };

  return (
    <>
      {isPrimary ? (
        <button
          className="bg-gray-500 text-white text-xs font-normal py-2 px-4 rounded-lg cursor-not-allowed"
          disabled={true}
        >
          Default Address
        </button>
      ) : (
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700  text-xs font-normal py-1 px-4 rounded-lg"
          onClick={handleSetDefault}
        >
          Set as Default
        </button>
      )}
    </>
  );
};

export default SetDefaultAddress;
