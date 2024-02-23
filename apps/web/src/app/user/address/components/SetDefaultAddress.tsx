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
          className="bg-gray-500 text-white w-full text-xs font-normal py-2 px-4 rounded-lg cursor-not-allowed"
          disabled={true}
        >
          Default Address
        </button>
      ) : (
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white w-full text-xs font-normal py-2 px-4 rounded-lg"
          onClick={handleSetDefault}
        >
          Set as Default
        </button>
      )}
    </>
  );
};

export default SetDefaultAddress;
