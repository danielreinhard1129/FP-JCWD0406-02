import React from 'react';
import CreateUserAddress from './CreateUserAddress';

interface HeaderAddressProps {
  refreshAddresses: () => Promise<void>;
}

const HeaderAddress: React.FC<HeaderAddressProps> = ({ refreshAddresses }) => {
  return (
    <div className="flex justify-between w-full items-center bg-white px-4 py-2 border-b">
      <h1 className="text-xl font-semibold text-gray-800">My Addresses</h1>
      <CreateUserAddress onSuccess={refreshAddresses} />
    </div>
  );
};

export default HeaderAddress;
