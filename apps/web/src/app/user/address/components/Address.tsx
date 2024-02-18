'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa6';
import AddressCardComp from './AddressCard';
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

const Address: React.FC<AddressProps> = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const router = useRouter();

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const address = [
    {
      id: 1,
      name: 'Jordy Juniqno',
      contact: '085155318112',
      street: 'Jl.Pak Gatot 1, gg Sarbini 2 42a',
      district: 'Sukasari',
      city: 'Kota Bandung',
      province: 'Jawa Barat',
      postalcode: '40153',
    },
    {
      id: 2,
      name: 'Jordy Juniqno',
      contact: '085155318112',
      street: 'Jl. Kabil, Nongsa TB 06 kamar 120',
      district: 'Kabil',
      city: 'Batam',
      province: 'Kepulauan Riau',
      postalcode: '12345',
    },
  ];

  const submitAddress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    // const address: Address = {
    //   name: form.name.value,
    //   contact: form.contact.value,
    //   street: form.street.value,
    //   district: form.district.value,
    //   city: form.city.value,
    //   province: form.province.value,
    //   postalCode: form.postalCode.value,
    // };
    // setAddresses([...addresses, address]);
    closeEditModal();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex justify-between border-b-2  items-center w-full p-4 md:py-6">
        <h2 className="text-2xl font-semibold">Address</h2>
        <button
          onClick={openEditModal}
          className="bg-teal-600 text-white flex items-center font-semibold text-md py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline"
        >
          <FaPlus className="mr-2" /> Add Address
        </button>
      </div>
      <hr className="border- " />
      <div className="w-full flex-grow p-4">
        {/* {addresses.length === 0 ? ( */}
        <div className="flex justify-center items-center h-fit">
          {/* <div className="h-80 w-80 relative">
            <Image
              src="/address/address1.png" // Replace with your image path
              alt="Address Placeholder"
              layout="fill"
              objectFit="contain"
            />
          </div> */}
        </div>
        {/* ) : ( */}
        <AddressCardComp />
        {/* )} */}
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <form onSubmit={submitAddress} className="space-y-4 max-w-2xl">
              <input
                name="name"
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                name="contact"
                placeholder="Contact"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                name="street"
                placeholder="Street"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                name="district"
                placeholder="District"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                name="city"
                placeholder="City"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                name="province"
                placeholder="Province"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                name="postalCode"
                placeholder="Postal Code"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
