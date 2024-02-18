import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AddressProps {
  // Define additional props if needed
}

interface Address {
  name: string;
  contact: string;
  street: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
}

const AddressCard: React.FC<{ address: Address }> = ({ address }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
    <h3 className="text-lg font-semibold">{address.name}</h3>
    <p>{address.contact}</p>
    <p>{address.street}</p>
    <p>{address.district}</p>
    <p>{address.city}</p>
    <p>{address.province}</p>
    <p>{address.postalCode}</p>
  </div>
);

const AddressCardComp: React.FC<AddressProps> = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const router = useRouter();

  // Dummy data for demonstration
  // Remove this once you integrate with real data
  useState(() => {
    setAddresses([
      {
        name: 'John Doe',
        contact: '123-456-7890',
        street: '123 Main St',
        district: 'Downtown',
        city: 'Metropolis',
        province: 'Central',
        postalCode: '12345',
      },
    ]);
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex justify-between items-center w-full p-4">
        <h2 className="text-xl font-semibold">Addresses</h2>
      </div>
      <div className="w-full flex-grow p-4 space-y-4 overflow-auto">
        {addresses.map((address, index) => (
          <AddressCard key={index} address={address} />
        ))}
      </div>
    </div>
  );
};

export default AddressCardComp;
