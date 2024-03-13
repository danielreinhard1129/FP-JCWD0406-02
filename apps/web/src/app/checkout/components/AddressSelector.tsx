// components/AddressSelectionModal.tsx
import CreateUserAddress from '@/app/user/address/components/CreateUserAddress';
import SetDefaultAddress from '@/app/user/address/components/SetDefaultAddress';
import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
// Update the import path as needed

interface IAddress {
  id: number;
  userId: number;
  cityId: string;
  name: string;
  contact: string;
  street: string;
  district: string;
  city: string;
  province: string;
  postal_code: number;
  isPrimary: boolean;
  isDefault: boolean;
}

interface AddressSelectionModalProps {
  userId: number;
  isOpen: boolean;
  addresses: IAddress[];
  selectedAddressId: number | null;
  onSelectAddress: (address: IAddress) => Promise<void>;
  closeModal: () => void;
  refreshAddresses: any;
}

const AddressSelectionModal: React.FC<AddressSelectionModalProps> = ({
  isOpen,
  addresses,
  selectedAddressId,
  onSelectAddress,
  closeModal,
  userId,
  refreshAddresses,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl p-6 pb-12 w-full max-w-2xl my-8 overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Select Shipment Address
          </h2>
          <CreateUserAddress onSuccess={refreshAddresses} />
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-900 rounded p-1"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="space-y-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-4 my-2 border-2 ${
                selectedAddressId === address.id
                  ? 'border-teal-500'
                  : 'border-gray-300'
              } rounded-lg hover:shadow-md cursor-pointer transition-shadow`}
              onClick={() => onSelectAddress(address)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {address.isPrimary ? (
                      <p className="text-sm bg-teal-100 text-teal-800 font-semibold py-0.5 px-2 rounded-full">
                        Main
                      </p>
                    ) : null}
                    <p className="text-lg font-bold text-gray-800">
                      {address.name}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600">{address.contact}</p>
                  <p className="text-sm text-gray-600">
                    {address.street}, {address.district}
                  </p>
                  <p className="text-sm text-gray-600">{`${address.city}, ${address.province}`}</p>
                  <p className="text-sm text-gray-600">{address.postal_code}</p>
                  <div className="flex gap-5">
                    <p className="text-gray-300 text-sm font-medium cursor-pointer mt-2">
                      Change Address
                    </p>
                    <SetDefaultAddress
                      userId={userId}
                      addressId={address.id!}
                      isPrimary={address.isPrimary || false}
                      onSuccess={refreshAddresses}
                    />
                  </div>
                </div>
                {selectedAddressId === address.id && (
                  <FaCheck className="text-teal-500" size={24} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressSelectionModal;
